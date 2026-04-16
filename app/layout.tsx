import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bói Vui AI",
  description: "Ứng dụng bói AI kiểu bạn thân"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}