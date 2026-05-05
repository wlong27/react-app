import { NextRequest, NextResponse } from 'next/server';
import { storeFile } from '@/lib/fileStore';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File | null;

  if (!file || file.size === 0) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const { id, name, type, size, uploadedAt } = storeFile(file, buffer);

  return NextResponse.json({ id, name, type, size, uploadedAt }, { status: 201 });
}
