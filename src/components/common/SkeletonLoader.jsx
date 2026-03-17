// components/common/SkeletonLoader.jsx

export function ProductCardSkeleton() {
  return (
    <div className="bg-[#111] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-5 w-2/5 rounded" />
        <div className="skeleton h-9 w-full rounded-lg" />
      </div>
    </div>
  )
}

export function BlogCardSkeleton() {
  return (
    <div className="bg-white border rounded-xl overflow-hidden animate-pulse">
      <div className="h-[220px] bg-gray-200" />

      <div className="p-4 space-y-3">
        <div className="h-3 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export function BrandCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="skeleton h-10 w-32 mx-auto rounded mb-3" />
      <div className="skeleton h-4 w-20 mx-auto rounded mb-2" />
      <div className="skeleton h-3 w-16 mx-auto rounded" />
    </div>
  )
}

export function SectionSkeleton({ cards = 4, CardSkeleton = ProductCardSkeleton }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: cards }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  )
}
