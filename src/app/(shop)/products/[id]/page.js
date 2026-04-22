import { notFound } from "next/navigation";
import { getProductById, products, formatPrice } from "@/lib/data";
import ProductDetailClient from "./ProductDetailClient";
import ProductCard from "@/components/product/ProductCard";

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Không tìm thấy" };
  return {
    title: `${product.name} | Football Store`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <ProductDetailClient product={product} />

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-white mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
