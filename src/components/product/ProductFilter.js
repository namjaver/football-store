"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/data";

const brands = ["Nike", "Adidas", "Puma"];
const priceRanges = [
  { label: "Dưới 1 triệu", value: "0-1000000" },
  { label: "1 - 2 triệu", value: "1000000-2000000" },
  { label: "2 - 4 triệu", value: "2000000-4000000" },
  { label: "Trên 4 triệu", value: "4000000-99999999" },
];

export default function ProductFilter() {
  const router = useRouter();
  const params = useSearchParams();

  const activeCategory = params.get("category") || "";
  const activeBrand = params.get("brand") || "";
  const activePrice = params.get("price") || "";
  const activeSort = params.get("sort") || "";

  const setParam = (key, value) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    router.push(`/products?${next.toString()}`);
  };

  const clear = () => router.push("/products");

  const hasFilter = activeCategory || activeBrand || activePrice || activeSort;

  return (
    <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-4 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white text-sm">Bộ lọc</h3>
        {hasFilter && (
          <button onClick={clear} className="text-xs text-[#ff1744] hover:underline">
            Xóa tất cả
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <p className="text-xs text-[#6b6b80] font-semibold uppercase tracking-wider mb-2">Sắp xếp</p>
        {[
          { label: "Phổ biến nhất", value: "" },
          { label: "Giá thấp → cao", value: "price_asc" },
          { label: "Giá cao → thấp", value: "price_desc" },
          { label: "Mới nhất", value: "newest" },
        ].map((o) => (
          <button
            key={o.value}
            onClick={() => setParam("sort", o.value)}
            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
              activeSort === o.value
                ? "bg-[#00e67618] text-[#00e676]"
                : "text-[#6b6b80] hover:text-white hover:bg-[#1e1e26]"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Category */}
      <div>
        <p className="text-xs text-[#6b6b80] font-semibold uppercase tracking-wider mb-2">Danh mục</p>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setParam("category", activeCategory === c.id ? "" : c.id)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
              activeCategory === c.id
                ? "bg-[#00e67618] text-[#00e676]"
                : "text-[#6b6b80] hover:text-white hover:bg-[#1e1e26]"
            }`}
          >
            <span>{c.icon}</span>
            <span>{c.name}</span>
          </button>
        ))}
      </div>

      {/* Brand */}
      <div>
        <p className="text-xs text-[#6b6b80] font-semibold uppercase tracking-wider mb-2">Thương hiệu</p>
        {brands.map((b) => (
          <button
            key={b}
            onClick={() => setParam("brand", activeBrand === b ? "" : b)}
            className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
              activeBrand === b
                ? "bg-[#00e67618] text-[#00e676]"
                : "text-[#6b6b80] hover:text-white hover:bg-[#1e1e26]"
            }`}
          >
            <span className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center text-[10px] ${
              activeBrand === b ? "border-[#00e676] bg-[#00e676] text-black" : "border-[#2e2e3a]"
            }`}>
              {activeBrand === b ? "✓" : ""}
            </span>
            {b}
          </button>
        ))}
      </div>

      {/* Price */}
      <div>
        <p className="text-xs text-[#6b6b80] font-semibold uppercase tracking-wider mb-2">Khoảng giá</p>
        {priceRanges.map((r) => (
          <button
            key={r.value}
            onClick={() => setParam("price", activePrice === r.value ? "" : r.value)}
            className={`block w-full text-left px-3 py-2 text-sm rounded-lg transition-all ${
              activePrice === r.value
                ? "bg-[#00e67618] text-[#00e676]"
                : "text-[#6b6b80] hover:text-white hover:bg-[#1e1e26]"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>
    </div>
  );
}
