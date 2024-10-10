import type { Metadata } from "next";
import "@styles/globals.css";
import { poppins } from "@fonts/fonts";

export const metadata: Metadata = {
  title: "Data4Life",
  description: "~",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>
        {children}
      </body>
    </html>
  );
}
