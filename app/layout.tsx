import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers, ErrorBoundary } from '@/components';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Email Assistant Back Office',
  description: 'Admin and settings portal for Email Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <Providers>
            {children}
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
