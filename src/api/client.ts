import { User, Role } from './types';
import { mockDb } from './mockDb';

export const API_BASE_URL = 'https://api.swatantrakhabar.in/v1';

export const delay = (ms = 350): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const SEED_TEMPORARY_PASSWORDS: Record<string, string> = {
  'admin@swatantrakhabar.in': 'Admin@2026',
  'editor@swatantrakhabar.in': 'Editor@2026',
  'dinesh.editor@swatantrakhabar.in': 'Editor@2026',
  'praveen.reporter@swatantrakhabar.in': 'Reporter@2026',
  'sunil.reporter@swatantrakhabar.in': 'Reporter@2026',
  'ashok.reporter@swatantrakhabar.in': 'Reporter@2026',
  'media@swatantrakhabar.in': 'Media@2026',
  'ads@swatantrakhabar.in': 'Ads@2026',
};

const TOKEN_KEY = 'jsk_staff_token';
const USER_KEY = 'jsk_staff_user';

export function getAuthToken(): string | null {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function getCurrentStaffUser(): User | null {
  try {
    const val = sessionStorage.getItem(USER_KEY);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
}

export function setAuthSession(token: string, user: User): void {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Session storage error', e);
  }
}

export function clearAuthSession(): void {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Session storage error', e);
  }
}

export function requireRole(allowedRoles: Role[]): { authorized: boolean; error?: string } {
  const user = getCurrentStaffUser();
  if (!user) {
    return { authorized: false, error: 'अनधिकृत प्रवेश: कृपया पहले लॉगिन करें (401 Unauthorized)' };
  }
  if (!allowedRoles.includes(user.role) && user.role !== 'admin') {
    return {
      authorized: false,
      error: `अनुमति अस्वीकृत: आपकी भूमिका (${user.role}) को यह कार्य करने की अनुमति नहीं है (403 Forbidden)`,
    };
  }
  return { authorized: true };
}
