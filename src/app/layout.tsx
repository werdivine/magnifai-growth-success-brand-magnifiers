import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
    display: "swap",
});

const manrope = Manrope({
    subsets: ["latin"],
    variable: "--font-manrope",
    display: "swap",
});

export const metadata: Metadata = {
    title: 'WeMagnifAI | Magnifying Growth, Success, and AI Innovation',
    description: 'Transform your business with WeMagnifAI—the AI-powered creative agency that magnifies growth, drives success, and delivers cutting-edge AI automation, digital marketing, and premium design services for SMBs and entrepreneurs.',
    viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
    themeColor: '#6366f1',
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${playfair.variable} ${manrope.variable}`}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
