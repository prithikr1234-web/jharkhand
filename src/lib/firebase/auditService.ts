/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { collection, doc, setDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from './config';

export interface AuditRecord {
  id: string;
  action: string;
  actorUid: string;
  actorName: string;
  actorRole: string;
  targetType?: string;
  targetId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

/**
 * Record an append-only audit event in Firestore
 */
export async function recordAuditEvent(event: {
  action: string;
  actorUid: string;
  actorName: string;
  actorRole: string;
  targetType?: string;
  targetId?: string;
  metadata?: Record<string, any>;
}): Promise<void> {
  try {
    const logId = `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const logDocRef = doc(db, 'auditLogs', logId);

    await setDoc(logDocRef, {
      ...event,
      id: logId,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Audit record warning:', err);
  }
}

/**
 * Fetch chronological audit logs
 */
export async function fetchAuditLogs(limitCount = 100): Promise<AuditRecord[]> {
  try {
    const q = query(collection(db, 'auditLogs'), orderBy('timestamp', 'desc'), limit(limitCount));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as AuditRecord));
  } catch (err) {
    console.error('fetchAuditLogs error:', err);
    return [];
  }
}
