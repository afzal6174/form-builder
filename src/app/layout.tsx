import { ThemeProvider } from "@/components/theme/provider";
import { allFonts } from "@/lib/fonts/default";
import "@/styles/globals.css";
import type { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Form Builder",
  description: "A simple form builder built with Next.js and Tailwind CSS",
  keywords: [
    "form",
    "builder",
    "next.js",
    "tailwind css",
    "react",
    "typescript",
    "javascript",
  ],
  authors: [{ name: "Afzal Faisal", url: "" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${allFonts}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
