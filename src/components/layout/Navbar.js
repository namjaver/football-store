"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems, toggleCart } = useCartStore();
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="sticky top-0 z-50 border-b border-[#1e1e26] bg-[#070709]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 bg-[#00e676] rounded-lg flex items-center justify-center text-base">
            ⚽
          </div>
          <span className="font-bold text-white text-base hidden sm:block">
            Football<span className="text-[#00e676]">Store</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 ml-4">
          <Link href="/products" className="px-3 py-1.5 text-sm text-[#6b6b80] hover:text-[#eaeaf0] rounded-lg hover:bg-[#1e1e26] transition-all">
            Tất cả sản phẩm
          </Link>
          <Link href="/products?category=shoes" className="px-3 py-1.5 text-sm text-[#6b6b80] hover:text-[#eaeaf0] rounded-lg hover:bg-[#1e1e26] transition-all">
            Giày
          </Link>
          <Link href="/products?category=jerseys" className="px-3 py-1.5 text-sm text-[#6b6b80] hover:text-[#eaeaf0] rounded-lg hover:bg-[#1e1e26] transition-all">
            Áo Đấu
          </Link>
          <Link href="/products?category=balls" className="px-3 py-1.5 text-sm text-[#6b6b80] hover:text-[#eaeaf0] rounded-lg hover:bg-[#1e1e26] transition-all">
            Bóng
          </Link>
        </nav>

        {/* Search */}
        <div className="flex-1 max-w-xs ml-auto">
          {searchOpen ? (
            <div className="flex items-center gap-2">
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm sản phẩm..."
                className="w-full bg-[#141418] border border-[#2e2e3a] rounded-xl px-3 py-2 text-sm text-[#eaeaf0] placeholder-[#6b6b80] outline-none focus:border-[#00e676]"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && query.trim()) {
                    window.location.href = `/products?q=${encodeURIComponent(query.trim())}`;
                  }
                  if (e.key === "Escape") setSearchOpen(false);
                }}
              />
              <button onClick={() => setSearchOpen(false)} className="text-[#6b6b80] hover:text-white">✕</button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="ml-auto flex items-center gap-2 px-3 py-2 text-sm text-[#6b6b80] hover:text-white bg-[#141418] border border-[#1e1e26] rounded-xl w-full hover:border-[#2e2e3a] transition-all"
            >
              <span>🔍</span>
              <span className="hidden sm:block">Tìm kiếm...</span>
            </button>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm text-[#6b6b80] hover:text-white rounded-xl hover:bg-[#1e1e26] transition-all">
            👤 Đăng nhập
          </Link>

          <button
            onClick={toggleCart}
            className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#1e1e26] text-[#eaeaf0] transition-all"
          >
            🛒
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00e676] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
