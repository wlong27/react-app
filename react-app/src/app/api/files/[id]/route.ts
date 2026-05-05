import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/fileStore';

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const file = fileStore.get(params.id);
  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(file.data), {
    headers: {
      'Content-Type': file.type || 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${file.name}"`,
    },
  });
}
