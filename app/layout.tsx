import type { Metadata } from "next";
import { Inter, Nunito } from "next/font/google";
import "./globals.css";

import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import { getServices } from "@/app/lib/services";
import { getContact } from "@/app/lib/contact";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tandem Care | NDIS Registered Provider",
  description: "Providing the best care, personalized just for you.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const services = await getServices();
  const contactData = await getContact();

  return (
    <html lang="en" className={`${inter.variable} ${nunito.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <Header services={services} contact={contactData?.contact ?? null} />

        {children}

        <Footer services={services} contact={contactData?.contact ?? null} />
      </body>
    </html>
  );
}
