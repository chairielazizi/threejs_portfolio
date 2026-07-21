import { Kanit, Rajdhani, Orbitron } from "next/font/google";

export const kanit = Kanit({
  subsets: ["latin"],
  weight: "300",
  display: "swap",
  variable: "--font-kanit",
});
export const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-rajdhani",
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-orbitron",
});
