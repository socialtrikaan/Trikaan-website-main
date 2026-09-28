import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import StructuredData from "./components/StructuredData";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import GlobalBackground from "./components/GlobalBackground";
import AnimatedFooter from "./components/AnimatedFooter";
import ExpandReveal from "@/components/ui/ExpandReveal";
import Button from "@/components/ui/Button";
import { Sparkles } from "lucide-react";
import {
  createMetadata,
  navigationJsonLd,
  organizationJsonLd,
  siteConfig,
  websiteJsonLd,
} from "./seo";


// Segoe Print (self-hosted) = handwritten headings. Inter = body/UI.
const segoePrint = localFont({
  src: [
    { path: "../public/segoeprint.ttf", weight: "400", style: "normal" },
    { path: "../public/segoeprint_bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-segoe",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Trikaan | Product Studio for Scalable Digital Platforms",
    template: "%s | Trikaan",
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  ...createMetadata({
    title: "Trikaan | Product Studio for Scalable Digital Platforms",
    description: siteConfig.description,
    path: "/",
  }),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#022da8",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${segoePrint.variable}`}
    >
      <body
        className={`
          antialiased
          font-sans
          bg-surface
          text-ink
        `}
      >
        <GlobalBackground />
        <StructuredData
          data={[organizationJsonLd(), websiteJsonLd(), navigationJsonLd()]}
        />
        <Providers>
          <ScrollProgress />
          <Navbar />
          <main className="pb-[64px] lg:pb-0">{children}</main>
          <AnimatedFooter />

          {/* Fullscreen circle-expand reveal (all pages) */}
          <ExpandReveal
            ball={<Sparkles size={22} />}
            ballClassName="fixed bottom-6 left-6 z-40 size-14 max-sm:hidden"
          >
            <p className="font-heading text-[40px] leading-tight md:text-[56px]">
              Ready to transform your operations?
            </p>
            <p className="mt-4 max-w-[520px] text-[18px] leading-[1.6] text-white/80">
              One platform. Every workflow. Let&apos;s build the system your business
              actually runs on.
            </p>
            <div className="mt-8">
              <Button href="/contact" className="bg-white !text-brand hover:bg-white/90">
                Book a Demo
              </Button>
            </div>
          </ExpandReveal>
        </Providers>
      </body>
    </html>
  );
}
