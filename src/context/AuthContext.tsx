/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StaffUserProfile,
  loginStaff,
  logoutStaff,
  updateStaffPassword,
  subscribeToStaffAuth,
} from '../lib/firebase/authService';
import { recordAuditEvent } from '../lib/firebase/auditService';
import { StaffRole, normalizeRole, hasPermission, PermissionDefinition } from '../lib/permissions/roles';

interface AuthContextType {
  user: StaffUserProfile | null;
  role: StaffRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, pass: string) => Promise<{
    success: boolean;
    profile?: StaffUserProfile;
    mustChangePassword?: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
  changePassword: (newPass: string) => Promise<{ success: boolean; error?: string }>;
  can: (permission: keyof PermissionDefinition) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<StaffUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToStaffAuth((profile, loading) => {
      setUser(profile);
      setIsLoading(loading);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (identifier: string, pass: string) => {
    const res = await loginStaff(identifier, pass);
    if (res.success && res.profile) {
      setUser(res.profile);
      recordAuditEvent({
        action: 'LOGIN',
        actorUid: res.profile.uid,
        actorName: res.profile.name,
        actorRole: res.profile.role,
        targetType: 'AUTH',
        metadata: { email: res.profile.email },
      });
    }
    return res;
  };

  const handleLogout = async () => {
    if (user) {
      recordAuditEvent({
        action: 'LOGOUT',
        actorUid: user.uid,
        actorName: user.name,
        actorRole: user.role,
        targetType: 'AUTH',
      });
    }
    await logoutStaff();
    setUser(null);
  };

  const handleChangePassword = async (newPass: string) => {
    const res = await updateStaffPassword(newPass);
    if (res.success && user) {
      setUser({ ...user, mustChangePassword: false });
      recordAuditEvent({
        action: 'PASSWORD_CHANGED',
        actorUid: user.uid,
        actorName: user.name,
        actorRole: user.role,
        targetType: 'SECURITY',
      });
    }
    return res;
  };

  const currentRole = normalizeRole(user?.role);
  const can = (permission: keyof PermissionDefinition) => hasPermission(user?.role, permission);

  return (
    <AuthContext.Provider
      value={{
        user,
        role: currentRole,
        isAuthenticated: !!user,
        isLoading,
        login: handleLogin,
        logout: handleLogout,
        changePassword: handleChangePassword,
        can,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
