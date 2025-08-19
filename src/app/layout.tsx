import type { Metadata } from "next";
import "./globals.css";
import "./fontawesome";

import { Poppins } from "next/font/google";
import AppProvider from "./AppProvider";
import CookieConsent from "@/components/CookiesConsent/page";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thecorporategirliearts.netlify.app/"),
  title: "The Corporate Girlie Arts",
  description: "The Corporate Girlie Arts",
  openGraph: {
    title: "The Corporate Girlie Arts",
    description: "The Corporate Girlie Arts",
    images: [
      {
        url: "/favicon.ico",
        width: 200,
        height: 200,
        alt: "The Corporate Girlie Arts Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* This script runs before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`antialiased ${poppins.className}`}>
        <AppProvider>{children}
          <CookieConsent />
        </AppProvider>
      </body>
    </html>
  );
}
