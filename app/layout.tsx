import type { Metadata } from "next";
import "./globals.css";
import { Spectral } from 'next/font/google';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import MobileMenu from "@/components/layout/mobileMenu/mobileMenu";

export const metadata: Metadata = {
  title: "Cozy Chic",
  description: "CHARGRILLED CHICKEN & KEBAB.",
};

const spectral = Spectral({
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={spectral.className}>
        <MobileMenu />
        <Header />
        <main className="flex-1 w-full mx-auto w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
