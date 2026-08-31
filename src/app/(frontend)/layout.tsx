import type { Metadata } from "next";
import { Playfair_Display, Inter, Geist } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScheduleProvider } from "@/lib/schedule-context";
import { ScheduleDrawer } from "@/components/schedule-drawer";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neat Nest — Cleaning Services in Accra",
  description:
    "Neat Nest is a discreet, detail-obsessed cleaning house caring for the homes, offices and residences of Accra's most considered clients.",
  icons: {
    icon: [
      { url: "/images/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon_io/favicon.ico" },
    ],
    apple: "/images/favicon_io/apple-touch-icon.png",
  },
  manifest: "/images/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", playfair.variable, inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-background text-foreground">
        <ScheduleProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <ScheduleDrawer />
          <Toaster />
        </ScheduleProvider>
      </body>
    </html>
  );
}
