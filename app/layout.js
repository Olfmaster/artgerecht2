import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_URL = "https://www.artgerecht.tv";
const TITLE = "artgerecht — Digitale Illustration & Verpackungsdesign · Birgit Silberg";
const DESCRIPTION =
  "Birgit Silberg gestaltet digital für Unternehmen: digitale Illustration und Verpackungsdesign — von der ersten Idee bis zum druckfertigen Ergebnis.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · artgerecht",
  },
  description: DESCRIPTION,
  applicationName: "artgerecht",
  authors: [{ name: "Birgit Silberg", url: SITE_URL }],
  creator: "Birgit Silberg",
  publisher: "artgerecht — Birgit Silberg",
  keywords: [
    "Digitale Illustration",
    "Verpackungsdesign",
    "Markenillustration",
    "Etikettendesign",
    "Editorial Illustration",
    "Corporate Design",
    "Birgit Silberg",
    "artgerecht",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: SITE_URL,
    siteName: "artgerecht",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
  },
};

export const viewport = {
  themeColor: "#b76e79",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${geist.variable} h-full`}>
      <body className="min-h-full bg-white text-zinc-900 antialiased selection:bg-rose-gold selection:text-white">
        {children}
      </body>
    </html>
  );
}
