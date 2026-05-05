import { NextResponse } from 'next/server';
import { fileStore } from '@/lib/fileStore';

export async function GET() {
  const files = Array.from(fileStore.values()).map(({ id, name, type, size, uploadedAt }) => ({
    id,
    name,
    type,
    size,
    uploadedAt,
  }));
  return NextResponse.json(files);
}
