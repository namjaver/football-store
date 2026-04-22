export function Skeleton({ className = "" }) {
  return (
    <div className={`animate-pulse bg-[#1e1e26] rounded-xl ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden">
      <Skeleton className="h-56 rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-9 w-full" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
