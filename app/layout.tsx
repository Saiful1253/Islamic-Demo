import type { Metadata } from "next";
import { Amiri, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dua & Ruqyah — Al Hisnul Muslim",
  description:
    "Al Hisnul Muslim — daily duas and ruqyah with English translation, transliteration and adjustable Arabic font settings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${amiri.variable} h-full antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
