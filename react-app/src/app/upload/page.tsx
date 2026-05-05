'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadPage() {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fetchFiles = async () => {
    const res = await fetch('/api/files');
    setFiles(await res.json());
  };

  useEffect(() => { fetchFiles(); }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ text: `Uploaded "${data.name}" successfully.`, ok: true });
        formRef.current?.reset();
        fetchFiles();
      } else {
        setMessage({ text: data.error ?? 'Upload failed.', ok: false });
      }
    } catch {
      setMessage({ text: 'Network error.', ok: false });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '20px' }}>
      <Link href="/">← Back to Characters</Link>

      <h2>Upload a File</h2>
      <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input type="file" name="file" required />
        <button type="submit" disabled={uploading}>
          {uploading ? 'Uploading…' : 'Upload'}
        </button>
      </form>

      {message && (
        <p style={{ color: message.ok ? '#4caf50' : '#f44336', marginTop: 12 }}>
          {message.text}
        </p>
      )}

      <h2>Stored Files ({files.length})</h2>
      {files.length === 0 ? (
        <p style={{ color: '#aaa' }}>No files uploaded yet.</p>
      ) : (
        <ul>
          {files.map((f) => (
            <li key={f.id} style={{ marginBottom: 10 }}>
              <a href={`/api/files/${f.id}`} download={f.name}>{f.name}</a>
              {' '}
              <span style={{ color: '#aaa', fontSize: '0.85em' }}>
                {formatSize(f.size)} · {f.type || 'unknown'} ·{' '}
                {new Date(f.uploadedAt).toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
