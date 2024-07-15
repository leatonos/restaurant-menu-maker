"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import '@mantine/dropzone/styles.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { store } from "@/app/redux/store";
import { Provider } from 'react-redux'
import { MantineProvider } from '@mantine/core';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <Provider store={store}>
            <body className={inter.className}><MantineProvider>{children}</MantineProvider></body>
        </Provider>
      </UserProvider>
    </html>
  );
}
