import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/QueryProvider";

const nanum = Nanum_Gothic({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "제주 공공와이파이",
  description: "제주 공공와이파이 정보 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={cn(
          nanum.className,
          "relative flex h-screen w-full items-center justify-center",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
