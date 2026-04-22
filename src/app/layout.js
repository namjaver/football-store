import "./globals.css";

export const metadata = {
  title: "Football Store | Đồ Thể Thao Bóng Đá",
  description: "Mua giày, áo đấu, phụ kiện bóng đá chính hãng Nike, Adidas, Puma tại Việt Nam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
