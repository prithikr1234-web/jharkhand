/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from './config';
import { StaffUserProfile } from './authService';
import { StaffRole } from '../permissions/roles';

/**
 * Fetch all staff users for admin view
 */
export async function fetchAllStaffUsers(): Promise<StaffUserProfile[]> {
  try {
    const q = query(collection(db, 'staffUsers'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ uid: d.id, ...d.data() } as StaffUserProfile));
  } catch (err) {
    console.error('fetchAllStaffUsers error:', err);
    return [];
  }
}

/**
 * Create or assign a new staff member profile
 */
export async function createStaffMember(
  data: {
    uid?: string;
    name: string;
    email: string;
    role: StaffRole;
    department?: string;
    district?: string;
    phone?: string;
    creatorUid: string;
  }
): Promise<StaffUserProfile> {
  const staffUid = data.uid || `usr-${Date.now()}`;
  const docRef = doc(db, 'staffUsers', staffUid);

  const profile: StaffUserProfile = {
    uid: staffUid,
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    role: data.role,
    active: true,
    department: data.department || 'संपादकीय',
    district: data.district || 'राँची',
    mustChangePassword: true,
    phone: data.phone || '',
    createdBy: data.creatorUid,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await setDoc(docRef, profile);
  return profile;
}

/**
 * Toggle staff active status
 */
export async function setStaffActiveStatus(uid: string, active: boolean): Promise<void> {
  const docRef = doc(db, 'staffUsers', uid);
  await updateDoc(docRef, {
    active,
    updatedAt: new Date().toISOString(),
  });
}

/**
 * Update staff role
 */
export async function setStaffRole(uid: string, role: StaffRole): Promise<void> {
  const docRef = doc(db, 'staffUsers', uid);
  await updateDoc(docRef, {
    role,
    updatedAt: new Date().toISOString(),
  });
}
