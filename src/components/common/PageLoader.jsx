// components/common/PageLoader.jsx
export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin" />
        </div>
        <p className="font-heading text-sm text-[#666] tracking-widest uppercase">Loading</p>
      </div>
    </div>
  )
}
