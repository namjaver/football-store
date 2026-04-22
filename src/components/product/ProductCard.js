"use client";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/cartStore";
import { showToast } from "@/components/ui/Toast";

export default function ProductCard({ product }) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault();
    const defaultSize = product.sizes[0];
    const defaultColor = product.colors[0];
    addItem(product, defaultSize, defaultColor, 1);
    openCart();
    showToast(`Đã thêm "${product.name}" vào giỏ hàng`, "success");
  };

  const displayPrice = product.salePrice ?? product.price;
  const hasDiscount = !!product.salePrice;

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden hover:border-[#2e2e3a] transition-all duration-200 hover:-translate-y-0.5"
    >
      {/* Image */}
      <div className="relative h-52 bg-[#1e1e26] overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
        />
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge type={product.badge} />
          </div>
        )}
        {/* Out of stock */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Badge type="hết hàng" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[#6b6b80] mb-1">{product.brand}</p>
        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-2 group-hover:text-[#00e676] transition-colors">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <span className="text-yellow-400 text-xs">★</span>
          <span className="text-xs text-[#6b6b80]">{product.rating} ({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="font-bold text-white">{formatPrice(displayPrice)}</span>
          {hasDiscount && (
            <span className="text-xs text-[#6b6b80] line-through">{formatPrice(product.price)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full py-2 text-sm font-semibold rounded-xl bg-[#00e67618] text-[#00e676] border border-[#00e67630] hover:bg-[#00e676] hover:text-black transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {product.stock === 0 ? "Hết hàng" : "+ Thêm vào giỏ"}
        </button>
      </div>
    </Link>
  );
}
