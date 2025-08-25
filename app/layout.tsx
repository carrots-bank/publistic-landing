// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { Inter, Montserrat } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const mont = Montserrat({ subsets: ["latin", "cyrillic"], weight: ["600","700","800"], variable: "--font-mont" });

export const metadata: Metadata = {
  title: "Publistic — будущее публикаций в Telegram",
  description: "Премиальный AI ассистент для Telegram каналов: анализ трендов, умные посты, предпросмотр и полный контроль.",
  other: {
    "theme-color": "#0B0E12",
    "og:title": "Publistic — будущее публикаций в Telegram",
    "og:description": "AI ассистент для каналов: тренды, генерация постов, предпросмотр, публикация по расписанию.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${mont.variable}`}> 
      <body className="bg-ink text-white antialiased">
        {children}
      </body>
    </html>
  );
}


