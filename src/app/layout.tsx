import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export const metadata: Metadata = {
  title: "Pakistan Education Analysis | A Data-Driven Policy Audit",
  description:
    "An interactive research publication exploring Pakistan's education landscape through data visualization. Analyzing regional disparities, gender parity, infrastructure gaps, and hidden patterns from 2013-2016.",
  keywords: [
    "Pakistan",
    "education",
    "data analysis",
    "policy",
    "visualization",
    "research",
  ],
  authors: [{ name: "Research Team" }],
  openGraph: {
    title: "Pakistan Education Analysis",
    description: "A data-driven exploration of Pakistan's education landscape",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-[#fafafa] text-slate-900`}
      >
        <a href="#context" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
