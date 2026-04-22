import { Suspense } from "react";
import { products } from "@/lib/data";
import ProductGrid from "@/components/product/ProductGrid";
import ProductFilter from "@/components/product/ProductFilter";
import { ProductGridSkeleton } from "@/components/ui/Skeleton";

function filterProducts(all, { category, brand, price, q, sort }) {
  let list = [...all];

  if (q) {
    const lower = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower) ||
        p.description.toLowerCase().includes(lower)
    );
  }

  if (category) list = list.filter((p) => p.category === category);
  if (brand) list = list.filter((p) => p.brand === brand);

  if (price) {
    const [min, max] = price.split("-").map(Number);
    list = list.filter((p) => {
      const pr = p.salePrice ?? p.price;
      return pr >= min && pr <= max;
    });
  }

  if (sort === "price_asc") list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  else if (sort === "price_desc") list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
  else if (sort === "newest") list.reverse();

  return list;
}

function FilterSidebar() {
  return (
    <Suspense fallback={<div className="w-56 bg-[#141418] rounded-2xl h-96 animate-pulse" />}>
      <ProductFilter />
    </Suspense>
  );
}

export default async function ProductsPage({ searchParams }) {
  const sp = await searchParams;
  const filtered = filterProducts(products, {
    category: sp.category || "",
    brand: sp.brand || "",
    price: sp.price || "",
    q: sp.q || "",
    sort: sp.sort || "",
  });

  const title = sp.category
    ? {
        shoes: "Giày Bóng Đá",
        jerseys: "Áo Đấu",
        balls: "Bóng",
        accessories: "Phụ Kiện",
        goalkeeper: "Đồ Thủ Môn",
        training: "Đồ Tập Luyện",
      }[sp.category] || "Sản phẩm"
    : sp.q
    ? `Kết quả cho "${sp.q}"`
    : "Tất cả sản phẩm";

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="text-sm text-[#6b6b80] mt-1">{filtered.length} sản phẩm</p>
      </div>

      <div className="flex gap-6">
        {/* Filter Sidebar */}
        <aside className="hidden md:block w-56 flex-shrink-0">
          <div className="sticky top-24">
            <FilterSidebar />
          </div>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid products={filtered} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
