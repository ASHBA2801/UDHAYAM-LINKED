import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/home/Navbar";
import MagicalCursor from "@/components/home/MagicalCursor";
import AnimatedStars from "@/components/home/AnimatedStars";
import { LoadingProvider } from "@/contexts/LoadingContext";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UDHAYAM 2K26 | KIT-CBE",
  description: "UDHAYAM 2K26 - March 5-6th at KIT-CBE",
  keywords: ["UDHAYAM", "2K26", "KIT", "CBE", "college fest", "cultural fest"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cinzelDecorative.variable}`}>
      <body className="magical-bg antialiased">
        <LoadingProvider>
          <AnimatedStars />
          <MagicalCursor />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
        </LoadingProvider>
      </body>
    </html>
  );
}
