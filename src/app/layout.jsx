import localFont from "next/font/local";
import "./globals.css";
import { kanit } from "./fonts";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Chairiel Azizi",
  description: "Chairiel Azizi's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.className}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
