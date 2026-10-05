/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  collection,
  getDocs,
  query,
  limit,
} from 'firebase/firestore';
import { auth, db } from './config';
import { StaffRole, normalizeRole } from '../permissions/roles';

export interface StaffUserProfile {
  uid: string;
  name: string;
  email: string;
  role: StaffRole;
  active: boolean;
  department?: string;
  district?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
  lastLoginAt?: string;
  mustChangePassword?: boolean;
  phone?: string;
  createdBy?: string;
}

// Convert Firebase Auth error codes into friendly Hindi messages
export function getHindiAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'अमान्य ईमेल प्रारूप। कृपया सही ईमेल दर्ज करें।';
    case 'auth/user-disabled':
      return 'यह स्टाफ अकाउंट निष्क्रिय (disabled) कर दिया गया है। कृपया मुख्य प्रशासक से संपर्क करें।';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'ईमेल या पासवर्ड गलत है। कृपया दोबारा जाँचें।';
    case 'auth/too-many-requests':
      return 'सुरक्षा कारणों से यह अकाउंट अस्थायी रूप से लॉक है। कुछ देर बाद पुनः प्रयास करें।';
    case 'auth/network-request-failed':
      return 'नेटवर्क कनेक्शन अनुपलब्ध है। कृपया अपना इंटरनेट जांचें।';
    case 'auth/weak-password':
      return 'पासवर्ड कम से कम 6 अक्षरों का और मजबूत होना चाहिए।';
    case 'auth/email-already-in-use':
      return 'यह ईमेल पहले से किसी स्टाफ सदस्य द्वारा उपयोग में है।';
    default:
      return 'लॉगिन प्रक्रिया में त्रुटि हुई। कृपया विवरण जांचकर पुनः प्रयास करें।';
  }
}

/**
 * Sign in a staff member and verify their active staff profile
 */
export async function loginStaff(identifier: string, pass: string): Promise<{
  success: boolean;
  profile?: StaffUserProfile;
  mustChangePassword?: boolean;
  error?: string;
}> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, identifier.trim(), pass);
    const fbUser = userCredential.user;

    // Fetch staff document from Firestore
    const staffDocRef = doc(db, 'staffUsers', fbUser.uid);
    const staffSnap = await getDoc(staffDocRef);

    if (!staffSnap.exists()) {
      // Check if this is the very first user bootstrap
      const allUsersSnap = await getDocs(query(collection(db, 'staffUsers'), limit(1)));
      if (allUsersSnap.empty) {
        // Automatically make first authenticated user an ADMIN
        const newAdmin: StaffUserProfile = {
          uid: fbUser.uid,
          name: fbUser.displayName || 'मुख्य प्रशासक',
          email: fbUser.email || identifier,
          role: 'ADMIN',
          active: true,
          department: 'संपादकीय',
          district: 'राँची',
          mustChangePassword: false,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
        };
        await setDoc(staffDocRef, {
          ...newAdmin,
          createdAt: serverTimestamp(),
          lastLoginAt: serverTimestamp(),
        });
        return { success: true, profile: newAdmin, mustChangePassword: false };
      }

      await signOut(auth);
      return {
        success: false,
        error: 'आपका खाता अधिकृत स्टाफ सूची में नहीं मिला। कृपया एडमिन से संपर्क करें।',
      };
    }

    const data = staffSnap.data() as StaffUserProfile;

    if (!data.active) {
      await signOut(auth);
      return {
        success: false,
        error: 'यह स्टाफ अकाउंट निष्क्रिय (Deactivated) कर दिया गया है। कृपया एडमिन से संपर्क करें।',
      };
    }

    // Update last login timestamp
    await updateDoc(staffDocRef, {
      lastLoginAt: new Date().toISOString(),
    }).catch(() => {});

    const profile: StaffUserProfile = {
      ...data,
      role: normalizeRole(data.role),
    };

    return {
      success: true,
      profile,
      mustChangePassword: !!data.mustChangePassword,
    };
  } catch (err: any) {
    console.error('Staff login error:', err);
    return {
      success: false,
      error: getHindiAuthErrorMessage(err?.code || ''),
    };
  }
}

/**
 * Logout current staff user
 */
export async function logoutStaff(): Promise<void> {
  await signOut(auth);
}

/**
 * Send password reset email
 */
export async function requestStaffPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email.trim());
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: getHindiAuthErrorMessage(err?.code || ''),
    };
  }
}

/**
 * Change current staff member's password
 */
export async function updateStaffPassword(newPassword: string): Promise<{ success: boolean; error?: string }> {
  if (!auth.currentUser) {
    return { success: false, error: 'सत्र समाप्त हो चुका है। कृपया पुनः लॉगिन करें।' };
  }

  try {
    await updatePassword(auth.currentUser, newPassword);

    // Clear mustChangePassword flag in Firestore
    const staffDocRef = doc(db, 'staffUsers', auth.currentUser.uid);
    await updateDoc(staffDocRef, {
      mustChangePassword: false,
      updatedAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: getHindiAuthErrorMessage(err?.code || ''),
    };
  }
}

/**
 * Observe staff authentication state changes
 */
export function subscribeToStaffAuth(
  onStateChange: (profile: StaffUserProfile | null, loading: boolean) => void
): () => void {
  return onAuthStateChanged(auth, async (fbUser: FirebaseUser | null) => {
    if (!fbUser) {
      onStateChange(null, false);
      return;
    }

    try {
      const staffDocRef = doc(db, 'staffUsers', fbUser.uid);
      const staffSnap = await getDoc(staffDocRef);

      if (staffSnap.exists()) {
        const data = staffSnap.data() as StaffUserProfile;
        if (data.active) {
          onStateChange({ ...data, role: normalizeRole(data.role) }, false);
          return;
        }
      }
      onStateChange(null, false);
    } catch (err) {
      console.error('Auth state lookup error:', err);
      onStateChange(null, false);
    }
  });
}
