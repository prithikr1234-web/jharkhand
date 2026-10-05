# झारखंड स्वतंत्र खबर - API Architecture & Backend Swap Guide

This digital news platform is engineered with a **"Two URLs, One API"** architecture:
1. **Public News Website:** Runs at `/` (or domain `www.swatantrakhabar.in`)
2. **Staff Editorial Portal:** Runs at `/staff` (or domain `staff.swatantrakhabar.in`)
3. **Single Shared API Module:** Lives in `src/api/`

---

## 1. Current State (Development Mock Layer)

The current implementation in `src/api/client.ts` and `src/api/endpoints.ts` communicates with an in-memory/`localStorage`-persisted database (`mockDb.ts`).
- Simulates real-world network latency (300ms - 500ms).
- Simulates token authentication and Role-Based Access Control (RBAC):
  - **Admin:** Full access across news, staff, settings, audit log.
  - **Editor:** Review queue, editing, publish/unpublish, breaking ticker.
  - **Reporter:** Drafts & own articles only; submits for review.
  - **Media:** Photography, videos, media files.
  - **Ad Manager:** Advertising slots and campaigns.

---

## 2. Swapping Mock for Real Backend (Node.js / Express / NestJS + PostgreSQL)

To connect this front-end to a production backend, **zero UI components need to change**. You only modify `src/api/client.ts` and `src/api/endpoints.ts`:

### Step 1: Set Your Production Base URL
In `src/api/client.ts`:
```typescript
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.swatantrakhabar.in/v1';
```

### Step 2: Implement the HTTP Fetcher
Replace mock functions in `src/api/endpoints.ts` with real `fetch` calls:
```typescript
import { API_BASE_URL, getAuthToken } from './client';

export async function getPublicArticles(params) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_BASE_URL}/public/articles?${query}`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function createStaffArticle(data) {
  const token = getAuthToken();
  const res = await fetch(`${API_BASE_URL}/staff/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create article');
  return res.json();
}
```

---

## 3. Seeded Test Credentials for Staff Portal

You can sign in immediately at `/staff/login`:

| भूमिका (Role) | ईमेल / लॉगिन आईडी | पासवर्ड |
|---|---|---|
| **मुख्य एडमिन (Admin)** | `admin@swatantrakhabar.in` | `Admin@2026` |
| **वरिष्ठ संपादक (Editor)** | `editor@swatantrakhabar.in` | `Editor@2026` |
| **संवाददाता (Reporter)** | `praveen.reporter@swatantrakhabar.in` | `Reporter@2026` |
| **छायाकार (Media)** | `media@swatantrakhabar.in` | `Media@2026` |
| **विज्ञापन प्रबंधक (Ads)** | `ads@swatantrakhabar.in` | `Ads@2026` |
