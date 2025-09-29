import { ClerkProvider } from "@/components/clerk-provider";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme/provider";
import { allFonts } from "@/lib/fonts/default";
import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Form Builder App",
  description: "Generated Form by GUI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${allFonts}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
