import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${inter.className} antialiased h-full`}>{children}</body>
    </html>
  );
}