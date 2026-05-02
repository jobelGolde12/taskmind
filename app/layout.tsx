import type { Metadata } from "next";
import { Roboto, Montserrat, PT_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "./layout-wrapper";

const roboto = Roboto({ 
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const ptMono = PT_Mono({ 
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-mono",
});

export const metadata: Metadata = {
  title: "TaskMind AI – Convert Messages, Emails, and Announcements into Actionable Tasks Instantly",
  description: "TaskMind AI is a modern AI-powered web app that converts emails, messages, and announcements into clear action items, deadlines, and priorities using privacy-first browser-based AI.",
  keywords: [
    "AI task extractor",
    "convert message to tasks",
    "email to action items",
    "announcement analyzer AI",
    "deadline extractor tool",
    "productivity AI assistant",
    "task management",
    "AI productivity",
  ],
  authors: [{ name: "TaskMind AI" }],
  creator: "TaskMind AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://taskmind.ai",
    title: "TaskMind AI – Smart Action & Decision Intelligence Platform",
    description: "Turn messages, announcements, and emails into clear actions, deadlines, and decisions with AI-powered analysis.",
    siteName: "TaskMind AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskMind AI – Smart Action & Decision Intelligence Platform",
    description: "Turn messages, announcements, and emails into clear actions, deadlines, and decisions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={`${roboto.variable} ${montserrat.variable} ${ptMono.variable} font-sans min-h-full flex flex-col bg-[var(--background)] text-[var(--text)]`}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}