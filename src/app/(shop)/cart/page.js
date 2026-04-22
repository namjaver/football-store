"use client";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

function CartRow({ item }) {
  const { updateQuantity, removeItem } = useCartStore();
  const price = item.product.salePrice ?? item.product.price;

  return (
    <div className="flex gap-4 py-5 border-b border-[#1e1e26]">
      <div className="relative w-24 h-24 bg-[#141418] rounded-2xl overflow-hidden flex-shrink-0">
        <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="96px" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[#6b6b80] text-xs mb-0.5">{item.product.brand}</p>
        <h3 className="font-semibold text-white text-sm leading-snug">{item.product.name}</h3>
        <p className="text-xs text-[#6b6b80] mt-1">Size {item.size} · {item.color}</p>
        <p className="text-sm font-bold text-[#00e676] mt-2">{formatPrice(price)}</p>
      </div>
      <div className="flex flex-col items-end gap-3">
        <button onClick={() => removeItem(item.key)} className="text-[#6b6b80] hover:text-[#ff1744] text-sm transition-colors">
          ✕
        </button>
        <div className="flex items-center gap-1 bg-[#141418] border border-[#1e1e26] rounded-xl overflow-hidden">
          <button onClick={() => updateQuantity(item.key, item.quantity - 1)} className="w-8 h-8 text-[#6b6b80] hover:text-white text-lg flex items-center justify-center">−</button>
          <span className="w-8 text-center text-white text-sm font-semibold">{item.quantity}</span>
          <button onClick={() => updateQuantity(item.key, item.quantity + 1)} className="w-8 h-8 text-[#6b6b80] hover:text-white text-lg flex items-center justify-center">+</button>
        </div>
        <p className="text-sm font-bold text-white">{formatPrice(price * item.quantity)}</p>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, clearCart } = useCartStore();
  const subtotal = items.reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 35000;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-4">🛒</span>
        <h1 className="text-2xl font-bold text-white mb-2">Giỏ hàng trống</h1>
        <p className="text-[#6b6b80] mb-6">Bạn chưa thêm sản phẩm nào vào giỏ hàng</p>
        <Link href="/products"><Button size="lg">Khám phá sản phẩm</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Giỏ hàng ({items.length})</h1>
        <button onClick={clearCart} className="text-sm text-[#6b6b80] hover:text-[#ff1744] transition-colors">
          Xóa tất cả
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Items */}
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartRow key={item.key} item={item} />
          ))}

          <div className="mt-6">
            <Link href="/products" className="text-sm text-[#00e676] hover:underline">
              ← Tiếp tục mua sắm
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-semibold text-white mb-5">Tóm tắt đơn hàng</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b80]">Tạm tính</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#6b6b80]">Phí vận chuyển</span>
              <span className={shipping === 0 ? "text-[#00e676]" : "text-white"}>
                {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
              </span>
            </div>
            {shipping === 0 && (
              <p className="text-xs text-[#00e676]">✓ Bạn được miễn phí vận chuyển!</p>
            )}
            {shipping > 0 && (
              <p className="text-xs text-[#6b6b80]">
                Thêm {formatPrice(500000 - subtotal)} để miễn phí ship
              </p>
            )}
          </div>
          <div className="border-t border-[#1e1e26] pt-4 mb-5">
            <div className="flex justify-between font-bold">
              <span className="text-white">Tổng cộng</span>
              <span className="text-[#00e676] text-lg">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Promo code */}
          <div className="flex gap-2 mb-5">
            <input
              placeholder="Mã giảm giá"
              className="flex-1 bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676]"
            />
            <Button variant="secondary" size="sm">Áp dụng</Button>
          </div>

          <Link href="/checkout">
            <Button size="lg" className="w-full">Thanh toán →</Button>
          </Link>

          <div className="mt-4 flex items-center justify-center gap-2">
            {["VNPay", "Momo", "COD"].map((m) => (
              <span key={m} className="text-[10px] px-2 py-1 bg-[#0f0f12] text-[#6b6b80] rounded-lg border border-[#1e1e26]">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
