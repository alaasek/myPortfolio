import { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "./ThemeProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Alaa Sekiou — AI Engineer & Full-Stack Developer",
  description:
    "Master's student in Artificial Intelligence (USTHB) and full-stack developer building intelligent applications and modern web experiences.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Fixed animated background — replaces the old static bg-tech.png */}
          <div className="bg-field" aria-hidden="true">
            <div className="bg-grid" />
            <div className="bg-blob bg-blob--1" />
            <div className="bg-blob bg-blob--2" />
            <div className="bg-noise" />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}