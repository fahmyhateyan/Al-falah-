import type { Metadata, Viewport } from "next";
import { Amiri, Libre_Baskerville, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { site } from "@/config/site";
import "./globals.css";

const serif = Libre_Baskerville({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-serif", display: "swap" });
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const arabic = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-arabic", display: "swap" });

const description = `A caring home and an education for orphaned and needy boys in ${site.location.area}, ${site.location.region}. Established in ${site.foundedYear}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.fullName} – ${site.tagline}`, template: `%s | ${site.fullName}` },
  description,
  applicationName: site.fullName,
  openGraph: {
    siteName: site.fullName,
    type: "website",
    locale: "en_GB",
    title: site.fullName,
    description,
    images: [{ url: "/images/brand/logo-full.png", width: 505, height: 329, alt: `${site.fullName} logo` }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/icon.png", apple: "/apple-icon.png" },
};

export const viewport: Viewport = { themeColor: "#293C1C", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${serif.variable} ${sans.variable} ${arabic.variable}`}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
