import type { Metadata } from 'next';
import Link from 'next/link';
import AudioPlayer from '@/components/AudioPlayer/AudioPlayer';
import './globals.css';

export const metadata: Metadata = {
  title: 'My Star Wars App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AudioPlayer />
        <div className="App">
          <h1>My Star Wars React App</h1>
          <nav style={{ textAlign: 'center', marginBottom: 16 }}>
            <Link href="/" style={{ marginRight: 20 }}>Characters</Link>
            <Link href="/upload">File Upload</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
