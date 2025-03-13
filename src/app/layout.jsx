import localFont from "next/font/local";
import { Kanit } from "next/font/google";
import "./globals.css";

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
const kanit = Kanit({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-kanit",
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
