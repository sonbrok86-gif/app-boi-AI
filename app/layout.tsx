import "./globals.css";

export const metadata = {
  title: "App Bói AI Pro",
  description: "Xem quẻ chủ đề, tử vi trọn đời, trắc nghiệm tính cách, Telegram và Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}