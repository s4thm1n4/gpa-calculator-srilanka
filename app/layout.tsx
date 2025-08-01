import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./design-system.css";
import "./components/calculator.css";
import "./components/forms.css";
import Header from "./components/Header";
import Footer from "./components/Footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | GPA Calculator Sri Lanka',
    default: 'GPA Calculator Sri Lanka | Calculate Your University GPA',
  },
  description: 'The 100% FREE, most accurate and easy-to-use GPA and WGPA calculators for Sri Lankan university students.',
  verification: {
    google: 'TzQ2i3TFMmJ0SpI81gb1_4bhYnI4D7H6I5Ad-S8aeTc',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}