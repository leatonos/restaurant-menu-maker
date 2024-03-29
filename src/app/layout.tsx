import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { store } from "./redux/store";
import { Provider } from 'react-redux'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Menu Maker",
  description: "Create your digital menu for free",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
          <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
