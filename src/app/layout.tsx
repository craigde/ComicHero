import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/layout/nav-bar";

export const metadata: Metadata = {
  title: "ComicHero - Vintage Comic Book Sourcing",
  description:
    "Find and track vintage collector comic books across eBay with intelligent deal detection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NavBar />
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
