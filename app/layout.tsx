import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mediso",
  description: "A platform for patients to share health concerns, upvote issues, and connect with doctors for personalized support. Doctors review submissions and choose the issues they can address, simplifying your healthcare journey without the need to juggle between multiple doctors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <Toaster position="bottom-right" richColors/>
        {children}
        </Providers>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
