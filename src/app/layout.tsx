import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AlertProvider from "@/components/ui/alert";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Text Summarizer",
  description: "A web app for summarizing text using AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AlertProvider>
          {children}
          <SpeedInsights />
        </AlertProvider>
      </body>
    </html>
  );
}
