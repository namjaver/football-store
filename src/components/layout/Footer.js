import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e26] bg-[#0f0f12] mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#00e676] rounded-lg flex items-center justify-center">⚽</div>
              <span className="font-bold text-white">Football<span className="text-[#00e676]">Store</span></span>
            </div>
            <p className="text-sm text-[#6b6b80] leading-relaxed">
              Đồ thể thao bóng đá chính hãng. Nike, Adidas, Puma và nhiều thương hiệu hàng đầu thế giới.
            </p>
            <div className="flex gap-3 mt-4">
              {["📘", "📸", "🐦"].map((icon, i) => (
                <button key={i} className="w-8 h-8 bg-[#1e1e26] rounded-lg flex items-center justify-center text-sm hover:bg-[#2e2e3a] transition-all">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Sản phẩm</h4>
            <ul className="space-y-2">
              {[
                ["Giày bóng đá", "/products?category=shoes"],
                ["Áo đấu", "/products?category=jerseys"],
                ["Bóng", "/products?category=balls"],
                ["Phụ kiện", "/products?category=accessories"],
                ["Thủ môn", "/products?category=goalkeeper"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6b6b80] hover:text-[#eaeaf0] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              {[
                ["Chính sách vận chuyển", "#"],
                ["Đổi trả hàng", "#"],
                ["Hướng dẫn size", "#"],
                ["Liên hệ", "#"],
                ["FAQ", "#"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-[#6b6b80] hover:text-[#eaeaf0] transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm text-[#6b6b80]">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>123 Lê Lợi, Q.1, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>1800-1234 (miễn phí)</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@footballstore.vn</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-xs text-[#6b6b80] mb-2">Phương thức thanh toán:</p>
              <div className="flex gap-2 flex-wrap">
                {["VNPay", "Momo", "COD"].map((m) => (
                  <span key={m} className="text-[10px] px-2 py-1 bg-[#1e1e26] text-[#6b6b80] rounded-lg border border-[#2e2e3a]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#1e1e26] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-[#6b6b80]">
            © 2024 Football Store. Tất cả quyền được bảo lưu.
          </p>
          <div className="flex gap-4 text-xs text-[#6b6b80]">
            <Link href="#" className="hover:text-white">Điều khoản</Link>
            <Link href="#" className="hover:text-white">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
