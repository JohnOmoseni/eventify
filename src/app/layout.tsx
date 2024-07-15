import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "./index.css";
import "./utilities.css";

import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { Toaster } from "@/components/ui/toaster";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Eventify",
  description: "Generate events seamlessly. A platform for event management.",
  icons: { icon: "/public/images/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={raleway.variable}>
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          <NextTopLoader />
          <div className="wrapper mx-auto w-full max-w-7xl">{children}</div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
