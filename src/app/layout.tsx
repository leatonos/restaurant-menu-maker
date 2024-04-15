import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { store } from "./redux/store";
import { Provider } from 'react-redux'
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Restaurant Menu Maker",
  description: "Restaurant Menu Maker is a free platform to create online and responsive menus for your restaurant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
          <body className={inter.className}>
              {children}
            </body>
      </UserProvider>
    </html>
  );
}
