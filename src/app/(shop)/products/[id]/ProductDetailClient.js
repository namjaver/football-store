"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";

export default function ProductDetailClient({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();

  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = !!product.salePrice;
  const discountPct = hasDiscount
    ? Math.round((1 - product.salePrice / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, selectedColor, quantity);
    openCart();
    showToast(`Đã thêm vào giỏ hàng!`, "success");
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#6b6b80] mb-8">
        <Link href="/" className="hover:text-white">Trang chủ</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-white">Sản phẩm</Link>
        <span>/</span>
        <span className="text-white truncate">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="space-y-3">
          <div className="relative aspect-square bg-[#141418] rounded-2xl overflow-hidden border border-[#1e1e26]">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            {product.badge && (
              <div className="absolute top-4 left-4">
                <Badge type={product.badge} />
              </div>
            )}
            {hasDiscount && (
              <div className="absolute top-4 right-4 bg-[#ff1744] text-white text-xs font-bold px-2 py-1 rounded-lg">
                -{discountPct}%
              </div>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? "border-[#00e676]" : "border-[#1e1e26] hover:border-[#2e2e3a]"
                  }`}
                >
                  <Image src={img} alt="" fill className="object-cover" sizes="64px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-[#00e676] font-semibold mb-1">{product.brand}</p>
            <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className={`text-sm ${s <= Math.round(product.rating) ? "text-yellow-400" : "text-[#2e2e3a]"}`}>★</span>
                ))}
              </div>
              <span className="text-sm text-[#6b6b80]">{product.rating} ({product.reviews} đánh giá)</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-white">{formatPrice(displayPrice)}</span>
            {hasDiscount && (
              <>
                <span className="text-lg text-[#6b6b80] line-through">{formatPrice(product.price)}</span>
                <span className="text-sm font-bold text-[#ff1744] bg-[#ff174418] px-2 py-0.5 rounded-lg">
                  -{discountPct}%
                </span>
              </>
            )}
          </div>

          {/* Color */}
          <div>
            <p className="text-sm font-semibold text-[#6b6b80] mb-2 uppercase tracking-wider text-xs">
              Màu sắc: <span className="text-white">{selectedColor}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3 py-1.5 text-sm rounded-xl border transition-all ${
                    selectedColor === c
                      ? "border-[#00e676] bg-[#00e67618] text-[#00e676]"
                      : "border-[#1e1e26] text-[#6b6b80] hover:border-[#2e2e3a] hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-wider">
                Size: <span className="text-white">{selectedSize}</span>
              </p>
              <button className="text-xs text-[#448aff] hover:underline">Hướng dẫn chọn size →</button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-10 text-sm font-semibold rounded-xl border transition-all ${
                    selectedSize === s
                      ? "border-[#00e676] bg-[#00e67618] text-[#00e676]"
                      : "border-[#1e1e26] text-[#6b6b80] hover:border-[#2e2e3a] hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-wider mb-2">Số lượng</p>
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#141418] border border-[#1e1e26] rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6b6b80] hover:text-white hover:bg-[#1e1e26] transition-all text-lg"
                >
                  −
                </button>
                <span className="w-12 text-center text-white font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#6b6b80] hover:text-white hover:bg-[#1e1e26] transition-all text-lg"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-[#6b6b80]">{product.stock} sản phẩm có sẵn</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              size="lg"
              className="flex-1"
            >
              🛒 Thêm vào giỏ
            </Button>
            <button className="w-12 h-12 flex items-center justify-center border border-[#1e1e26] rounded-xl text-[#6b6b80] hover:text-[#ff1744] hover:border-[#ff174430] transition-all">
              ♡
            </button>
          </div>

          {/* Shipping info */}
          <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-4 space-y-3">
            {[
              { icon: "🚚", text: "Miễn phí vận chuyển đơn từ 500K" },
              { icon: "🔄", text: "Đổi trả trong 30 ngày" },
              { icon: "✅", text: "Hàng chính hãng 100% có tem mác" },
              { icon: "💳", text: "Thanh toán: VNPay, Momo, COD" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-sm text-[#6b6b80]">
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div>
            <p className="text-xs font-semibold text-[#6b6b80] uppercase tracking-wider mb-2">Mô tả sản phẩm</p>
            <p className="text-sm text-[#6b6b80] leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
