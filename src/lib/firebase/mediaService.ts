/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { collection, doc, setDoc, getDocs, deleteDoc, query, orderBy, limit } from 'firebase/firestore';
import { storage, db } from './config';

export interface MediaAsset {
  id: string;
  name: string;
  storagePath: string;
  downloadUrl: string;
  type: 'image' | 'video' | 'document';
  size: number;
  mimeType: string;
  caption?: string;
  credit?: string;
  altText?: string;
  uploadedBy: string;
  uploadedByName: string;
  uploadedAt: string;
}

/**
 * Upload a media file to Firebase Storage and save record in Firestore
 */
export async function uploadMediaAsset(
  file: File,
  meta: {
    caption?: string;
    credit?: string;
    altText?: string;
    uploaderUid: string;
    uploaderName: string;
  }
): Promise<MediaAsset> {
  const fileExt = file.name.split('.').pop() || '';
  const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const storagePath = `media/${Date.now()}_${sanitizedName}`;
  const storageRef = ref(storage, storagePath);

  // Upload file
  await uploadBytes(storageRef, file, {
    contentType: file.type,
  });

  const downloadUrl = await getDownloadURL(storageRef);

  let mediaType: 'image' | 'video' | 'document' = 'image';
  if (file.type.startsWith('video/')) mediaType = 'video';
  else if (file.type.includes('pdf') || file.type.includes('document')) mediaType = 'document';

  const assetId = `med-${Date.now()}`;
  const record: MediaAsset = {
    id: assetId,
    name: file.name,
    storagePath,
    downloadUrl,
    type: mediaType,
    size: file.size,
    mimeType: file.type,
    caption: meta.caption || '',
    credit: meta.credit || '',
    altText: meta.altText || '',
    uploadedBy: meta.uploaderUid,
    uploadedByName: meta.uploaderName,
    uploadedAt: new Date().toISOString(),
  };

  // Save in Firestore collection
  await setDoc(doc(db, 'media', assetId), record);
  return record;
}

/**
 * Fetch media items from Firestore
 */
export async function fetchMediaAssets(filterType?: string): Promise<MediaAsset[]> {
  try {
    const q = query(collection(db, 'media'), orderBy('uploadedAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    let items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as MediaAsset));
    if (filterType && filterType !== 'all') {
      items = items.filter((item) => item.type === filterType);
    }
    return items;
  } catch (err) {
    console.error('fetchMediaAssets error:', err);
    return [];
  }
}

/**
 * Delete media asset from Storage and Firestore
 */
export async function deleteMediaAsset(assetId: string, storagePath?: string): Promise<void> {
  try {
    if (storagePath) {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef).catch((e) => console.warn('Storage delete warning:', e));
    }
    await deleteDoc(doc(db, 'media', assetId));
  } catch (err) {
    console.error('deleteMediaAsset error:', err);
    throw err;
  }
}
