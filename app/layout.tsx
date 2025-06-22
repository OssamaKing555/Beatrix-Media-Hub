import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { getSiteConfig } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

const siteConfig = getSiteConfig();

export const metadata: Metadata = {
  title: siteConfig.seo.defaultTitle,
  description: siteConfig.seo.defaultDescription,
  keywords: "media production, advertising, digital marketing, brand activation, content creation, Cairo, Egypt",
  authors: [{ name: siteConfig.site.name }],
  creator: siteConfig.site.name,
  publisher: siteConfig.site.name,
  robots: "index, follow",
  openGraph: {
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    type: "website",
    locale: "en_US",
    images: [siteConfig.seo.defaultImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.defaultTitle,
    description: siteConfig.seo.defaultDescription,
    images: [siteConfig.seo.defaultImage],
  },
  icons: {
    icon: siteConfig.site.favicon,
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={siteConfig.site.language} dir={siteConfig.site.rtl ? 'rtl' : 'ltr'}>
      <body className={inter.className}>
        <SmoothScrollProvider>
          <div className="min-h-screen bg-black text-white">
            <Navbar />
            <main className="pt-16 lg:pt-20">
              {children}
            </main>
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
