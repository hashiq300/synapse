import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { cn } from "@/lib/utils";


const poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.className, "overflow-x-hidden")}>{children}</body>
    </html>
  );
}
