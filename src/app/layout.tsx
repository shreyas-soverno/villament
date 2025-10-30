import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Argesta Display - Custom font for elegant titles
const argestaDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/Argesta-Hairline.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/Argesta-Hairline-Italic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../../public/fonts/Argesta-Text.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Argesta-Text-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/fonts/Argesta-Display.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Argesta-Display-Italic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../public/fonts/Argesta-Headline.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/Argesta-Headline-Italic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../../public/fonts/Argesta-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-argesta",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Montserrat - Google Font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Villament - Luxury Living in Dharwad",
  description: "Experience the perfect blend of villa exclusivity and community living in the heart of Dharwad city. Coming Soon.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${argestaDisplay.variable} ${montserrat.variable} antialiased`}
    >
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
