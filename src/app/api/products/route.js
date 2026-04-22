import { NextResponse } from "next/server";
import { products } from "@/lib/data";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const q = searchParams.get("q");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const sort = searchParams.get("sort");

  let list = [...products];

  if (category) list = list.filter((p) => p.category === category);
  if (brand) list = list.filter((p) => p.brand === brand);
  if (q) {
    const lower = q.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.brand.toLowerCase().includes(lower)
    );
  }

  if (sort === "price_asc") list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  else if (sort === "price_desc") list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));

  const total = list.length;
  const start = (page - 1) * limit;
  const paginated = list.slice(start, start + limit);

  return NextResponse.json({
    data: paginated,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}
