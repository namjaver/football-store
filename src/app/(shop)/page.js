import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, categories, formatPrice } from "@/lib/data";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";

function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0f1a0f] via-[#070709] to-[#0a0d1a] border-b border-[#1e1e26]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-[#00e676] rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#448aff] rounded-full blur-3xl" />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00e67618] border border-[#00e67630] rounded-full text-[#00e676] text-xs font-semibold mb-6">
            ⚽ Mùa giải 2024/25 đã bắt đầu
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Đồ Bóng Đá
            <br />
            <span className="text-[#00e676]">Chính Hãng</span>
            <br />
            Tại Việt Nam
          </h1>
          <p className="text-[#6b6b80] text-lg mb-8 max-w-lg">
            Nike, Adidas, Puma chính hãng 100%. Giày, áo đấu, phụ kiện cho mọi trình độ. Giao hàng toàn quốc.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/products">
              <Button size="lg">Mua sắm ngay →</Button>
            </Link>
            <Link href="/products?category=shoes">
              <Button variant="outline" size="lg">Xem giày mới</Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12">
            {[
              { label: "Sản phẩm", value: "500+" },
              { label: "Thương hiệu", value: "15+" },
              { label: "Khách hàng", value: "10K+" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-[#6b6b80]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Danh mục</h2>
        <Link href="/products" className="text-sm text-[#00e676] hover:underline">
          Xem tất cả →
        </Link>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/products?category=${cat.id}`}
            className="flex flex-col items-center gap-2 p-4 bg-[#141418] border border-[#1e1e26] rounded-2xl hover:border-[#00e676] hover:bg-[#141418] transition-all group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{cat.icon}</span>
            <span className="text-xs text-[#6b6b80] group-hover:text-[#00e676] text-center font-medium transition-colors">
              {cat.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function FeaturedBrands() {
  return (
    <section className="border-y border-[#1e1e26] bg-[#0f0f12] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <p className="text-xs text-[#6b6b80] text-center font-semibold uppercase tracking-widest mb-6">
          Thương hiệu chính hãng
        </p>
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {["Nike", "Adidas", "Puma", "New Balance", "Under Armour"].map((brand) => (
            <Link
              key={brand}
              href={`/products?brand=${brand}`}
              className="text-[#2e2e3a] hover:text-[#6b6b80] font-black text-lg md:text-2xl transition-colors tracking-tight"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: "🚚", title: "Miễn phí vận chuyển", desc: "Đơn hàng từ 500K trở lên" },
          { icon: "🔄", title: "Đổi trả 30 ngày", desc: "Không cần lý do" },
          { icon: "✅", title: "Chính hãng 100%", desc: "Cam kết hoặc hoàn tiền" },
        ].map((p) => (
          <div
            key={p.title}
            className="flex items-center gap-4 p-4 bg-[#141418] border border-[#1e1e26] rounded-2xl"
          >
            <span className="text-3xl">{p.icon}</span>
            <div>
              <p className="text-sm font-semibold text-white">{p.title}</p>
              <p className="text-xs text-[#6b6b80] mt-0.5">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <HeroBanner />
      <FeaturedBrands />
      <CategorySection />
      <PromoBanner />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Sản phẩm nổi bật</h2>
            <p className="text-sm text-[#6b6b80] mt-1">Được yêu thích nhất mùa này</p>
          </div>
          <Link href="/products" className="text-sm text-[#00e676] hover:underline">
            Xem tất cả →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#00e67618] to-[#448aff18] border border-[#00e67630] rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4">
            Nhận <span className="text-[#00e676]">10% off</span> đơn đầu tiên
          </h2>
          <p className="text-[#6b6b80] mb-6">Đăng ký tài khoản và nhận ngay mã giảm giá</p>
          <Link href="/register">
            <Button size="lg">Đăng ký ngay</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
