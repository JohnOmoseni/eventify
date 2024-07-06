import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import "./index.css";
import "./utilities.css";

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
          <NextTopLoader />
          <div className="wrapper mx-auto w-full max-w-7xl">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
