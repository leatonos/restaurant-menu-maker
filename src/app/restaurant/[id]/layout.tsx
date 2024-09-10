import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Menu Factory - Restaurant",
  description: "Menu Factory is a free online platform to create online and responsive menus ",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>){
  return (
    <html lang="en">
      
          <body>
              {children}
            </body>
    </html>
  );
}
