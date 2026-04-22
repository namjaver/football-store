"use client";
import { useState } from "react";
import { products as initialProducts, formatPrice } from "@/lib/data";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";

export default function AdminProductsPage() {
  const [items, setItems] = useState(initialProducts);
  const [search, setSearch] = useState("");

  const filtered = items.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isActive: !p.isActive } : p))
    );
    showToast("Đã cập nhật trạng thái sản phẩm", "success");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Sản phẩm</h1>
          <p className="text-sm text-[#6b6b80] mt-0.5">{items.length} sản phẩm</p>
        </div>
        <Button size="md">+ Thêm sản phẩm</Button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        className="w-full max-w-sm bg-[#141418] border border-[#1e1e26] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676]"
      />

      {/* Table */}
      <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e26]">
                {["Sản phẩm", "Thương hiệu", "Giá", "Tồn kho", "Badge", "Trạng thái", ""].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-[#6b6b80] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e26]">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-[#1e1e26]/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#1e1e26] flex-shrink-0">
                        <Image src={p.images[0]} alt="" fill className="object-cover" sizes="40px" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm text-white font-medium truncate max-w-[180px]">{p.name}</p>
                        <p className="text-xs text-[#6b6b80]">{p.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[#6b6b80]">{p.brand}</td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-semibold text-white">{formatPrice(p.salePrice ?? p.price)}</p>
                    {p.salePrice && (
                      <p className="text-xs text-[#6b6b80] line-through">{formatPrice(p.price)}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium ${p.stock > 10 ? "text-[#00e676]" : p.stock > 0 ? "text-yellow-400" : "text-[#ff1744]"}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {p.badge ? <Badge type={p.badge} /> : <span className="text-[#2e2e3a] text-xs">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleActive(p.id)}
                      className={`w-9 h-5 rounded-full transition-all relative ${p.isActive ? "bg-[#00e676]" : "bg-[#1e1e26]"}`}
                    >
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.isActive ? "left-4.5" : "left-0.5"}`} style={{ left: p.isActive ? "18px" : "2px" }} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#448aff] hover:underline">Sửa</button>
                      <button className="text-xs text-[#ff1744] hover:underline">Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
