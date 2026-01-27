import Script from "next/script";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuggyShop - Demo App",
  description:
    "A demo e-commerce dashboard for testing the Ladybug support widget",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/*
          Ladybug Support Widget
          ========================
          To add the Ladybug widget, uncomment the script tag below and replace
          YOUR_WIDGET_ID with your actual Ladybug widget ID.

          <script src="https://widget.ladybug.io/widget.js" data-widget-id="YOUR_WIDGET_ID" async></script>
        */}
        <Script
          src="https://ladybug.hack2026.gov.sg/widget.js"
          data-project-id="4c6fb596-2f32-4e66-ae8b-ddf448357df7"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
