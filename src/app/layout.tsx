import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://seedtocup.et"),
  title: {
    default: "Seed To Cup — Coffee, Culture, Commerce",
    template: "%s | Seed To Cup",
  },
  description:
    "From seed to cup, discover the story behind coffee. A platform connecting coffee culture, knowledge and commerce through sessions, membership and consultations by Cashmere Events.",
  keywords: [
    "coffee",
    "Ethiopian coffee",
    "coffee education",
    "coffee events",
    "specialty coffee",
    "coffee community",
    "Addis Ababa",
    "Cashmere Events",
    "coffee consultation",
    "barista",
    "roasting",
    "coffee culture",
  ],
  authors: [{ name: "Cashmere Events" }],
  openGraph: {
    title: "Seed To Cup — Coffee, Culture, Commerce",
    description:
      "A platform connecting coffee culture, knowledge, and commerce through experiences, conversations, and community.",
    type: "website",
    locale: "en_US",
    siteName: "Seed To Cup",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seed To Cup — Coffee, Culture, Commerce",
    description:
      "A platform connecting coffee culture, knowledge, and commerce through experiences, conversations, and community.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-cream text-espresso font-body"
        suppressHydrationWarning
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
