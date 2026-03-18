import { useState, useMemo, useCallback, memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal, X, SearchX, ArrowUpDown } from 'lucide-react'
import {
  productsData,
  CATEGORY_FILTERS,
  DEFAULT_FILTERS,
} from '../../data/products.data.js'
import { collectionsData } from '../../data/collections.data.js'
import { staggerContainer, staggerItem } from '../../utils/animations.js'
import { useBreakpoint } from '../../hooks/useMediaQuery.js'

// ─── Constants ────────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { label: 'Relevance',       value: 'relevance'  },
  { label: 'Price: Low–High', value: 'price_asc'  },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Expert Score',    value: 'score'       },
]

const ALL_PRICE_RANGES = [
  ...Object.values(CATEGORY_FILTERS).flatMap((c) => c.price ?? []),
  ...DEFAULT_FILTERS.price,
]

const HEADER_HEIGHT_MOBILE = 'top-[84px]'
const DESKTOP_SIDEBAR_TOP  = 'top-[140px]'

// ─── Filter helpers ────────────────────────────────────────────────────────────

function applyFilters(list, { categorySlug, collectionData, filters, sort, q }) {
  let result

  if (collectionData) {
    result = collectionData.productIds
      .map((id) => list.find((p) => p.slug === id))
      .filter(Boolean)
  } else if (categorySlug) {
    result = list.filter((p) => p.category === categorySlug)
  } else {
    result = [...list]
  }

  if (filters.brands?.length > 0)
    result = result.filter((p) => filters.brands.includes(p.brand))

  if (filters.price) {
    const range = ALL_PRICE_RANGES.find((r) => r.label === filters.price)
    if (range)
      result = result.filter((p) => p.currentPrice >= range.min && p.currentPrice < range.max)
  }

  if (filters.type)    result = result.filter((p) => p.type === filters.type)
  if (filters.ram)     result = result.filter((p) => p.ram === filters.ram)
  if (filters.storage) result = result.filter((p) => p.storage === filters.storage)
  if (filters.display) result = result.filter((p) => p.displaySize === filters.display)
  if (filters.battery) result = result.filter((p) => p.battery === filters.battery || (p.battery && p.battery.includes(filters.battery.replace('mAh',''))))
  if (filters.anc)     result = result.filter((p) => p.anc === filters.anc)
  if (filters.sensor)  result = result.filter((p) => p.sensor === filters.sensor)
  if (filters.processor) result = result.filter((p) => p.processor === filters.processor)

  if (q) {
    const lq = q.toLowerCase()
    result = result.filter(
      (p) => p.name.toLowerCase().includes(lq) || p.brand.toLowerCase().includes(lq),
    )
  }

  const sorted = [...result]
  if (sort === 'price_asc')  sorted.sort((a, b) => a.currentPrice - b.currentPrice)
  if (sort === 'price_desc') sorted.sort((a, b) => b.currentPrice - a.currentPrice)
  if (sort === 'score')      sorted.sort((a, b) => (b.expertScore || 0) - (a.expertScore || 0))

  return sorted
}

// ─── FilterPills (used in mobile drawer) ─────────────────────────────────────

const FilterPills = memo(({ label, options, selected, onChange }) => (
  <div className="mb-5">
    <p className="text-sm font-semibold text-gray-800 mb-2">{label}</p>
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const val = typeof opt === 'string' ? opt : opt.label
        const isActive = selected === val
        return (
          <button
            key={val}
            onClick={() => onChange(isActive ? null : val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-[#FF4500] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {val}
          </button>
        )
      })}
    </div>
  </div>
))

// ─── BrandPills (checkboxes as pills on mobile) ───────────────────────────────

const BrandPills = memo(({ brands, selected, onToggle }) => (
  <div className="mb-5">
    <p className="text-sm font-semibold text-gray-800 mb-2">Brand</p>
    <div className="flex flex-wrap gap-2">
      {brands.map((b) => {
        const isActive = selected.includes(b)
        return (
          <button
            key={b}
            onClick={() => onToggle(b)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive
                ? 'bg-[#FF4500] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {b}
          </button>
        )
      })}
    </div>
  </div>
))

// ─── Flipkart-style Accordion Section (desktop) ──────────────────────────────

const AccordionSection = memo(({ title, defaultOpen = true, children, hasActive = false }) => {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between py-3 text-left group"
      >
        <span className={`text-[0.72rem] font-bold uppercase tracking-wider ${hasActive ? 'text-[#FF4500]' : 'text-gray-700'}`}>
          {title}
        </span>
        <svg
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pb-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// ─── Flipkart-style Checkbox row ─────────────────────────────────────────────

const FKCheckbox = memo(({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group hover:bg-gray-50 -mx-1 px-1 rounded">
    <div className={`w-4 h-4 flex-shrink-0 rounded border-2 flex items-center justify-center transition-all ${
      checked ? 'bg-[#FF4500] border-[#FF4500]' : 'border-gray-300 group-hover:border-gray-400'
    }`}>
      {checked && (
        <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className={`text-[0.78rem] leading-snug transition-colors ${checked ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-gray-800'}`}>
      {label}
    </span>
  </label>
))

// ─── Shared filter content (renders differently on desktop vs mobile) ──────────

const FilterContent = memo(({ cfg, brands, prices, filters, onToggleBrand, onSet, isMobile = false }) => {
  if (isMobile) {
    // Mobile stays as pills
    return (
      <>
        <BrandPills brands={brands} selected={filters.brands} onToggle={onToggleBrand} />
        <FilterPills label="Price" options={prices} selected={filters.price} onChange={(v) => onSet('price', v)} />
        {cfg && Object.keys(cfg).map((key) => {
          if (key === 'brands' || key === 'price') return null
          return (
            <FilterPills
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              options={cfg[key]}
              selected={filters[key]}
              onChange={(v) => onSet(key, v)}
            />
          )
        })}
      </>
    )
  }

  // ── Desktop: Flipkart-style accordion ──
  return (
    <div className="divide-y divide-gray-100">

      {/* Brand */}
      <AccordionSection title="Brand" hasActive={filters.brands.length > 0}>
        {brands.map((b) => (
          <FKCheckbox
            key={b}
            label={b}
            checked={filters.brands.includes(b)}
            onChange={() => onToggleBrand(b)}
          />
        ))}
      </AccordionSection>

      {/* Price */}
      <AccordionSection title="Price Range" hasActive={!!filters.price}>
        {prices.map((opt) => {
          const val = typeof opt === 'string' ? opt : opt.label
          return (
            <FKCheckbox
              key={val}
              label={val}
              checked={filters.price === val}
              onChange={() => onSet('price', filters.price === val ? null : val)}
            />
          )
        })}
      </AccordionSection>

      {/* Category-specific filters */}
      {cfg && Object.keys(cfg).map((key) => {
        if (key === 'brands' || key === 'price') return null
        const opts = cfg[key]
        const activeVal = filters[key]
        return (
          <AccordionSection
            key={key}
            title={key.charAt(0).toUpperCase() + key.slice(1)}
            hasActive={!!activeVal}
          >
            {opts.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.label
              return (
                <FKCheckbox
                  key={val}
                  label={val}
                  checked={activeVal === val}
                  onChange={() => onSet(key, activeVal === val ? null : val)}
                />
              )
            })}
          </AccordionSection>
        )
      })}
    </div>
  )
})

// ─── ProductCard ──────────────────────────────────────────────────────────────

const ProductCard = memo(({ product }) => {
  const { slug, name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, dealLink } = product

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden relative h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {discount && (
        <span className="absolute top-2 left-2 z-20 bg-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {discount}% off
        </span>
      )}

      <Link
        to={`/product/${slug}`}
        className="relative bg-gray-50 h-36 sm:h-44 flex-shrink-0 overflow-hidden block group"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Link>

      <Link to={`/product/${slug}`} className="flex flex-col flex-grow p-3 sm:p-4 no-underline group">
        <div className="min-h-[2.2rem] mb-1">
          <h3 className="font-bold text-gray-900 text-[0.78rem] sm:text-[0.9rem] leading-snug line-clamp-2 group-hover:text-[#FF4500] transition-colors">
            {name}
          </h3>
        </div>
        <div className="min-h-[1.1rem] mb-2">
          <p className="text-gray-400 text-[0.68rem] sm:text-[0.72rem] font-medium line-clamp-1">
            {tagline || 'No description available'}
          </p>
        </div>
        <div className="min-h-[1.8rem] mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-extrabold text-gray-900 text-[0.95rem] sm:text-[1.05rem]">
              ₹{currentPrice?.toLocaleString('en-IN')}
            </span>
            {originalPrice > currentPrice && (
              <span className="text-gray-300 line-through text-[0.68rem] sm:text-[0.72rem] font-medium">
                ₹{originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {savingsLabel && (
              <span className="bg-green-50 text-green-700 text-[0.6rem] sm:text-xs font-bold px-1.5 py-0.5 rounded-2xl whitespace-nowrap border border-green-100">
                {savingsLabel}
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="px-3 sm:px-4 pb-3 sm:pb-4 mt-auto">
        <a
          href={dealLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center bg-[#FF4500] hover:bg-[#CC3700] text-white font-extrabold text-[0.72rem] sm:text-[0.8rem] py-2 sm:py-2.5 rounded-full no-underline uppercase tracking-wide transition-colors"
        >
          GET DEAL
        </a>
      </div>
    </motion.div>
  )
})

// ─── ShopPage ─────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const { slug: categorySlug } = useParams()
  const [searchParams]          = useSearchParams()
  const navigate                = useNavigate()
  const q                       = searchParams.get('q') ?? ''
  const { isDesktop }           = useBreakpoint()

  const INIT_FILTERS = useMemo(() => ({
    brands: [], ram: null, storage: null, battery: null,
    display: null, price: null, processor: null,
    type: null, anc: null, sensor: null, os: null,
  }), [])

  const [sort,          setSort]          = useState('relevance')
  const [filters,       setFilters]       = useState(INIT_FILTERS)
  const [filterOpen,    setFilterOpen]    = useState(false)
  const [sortOpen,      setSortOpen]      = useState(false)

  // Active filter count for mobile badge
  const activeFilterCount = useMemo(() => {
    let count = filters.brands.length
    Object.entries(filters).forEach(([k, v]) => {
      if (k !== 'brands' && v) count++
    })
    return count
  }, [filters])

  const collectionData = useMemo(
    () => collectionsData.find((c) => c.slug === categorySlug) ?? null,
    [categorySlug],
  )

  const cfg    = useMemo(() => (!collectionData && categorySlug) ? CATEGORY_FILTERS[categorySlug] : null, [collectionData, categorySlug])
  const brands = useMemo(() => cfg?.brands ?? DEFAULT_FILTERS.brands, [cfg])
  const prices = useMemo(() => cfg?.price  ?? DEFAULT_FILTERS.price,  [cfg])

  const handleToggleBrand = useCallback(
    (b) => setFilters((f) => ({
      ...f,
      brands: f.brands.includes(b) ? f.brands.filter((x) => x !== b) : [...f.brands, b],
    })), [],
  )
  const handleSet = useCallback((k, v) => setFilters((f) => ({ ...f, [k]: v })), [])
  const handleReset = useCallback(() => setFilters(INIT_FILTERS), [INIT_FILTERS])

  const filtered = useMemo(
    () => applyFilters(productsData, { categorySlug, collectionData, filters, sort, q }),
    [categorySlug, collectionData, filters, sort, q],
  )

  const catHeading = useMemo(() => {
    if (collectionData) return collectionData.title
    if (categorySlug) return categorySlug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    if (q) return `Results for "${q}"`
    return 'All Gadgets'
  }, [collectionData, categorySlug, q])

  const pageTitle = categorySlug
    ? `${catHeading} | UnfilteredGadgets`
    : q ? `Search: ${q} | UnfilteredGadgets` : 'Shop | UnfilteredGadgets'

  const filterProps = { cfg, brands, prices, filters, onToggleBrand: handleToggleBrand, onSet: handleSet }

  return (
    <div className="bg-white min-h-screen">
      <Helmet><title>{pageTitle}</title></Helmet>

      {/* ── Mobile sticky top bar ── */}
      {!isDesktop && (
        <div className={`sticky ${HEADER_HEIGHT_MOBILE} z-40 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center`}>
          <div>
            <h1 className="text-base font-extrabold m-0 text-gray-900 truncate max-w-[200px]">{catHeading}</h1>
            <span className="text-[0.65rem] text-gray-400">Showing {filtered.length} products</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Sort button */}
            <button
              onClick={() => setSortOpen(true)}
              className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-2 rounded-full text-[0.7rem] font-semibold"
            >
              <ArrowUpDown size={12} /> Sort
            </button>
            {/* Filter button */}
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-1.5 bg-black text-white px-3 py-2 rounded-full text-[0.7rem] font-semibold"
            >
              <SlidersHorizontal size={12} /> Filter
              {activeFilterCount > 0 && (
                <span className="bg-[#FF4500] text-white text-[0.6rem] font-bold px-1.5 rounded-full">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── Collection banner ── */}
    

      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-4 md:py-8">
        <div className="flex gap-8 items-start">

          {/* ── Desktop sidebar ── */}
          {isDesktop && (
            <aside className={`w-[220px] sticky ${DESKTOP_SIDEBAR_TOP} self-start max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide`}>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Sidebar header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Filters</h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={handleReset}
                      className="text-[0.7rem] font-semibold text-[#FF4500] hover:text-[#CC3700] transition-colors"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="px-4 py-1">
                  <FilterContent {...filterProps} isMobile={false} />
                </div>
              </div>
            </aside>
          )}

          {/* ── Main content ── */}
          <main className="flex-1 min-w-0">
            {isDesktop && (
              <div className="mb-6 border-b border-gray-50 pb-4 flex justify-between items-end gap-4">
                <div className="min-w-0">
                  <h1 className="text-3xl font-extrabold text-gray-900 m-0 truncate">{catHeading}</h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {filtered.length > 0
                      ? <>We found <b className="text-gray-700">{filtered.length}</b> gadgets for you</>
                      : 'No products found'}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <p className="text-[0.7rem] text-gray-800 mb-1 font-semibold">SORT BY</p>
                  <div className="relative">
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-[0.75rem] text-gray-700 cursor-pointer focus:outline-none focus:border-[#FF4500] hover:border-gray-300 transition-colors"
                    >
                      {SORT_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                    <svg className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {filtered.length > 0 ? (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
              >
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <SearchX size={40} className="text-gray-300 mb-4" />
                {q ? (
                  <>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      No results for <span className="text-gray-900 font-semibold">"{q}"</span>
                    </p>
                    <p className="text-gray-400 text-xs mb-4">Try a different keyword or browse categories</p>
                  </>
                ) : (
                  <p className="text-gray-400 mb-4">No products match your filters.</p>
                )}
                <button onClick={handleReset} className="text-orange-600 font-bold text-sm cursor-pointer hover:underline">
                  Clear All Filters
                </button>
              </div>
            )}
            <div className="h-24" />
          </main>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MOBILE — Filter Drawer (portal → body)
      ══════════════════════════════════════════ */}
      {createPortal(
        <AnimatePresence>
          {filterOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setFilterOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
              />
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'tween' }}
                style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: 'white', borderRadius: '1.5rem 1.5rem 0 0', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}
              >
                {/* Header */}
                <div className="p-5 border-b border-gray-100 flex items-center justify-between flex-shrink-0">
                  <span className="font-extrabold text-lg text-gray-500">Filters</span>
                  <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                      <button onClick={handleReset} className="text-sm text-gray-500 hover:text-[#FF4500]">
                        Reset
                      </button>
                    )}
                    <button onClick={() => setFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto p-5 pb-4">
                  <FilterContent {...filterProps} isMobile={true} />
                </div>

                {/* Apply button */}
                <div className="p-5 border-t border-gray-100 flex-shrink-0">
                  <button
                    onClick={() => setFilterOpen(false)}
                    className="w-full bg-[#FF4500] hover:bg-[#CC3700] text-white py-3.5 rounded-xl font-bold text-sm transition-colors"
                  >
                    Show {filtered.length} Results
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ══════════════════════════════════════════
          MOBILE — Sort Drawer (portal → body)
      ══════════════════════════════════════════ */}
      {createPortal(
        <AnimatePresence>
          {sortOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSortOpen(false)}
                style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9998 }}
              />
              <motion.div
                initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
                transition={{ type: 'tween' }}
                style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999, background: 'white', borderRadius: '1.5rem 1.5rem 0 0' }}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-extrabold text-lg">Sort By</h3>
                    <button onClick={() => setSortOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="space-y-1 pb-4">
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setSortOpen(false) }}
                        className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${
                          sort === opt.value ? 'bg-[#FF4500] text-white font-bold' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}