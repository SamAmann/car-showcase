/** @format */

import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Car Hub',
  description: "Discover world's best car showcase application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
