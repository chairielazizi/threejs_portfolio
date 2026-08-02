
import "./globals.css";
import { kanit, orbitron } from "./fonts";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import BackgroundOrbs from "@/components/BackgroundOrbs";



export const metadata = {
  title: "Chairiel Azizi",
  description: "Chairiel Azizi's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={kanit.className}>
      <body
        className={`${orbitron.variable} antialiased`}
      >
        <BackgroundOrbs />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
