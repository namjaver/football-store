"use client";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";

function CartItemRow({ item }) {
  const { updateQuantity, removeItem } = useCartStore();
  const price = item.product.salePrice ?? item.product.price;

  return (
    <div className="flex gap-3 py-4 border-b border-[#1e1e26] last:border-0">
      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#1e1e26] flex-shrink-0 relative">
        <Image
          src={item.product.images[0]}
          alt={item.product.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{item.product.name}</p>
        <p className="text-xs text-[#6b6b80] mt-0.5">
          Size {item.size} · {item.color}
        </p>
        <p className="text-sm font-semibold text-[#00e676] mt-1">{formatPrice(price)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <button
          onClick={() => removeItem(item.key)}
          className="text-[#6b6b80] hover:text-[#ff1744] text-xs transition-colors"
        >
          ✕
        </button>
        <div className="flex items-center gap-1 bg-[#1e1e26] rounded-lg">
          <button
            onClick={() => updateQuantity(item.key, item.quantity - 1)}
            className="w-7 h-7 flex items-center justify-center text-[#6b6b80] hover:text-white text-sm"
          >
            −
          </button>
          <span className="w-6 text-center text-sm text-white font-medium">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.key, item.quantity + 1)}
            className="w-7 h-7 flex items-center justify-center text-[#6b6b80] hover:text-white text-sm"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer() {
  const { isOpen, closeCart, items, clearCart } = useCartStore();
  const total = items.reduce((sum, i) => {
    const price = i.product.salePrice ?? i.product.price;
    return sum + price * i.quantity;
  }, 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#0f0f12] border-l border-[#1e1e26] z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#1e1e26]">
          <h2 className="font-semibold text-white text-base">
            Giỏ hàng {items.length > 0 && <span className="text-[#00e676]">({items.length})</span>}
          </h2>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs text-[#6b6b80] hover:text-[#ff1744] transition-colors"
              >
                Xóa tất cả
              </button>
            )}
            <button
              onClick={closeCart}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#1e1e26] text-[#6b6b80] hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-4 text-center">
              <span className="text-5xl">🛒</span>
              <p className="text-[#6b6b80] text-sm">Giỏ hàng đang trống</p>
              <Button variant="outline" onClick={closeCart} size="sm">
                Tiếp tục mua sắm
              </Button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <CartItemRow key={item.key} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-[#1e1e26] space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[#6b6b80] text-sm">Tạm tính</span>
              <span className="font-bold text-white">{formatPrice(total)}</span>
            </div>
            <p className="text-xs text-[#6b6b80]">Phí vận chuyển tính ở bước thanh toán</p>
            <Link href="/checkout" onClick={closeCart}>
              <Button className="w-full" size="lg">
                Thanh toán ngay →
              </Button>
            </Link>
            <Link href="/cart" onClick={closeCart}>
              <Button variant="secondary" className="w-full" size="md">
                Xem giỏ hàng
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
