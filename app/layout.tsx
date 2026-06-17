import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Intelligence Lab — Market Opportunity Analysis",
  description: "Discover operational friction opportunities in your market",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white font-sans text-navy">{children}</body>
    </html>
  );
}
