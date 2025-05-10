import type { Metadata } from "next";

import { SessionProvider } from "next-auth/react";
//import { authOptions } from "./api/auth/route";
import { getServerSession } from "next-auth"
import Providers from "./Providers";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//===if i want to share a layout across all pages 
//import Footer from "@/components/Footer";

import ReduxProvider from "./redux-provider";
import { StarknetProvider } from "@/components/starknet-provider";
import { StoreProvider } from "./store/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swift Ramp",
  description: "On/Off Ramping",
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <StarknetProvider>
            {children}
          </StarknetProvider>
        </body>
      </html>
    </StoreProvider>
  );
}