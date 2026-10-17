import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "BioTrap-SIM™ v2.6 DSS | Intelligent Circular Bioenergy & H₂S Desulfurization — GREEN CHAMPIONS 2026",
  description:
    "Decision Support System (DSS) untuk Dual-Stage Biochar Engineering (Katalisis DIET Biodigester POME), Modular Lead-Lag H₂S Scrubber Skid, dan Valorisasi Pupuk Sirkular BioSulfur™ — Tim Think3rs ITB | Green Champions 2026 (Green Democracy Institute)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased selection:bg-emerald-500 selection:text-white`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
