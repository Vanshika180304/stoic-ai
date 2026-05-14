import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Stoic AI - Ancient Wisdom for Modern Minds",
  description: "A calm voice in a noisy world. Speak. Reflect. Become still.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
