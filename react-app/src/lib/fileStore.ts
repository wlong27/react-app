import { randomUUID } from 'crypto';

export interface StoredFile {
  id: string;
  name: string;
  type: string;
  size: number;
  data: Buffer;
  uploadedAt: Date;
}

// Survive Next.js hot reloads in development
const g = globalThis as typeof globalThis & { __fileStore?: Map<string, StoredFile> };
if (!g.__fileStore) g.__fileStore = new Map();

export const fileStore = g.__fileStore;

export function storeFile(file: File, buffer: Buffer): StoredFile {
  const entry: StoredFile = {
    id: randomUUID(),
    name: file.name,
    type: file.type,
    size: file.size,
    data: buffer,
    uploadedAt: new Date(),
  };
  fileStore.set(entry.id, entry);
  return entry;
}
