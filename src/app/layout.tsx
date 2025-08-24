import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/ModeToggle";
import { NavigationBar } from "@/components/NavigationBar";
import { Badge } from "@/components/ui/badge";
import TopBar from "@/components/TopBar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "arla | Aircraft Registration Lookup API",
  description:
    "A free and public API for fetching registration information for aircraft.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopBar />
          <div className="p-4 pt-12">{children}</div>
        </ThemeProvider>
        <Script
          defer={true}
          async={true}
          src="https://lytics.njf.dev/script.js"
          data-website-id="ff37b19c-a674-4565-b64f-98c127e64df5"
        />
      </body>
    </html>
  );
}
