import { Kanit, Rajdhani } from "next/font/google";

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
