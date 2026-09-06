import type { Metadata } from 'next';
import { auth } from '@/auth';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'ProjectMatch - Connect with Talented Creators',
  description: 'Find collaborators and co-founders for your next project',
  icons: '/favicon.ico',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {children}
      </body>
    </html>
  );
}
