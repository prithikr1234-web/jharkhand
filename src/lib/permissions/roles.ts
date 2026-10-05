/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type StaffRole = 'ADMIN' | 'EDITOR' | 'REPORTER' | 'MEDIA' | 'AD_MANAGER';

export interface PermissionDefinition {
  canWriteArticles: boolean;
  canSubmitArticles: boolean;
  canReviewArticles: boolean;
  canPublishArticles: boolean;
  canScheduleArticles: boolean;
  canDeleteArticles: boolean;
  canUploadMedia: boolean;
  canManageMedia: boolean;
  canManageEPaper: boolean;
  canManageAds: boolean;
  canModerateComments: boolean;
  canManageStaff: boolean;
  canManageSettings: boolean;
  canViewAuditLogs: boolean;
}

export const ROLE_PERMISSIONS: Record<StaffRole, PermissionDefinition> = {
  ADMIN: {
    canWriteArticles: true,
    canSubmitArticles: true,
    canReviewArticles: true,
    canPublishArticles: true,
    canScheduleArticles: true,
    canDeleteArticles: true,
    canUploadMedia: true,
    canManageMedia: true,
    canManageEPaper: true,
    canManageAds: true,
    canModerateComments: true,
    canManageStaff: true,
    canManageSettings: true,
    canViewAuditLogs: true,
  },
  EDITOR: {
    canWriteArticles: true,
    canSubmitArticles: true,
    canReviewArticles: true,
    canPublishArticles: true,
    canScheduleArticles: true,
    canDeleteArticles: true,
    canUploadMedia: true,
    canManageMedia: true,
    canManageEPaper: true,
    canManageAds: false,
    canModerateComments: true,
    canManageStaff: false,
    canManageSettings: false,
    canViewAuditLogs: true,
  },
  REPORTER: {
    canWriteArticles: true,
    canSubmitArticles: true,
    canReviewArticles: false,
    canPublishArticles: false,
    canScheduleArticles: false,
    canDeleteArticles: false,
    canUploadMedia: true,
    canManageMedia: false,
    canManageEPaper: false,
    canManageAds: false,
    canModerateComments: false,
    canManageStaff: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
  MEDIA: {
    canWriteArticles: false,
    canSubmitArticles: false,
    canReviewArticles: false,
    canPublishArticles: false,
    canScheduleArticles: false,
    canDeleteArticles: false,
    canUploadMedia: true,
    canManageMedia: true,
    canManageEPaper: true,
    canManageAds: false,
    canModerateComments: false,
    canManageStaff: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
  AD_MANAGER: {
    canWriteArticles: false,
    canSubmitArticles: false,
    canReviewArticles: false,
    canPublishArticles: false,
    canScheduleArticles: false,
    canDeleteArticles: false,
    canUploadMedia: false,
    canManageMedia: false,
    canManageEPaper: false,
    canManageAds: true,
    canModerateComments: false,
    canManageStaff: false,
    canManageSettings: false,
    canViewAuditLogs: false,
  },
};

export function normalizeRole(roleStr?: string): StaffRole {
  if (!roleStr) return 'REPORTER';
  const upper = roleStr.toUpperCase();
  if (upper in ROLE_PERMISSIONS) {
    return upper as StaffRole;
  }
  return 'REPORTER';
}

export function hasPermission(roleStr: string | undefined, permission: keyof PermissionDefinition): boolean {
  const role = normalizeRole(roleStr);
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
}
