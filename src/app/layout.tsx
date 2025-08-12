import type { Metadata } from "next";
import "./globals.css";
import "./fontawesome";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
