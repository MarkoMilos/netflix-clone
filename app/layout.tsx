import "./globals.css";
import React from "react";

import netflixSans from "@/lib/fonts";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${netflixSans.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
