

// // components/layout/Header.jsx
// import { useState, useEffect, useCallback, useRef, memo } from 'react'
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Search, Menu, X, Tag, Box } from 'lucide-react'
// import { navCategories, navLinks, offerBarMessages } from '../../data/site.data.js'
// import { productsData } from '../../data/products.data.js'

// // ---------------------------------------------------------------------------
// // Category aliases for direct category routing
// // ---------------------------------------------------------------------------
// const CATEGORY_ALIASES = {
//   phone: 'mobiles', phones: 'mobiles', smartphone: 'mobiles', smartphones: 'mobiles', mobile: 'mobiles',
//   laptop: 'laptops', notebook: 'laptops', notebooks: 'laptops',
//   tablet: 'tablets', ipad: 'tablets',
//   watch: 'smartwatches', watches: 'smartwatches', smartwatch: 'smartwatches',
//   earbud: 'earbuds', earphone: 'earbuds', earphones: 'earbuds',
//   headphone: 'earbuds', headphones: 'earbuds', tws: 'earbuds',
//   speaker: 'speakers', tv: 'televisions', television: 'televisions', camera: 'cameras',
// }

// // ---------------------------------------------------------------------------
// // resolveSearchRoute — used only when user presses Enter with NO suggestion selected
// // ---------------------------------------------------------------------------
// function resolveSearchRoute(query, categories) {
//   const q = query.trim().toLowerCase()
//   if (!q) return null
//   const bySlug  = categories.find((c) => c.slug.toLowerCase() === q)
//   if (bySlug)  return `/category/${bySlug.slug}`
//   const byLabel = categories.find((c) => c.label.toLowerCase() === q)
//   if (byLabel) return `/category/${byLabel.slug}`
//   const aliasSlug = CATEGORY_ALIASES[q]
//   if (aliasSlug) {
//     const byAlias = categories.find((c) => c.slug.toLowerCase() === aliasSlug)
//     return `/category/${byAlias ? byAlias.slug : aliasSlug}`
//   }
//   return `/shop?q=${encodeURIComponent(query.trim())}`
// }

// // ---------------------------------------------------------------------------
// // getSuggestions — returns up to 5 products + up to 3 categories
// // ---------------------------------------------------------------------------
// function getSuggestions(query, categories) {
//   const q = query.trim().toLowerCase()
//   if (q.length < 1) return { products: [], cats: [] }

//   const products = productsData
//     .filter(
//       (p) =>
//         p.name.toLowerCase().includes(q) ||
//         p.brand.toLowerCase().includes(q),
//     )
//     .slice(0, 5)

//   const cats = categories
//     .filter(
//       (c) =>
//         c.label.toLowerCase().includes(q) ||
//         c.slug.toLowerCase().includes(q),
//     )
//     .slice(0, 3)

//   return { products, cats }
// }

// // ---------------------------------------------------------------------------
// // OfferBar
// // ---------------------------------------------------------------------------
// function OfferBar() {
//   const repeated = [...offerBarMessages, ...offerBarMessages]
//   return (
//     <div className="bg-[#FF4500] overflow-hidden py-1.5">
//       <div className="offer-scroll flex gap-10">
//         {repeated.map((msg, i) => (
//           <span key={i} className="text-white text-xs font-medium whitespace-nowrap px-4">
//             {msg}
//           </span>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ---------------------------------------------------------------------------
// // SuggestionDropdown — shared by desktop + mobile
// // ---------------------------------------------------------------------------
// const SuggestionDropdown = memo(function SuggestionDropdown({
//   products, cats, query, activeIdx, onSelectProduct, onSelectCat,
// }) {
//   if (products.length === 0 && cats.length === 0) return null

//   // flat list for keyboard nav index tracking
//   // cats first, then products
//   let flatIdx = 0

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -6 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -6 }}
//       transition={{ duration: 0.15 }}
//       className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-[300]"
//     >
//       {/* Categories */}
//       {cats.length > 0 && (
//         <div>
//           <p className="px-3 pt-2.5 pb-1 text-[0.6rem] font-semibold text-gray-400 uppercase tracking-widest font-inter">
//             Categories
//           </p>
//           {cats.map((cat) => {
//             const idx = flatIdx++
//             return (
//               <button
//                 key={cat.slug}
//                 onMouseDown={() => onSelectCat(cat)}
//                 className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
//                   activeIdx === idx ? 'bg-orange-50' : 'hover:bg-gray-50'
//                 }`}
//               >
//                 <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
//                   <Tag size={11} className="text-[#FF4500]" />
//                 </span>
//                 <span className="font-inter text-[0.8rem] text-gray-800 font-medium">
//                   {cat.label}
//                 </span>
//                 <span className="ml-auto font-inter text-[0.65rem] text-gray-400">Category</span>
//               </button>
//             )
//           })}
//         </div>
//       )}

//       {/* Products */}
//       {products.length > 0 && (
//         <div className={cats.length > 0 ? 'border-t border-gray-100' : ''}>
//           <p className="px-3 pt-2.5 pb-1 text-[0.6rem] font-semibold text-gray-400 uppercase tracking-widest font-inter">
//             Products
//           </p>
//           {products.map((product) => {
//             const idx = flatIdx++
//             return (
//               <button
//                 key={product.id}
//                 onMouseDown={() => onSelectProduct(product)}
//                 className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
//                   activeIdx === idx ? 'bg-orange-50' : 'hover:bg-gray-50'
//                 }`}
//               >
//                 {/* Thumbnail */}
//                 <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                   <img
//                     src={product.image}
//                     alt={product.name}
//                     className="w-full h-full object-contain mix-blend-multiply"
//                   />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="font-inter text-[0.78rem] text-gray-900 font-medium truncate leading-tight">
//                     {product.name}
//                   </p>
//                   <p className="font-inter text-[0.65rem] text-gray-400 leading-tight mt-0.5">
//                     ₹{product.currentPrice?.toLocaleString('en-IN')}
//                   </p>
//                 </div>
//                 <span className="flex-shrink-0">
//                   <Box size={11} className="text-gray-300" />
//                 </span>
//               </button>
//             )
//           })}
//         </div>
//       )}

//       {/* Hint */}
//       <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-1.5">
//         <Search size={10} className="text-gray-300" />
//         <span className="font-inter text-[0.62rem] text-gray-400">
//           Press <kbd className="bg-gray-100 rounded px-1 py-0.5 text-[0.6rem] font-mono">↵</kbd> to search all results for "{query}"
//         </span>
//       </div>
//     </motion.div>
//   )
// })

// // ---------------------------------------------------------------------------
// // useSearchBox — shared logic for desktop + mobile
// // ---------------------------------------------------------------------------
// function useSearchBox(onClose) {
//   const [query,     setQuery]     = useState('')
//   const [open,      setOpen]      = useState(false)
//   const [activeIdx, setActiveIdx] = useState(-1)
//   const navigate                  = useNavigate()

//   const { products, cats } = query.trim().length >= 1
//     ? getSuggestions(query, navCategories)
//     : { products: [], cats: [] }

//   // flat list length for keyboard nav
//   const totalItems = cats.length + products.length

//   const handleChange = useCallback((val) => {
//     setQuery(val)
//     setActiveIdx(-1)
//     setOpen(val.trim().length >= 1)
//   }, [])

//   const selectProduct = useCallback((product) => {
//     navigate(`/product/${product.slug}`)
//     setQuery('')
//     setOpen(false)
//     onClose?.()
//   }, [navigate, onClose])

//   const selectCat = useCallback((cat) => {
//     navigate(`/category/${cat.slug}`)
//     setQuery('')
//     setOpen(false)
//     onClose?.()
//   }, [navigate, onClose])

//   const handleKeyDown = useCallback((e) => {
//     if (!open) return

//     if (e.key === 'ArrowDown') {
//       e.preventDefault()
//       setActiveIdx((i) => (i + 1) % totalItems)
//     } else if (e.key === 'ArrowUp') {
//       e.preventDefault()
//       setActiveIdx((i) => (i <= 0 ? totalItems - 1 : i - 1))
//     } else if (e.key === 'Enter') {
//       e.preventDefault()
//       if (activeIdx >= 0) {
//         // navigate to highlighted item
//         if (activeIdx < cats.length) {
//           selectCat(cats[activeIdx])
//         } else {
//           selectProduct(products[activeIdx - cats.length])
//         }
//       } else {
//         // no highlight — resolve by query string
//         const route = resolveSearchRoute(query, navCategories)
//         if (route) {
//           navigate(route)
//           setQuery('')
//           setOpen(false)
//           onClose?.()
//         }
//       }
//     } else if (e.key === 'Escape') {
//       setOpen(false)
//       setActiveIdx(-1)
//     }
//   }, [open, activeIdx, totalItems, cats, products, query, navigate, selectCat, selectProduct, onClose])

//   const handleBlur = useCallback(() => {
//     // small delay so onMouseDown on suggestion fires first
//     setTimeout(() => setOpen(false), 150)
//   }, [])

//   const handleFocus = useCallback(() => {
//     if (query.trim().length >= 1) setOpen(true)
//   }, [query])

//   return {
//     query, products, cats, open, activeIdx,
//     handleChange, handleKeyDown, handleBlur, handleFocus,
//     selectProduct, selectCat,
//   }
// }

// // ---------------------------------------------------------------------------
// // DesktopSearchBox
// // ---------------------------------------------------------------------------
// function DesktopSearchBox() {
//   const {
//     query, products, cats, open, activeIdx,
//     handleChange, handleKeyDown, handleBlur, handleFocus,
//     selectProduct, selectCat,
//   } = useSearchBox(null)

//   return (
//     <div className="relative">
//       <div className="relative">
//         <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//         <input
//           type="text"
//           placeholder="Search"
//           value={query}
//           onChange={(e) => handleChange(e.target.value)}
//           onKeyDown={handleKeyDown}
//           onBlur={handleBlur}
//           onFocus={handleFocus}
//           className="bg-gray-100 border border-gray-200 text-gray-800 text-sm pl-8 pr-4 py-1.5 rounded-full w-44 focus:outline-none focus:border-[#FF4500]/40 focus:bg-white placeholder-gray-400 transition-all focus:w-56"
//         />
//       </div>
//       <AnimatePresence>
//         {open && (
//           <SuggestionDropdown
//             products={products} cats={cats} query={query}
//             activeIdx={activeIdx}
//             onSelectProduct={selectProduct}
//             onSelectCat={selectCat}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// // ---------------------------------------------------------------------------
// // MobileSearchBox
// // ---------------------------------------------------------------------------
// function MobileSearchBox({ onClose }) {
//   const inputRef = useRef(null)
//   const {
//     query, products, cats, open, activeIdx,
//     handleChange, handleKeyDown, handleBlur, handleFocus,
//     selectProduct, selectCat,
//   } = useSearchBox(onClose)

//   useEffect(() => {
//     inputRef.current?.focus()
//   }, [])

//   return (
//     <div className="relative">
//       <div className="relative">
//         <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Search gadgets..."
//           value={query}
//           onChange={(e) => handleChange(e.target.value)}
//           onKeyDown={handleKeyDown}
//           onBlur={handleBlur}
//           onFocus={handleFocus}
//           className="bg-gray-100 border border-gray-200 text-gray-800 text-sm pl-8 pr-4 py-2 rounded-full w-full focus:outline-none focus:border-[#FF4500]/40 placeholder-gray-400"
//         />
//       </div>
//       <AnimatePresence>
//         {open && (
//           <SuggestionDropdown
//             products={products} cats={cats} query={query}
//             activeIdx={activeIdx}
//             onSelectProduct={selectProduct}
//             onSelectCat={selectCat}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// // ---------------------------------------------------------------------------
// // Header
// // ---------------------------------------------------------------------------
// export default function Header() {
//   const [scrolled,    setScrolled]    = useState(false)
//   const [mobileOpen,  setMobileOpen]  = useState(false)
//   const [searchOpen,  setSearchOpen]  = useState(false)
//   const location                      = useLocation()

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 40)
//     window.addEventListener('scroll', handler)
//     return () => window.removeEventListener('scroll', handler)
//   }, [])

//   useEffect(() => {
//     setMobileOpen(false)
//     setSearchOpen(false)
//   }, [location])

//   return (
//     <header className="sticky top-0 z-50">
//       <OfferBar />

//       <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'} border-b border-gray-100`}>
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-14">

//             {/* Logo */}
//             <Link to="/" className="flex items-center flex-shrink-0">
//               <span className="font-heading font-extrabold text-[#111] text-xl tracking-tight">
//                 Unfiltered<span className="text-[#FF4500]">Gadgets</span>
//               </span>
//             </Link>

//             {/* Desktop nav */}
//             <nav className="hidden md:flex items-center gap-6">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.href}
//                   to={link.href}
//                   className={({ isActive }) =>
//                     `font-body text-sm font-medium transition-colors ${isActive ? 'text-[#FF4500]' : 'text-[#333] hover:text-[#FF4500]'}`
//                   }
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}
//             </nav>

//             {/* Desktop search + deals */}
//             <div className="hidden md:flex items-center gap-3">
//               <DesktopSearchBox />
//               <Link
//                 to="/deals"
//                 className="bg-[#FF4500] hover:bg-[#CC3700] text-white text-sm font-semibold px-5 py-1.5 rounded-full transition-colors"
//               >
//                 Deals
//               </Link>
//             </div>

//             {/* Mobile icons */}
//             <div className="flex md:hidden items-center gap-2">
//               <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-500 p-1">
//                 <Search size={18} />
//               </button>
//               <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-500 p-1">
//                 {mobileOpen ? <X size={20} /> : <Menu size={20} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Category nav — desktop */}
//         <div className="hidden md:block border-t border-gray-100">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="flex items-center gap-7 h-9">
//               {navCategories.map((cat) => (
//                 <NavLink
//                   key={cat.slug}
//                   to={`/category/${cat.slug}`}
//                   className={({ isActive }) =>
//                     `font-body text-xs font-medium transition-colors ${isActive ? 'text-[#FF4500]' : 'text-[#555] hover:text-[#FF4500]'}`
//                   }
//                 >
//                   {cat.label}
//                 </NavLink>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile search bar */}
//       <AnimatePresence>
//         {searchOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: 'auto', opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="md:hidden bg-white border-b border-gray-100 px-4 py-3"
//           >
//             <MobileSearchBox onClose={() => setSearchOpen(false)} />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Mobile menu drawer */}
//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -8 }}
//             className="md:hidden bg-white border-b border-gray-100 shadow-md"
//           >
//             <div className="px-4 py-3 space-y-0.5">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.href}
//                   to={link.href}
//                   className="block font-body text-sm text-gray-700 hover:text-[#FF4500] py-2 border-b border-gray-50"
//                 >
//                   {link.label}
//                 </NavLink>
//               ))}
//               <div className="pt-3 pb-1 flex flex-wrap gap-2">
//                 {navCategories.map((cat) => (
//                   <NavLink
//                     key={cat.slug}
//                     to={`/category/${cat.slug}`}
//                     className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-[#FF4500] hover:text-white transition-colors"
//                   >
//                     {cat.label}
//                   </NavLink>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }


// components/layout/Header.jsx
import { useState, useEffect, useCallback, useRef, memo } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, Tag, Box } from 'lucide-react'
import { navCategories, navLinks, offerBarMessages } from '../../data/site.data.js'
import { productsData } from '../../data/products.data.js'

// ---------------------------------------------------------------------------
// Category aliases
// ---------------------------------------------------------------------------
const CATEGORY_ALIASES = {
  phone: 'mobiles', phones: 'mobiles', smartphone: 'mobiles', smartphones: 'mobiles', mobile: 'mobiles',
  laptop: 'laptops', notebook: 'laptops', notebooks: 'laptops',
  tablet: 'tablets', ipad: 'tablets',
  watch: 'smartwatches', watches: 'smartwatches', smartwatch: 'smartwatches',
  earbud: 'earbuds', earphone: 'earbuds', earphones: 'earbuds',
  headphone: 'earbuds', headphones: 'earbuds', tws: 'earbuds',
  speaker: 'speakers', tv: 'televisions', television: 'televisions', camera: 'cameras',
}

function resolveSearchRoute(query, categories) {
  const q = query.trim().toLowerCase()
  if (!q) return null
  const bySlug  = categories.find((c) => c.slug.toLowerCase() === q)
  if (bySlug)  return `/category/${bySlug.slug}`
  const byLabel = categories.find((c) => c.label.toLowerCase() === q)
  if (byLabel) return `/category/${byLabel.slug}`
  const aliasSlug = CATEGORY_ALIASES[q]
  if (aliasSlug) {
    const byAlias = categories.find((c) => c.slug.toLowerCase() === aliasSlug)
    return `/category/${byAlias ? byAlias.slug : aliasSlug}`
  }
  return `/shop?q=${encodeURIComponent(query.trim())}`
}

function getSuggestions(query, categories) {
  const q = query.trim().toLowerCase()
  if (q.length < 1) return { products: [], cats: [] }
  const products = productsData
    .filter((p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
    .slice(0, 5)
  const cats = categories
    .filter((c) => c.label.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q))
    .slice(0, 3)
  return { products, cats }
}

// ---------------------------------------------------------------------------
// OfferBar
// ---------------------------------------------------------------------------
function OfferBar() {
  const repeated = [...offerBarMessages, ...offerBarMessages]
  return (
    <div className="bg-[#FF4500] overflow-hidden py-1.5">
      <div className="offer-scroll flex gap-10">
        {repeated.map((msg, i) => (
          <span key={i} className="text-white text-xs font-bold whitespace-nowrap px-4">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SuggestionDropdown
// ---------------------------------------------------------------------------
const SuggestionDropdown = memo(function SuggestionDropdown({
  products, cats, query, activeIdx, onSelectProduct, onSelectCat,
}) {
  if (products.length === 0 && cats.length === 0) return null
  let flatIdx = 0

  return (
    <motion.div
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden z-[300]"
    >
      {cats.length > 0 && (
        <div>
          <p className="px-3 pt-2.5 pb-1 text-[0.6rem] font-extrabold text-gray-400 uppercase tracking-widest font-inter">
            Categories
          </p>
          {cats.map((cat) => {
            const idx = flatIdx++
            return (
              <button
                key={cat.slug}
                onMouseDown={() => onSelectCat(cat)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
                  activeIdx === idx ? 'bg-orange-50' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Tag size={11} className="text-[#FF4500]" />
                </span>
                <span className="font-inter text-[0.82rem] text-gray-800 font-bold">
                  {cat.label}
                </span>
                <span className="ml-auto font-inter text-[0.65rem] text-gray-400 font-semibold">Category</span>
              </button>
            )
          })}
        </div>
      )}

      {products.length > 0 && (
        <div className={cats.length > 0 ? 'border-t border-gray-100' : ''}>
          <p className="px-3 pt-2.5 pb-1 text-[0.6rem] font-extrabold text-gray-400 uppercase tracking-widest font-inter">
            Products
          </p>
          {products.map((product) => {
            const idx = flatIdx++
            return (
              <button
                key={product.id}
                onMouseDown={() => onSelectProduct(product)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors cursor-pointer ${
                  activeIdx === idx ? 'bg-orange-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-[0.8rem] text-gray-900 font-bold truncate leading-tight">
                    {product.name}
                  </p>
                  <p className="font-inter text-[0.68rem] text-gray-400 font-semibold leading-tight mt-0.5">
                    ₹{product.currentPrice?.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="flex-shrink-0">
                  <Box size={11} className="text-gray-300" />
                </span>
              </button>
            )
          })}
        </div>
      )}

      <div className="px-3 py-2 border-t border-gray-100 flex items-center gap-1.5">
        <Search size={10} className="text-gray-300" />
        <span className="font-inter text-[0.62rem] text-gray-400 font-medium">
          Press <kbd className="bg-gray-100 rounded px-1 py-0.5 text-[0.6rem] font-mono font-bold">↵</kbd> to search all results for "{query}"
        </span>
      </div>
    </motion.div>
  )
})

// ---------------------------------------------------------------------------
// useSearchBox hook
// ---------------------------------------------------------------------------
function useSearchBox(onClose) {
  const [query,     setQuery]     = useState('')
  const [open,      setOpen]      = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const navigate                  = useNavigate()

  const { products, cats } = query.trim().length >= 1
    ? getSuggestions(query, navCategories)
    : { products: [], cats: [] }

  const totalItems = cats.length + products.length

  const handleChange = useCallback((val) => {
    setQuery(val)
    setActiveIdx(-1)
    setOpen(val.trim().length >= 1)
  }, [])

  const selectProduct = useCallback((product) => {
    navigate(`/product/${product.slug}`)
    setQuery('')
    setOpen(false)
    onClose?.()
  }, [navigate, onClose])

  const selectCat = useCallback((cat) => {
    navigate(`/category/${cat.slug}`)
    setQuery('')
    setOpen(false)
    onClose?.()
  }, [navigate, onClose])

  const handleKeyDown = useCallback((e) => {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => (i + 1) % totalItems)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => (i <= 0 ? totalItems - 1 : i - 1))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0) {
        if (activeIdx < cats.length) selectCat(cats[activeIdx])
        else selectProduct(products[activeIdx - cats.length])
      } else {
        const route = resolveSearchRoute(query, navCategories)
        if (route) { navigate(route); setQuery(''); setOpen(false); onClose?.() }
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIdx(-1)
    }
  }, [open, activeIdx, totalItems, cats, products, query, navigate, selectCat, selectProduct, onClose])

  const handleBlur  = useCallback(() => { setTimeout(() => setOpen(false), 150) }, [])
  const handleFocus = useCallback(() => { if (query.trim().length >= 1) setOpen(true) }, [query])

  return { query, products, cats, open, activeIdx, handleChange, handleKeyDown, handleBlur, handleFocus, selectProduct, selectCat }
}

// ---------------------------------------------------------------------------
// DesktopSearchBox
// ---------------------------------------------------------------------------
function DesktopSearchBox() {
  const { query, products, cats, open, activeIdx, handleChange, handleKeyDown, handleBlur, handleFocus, selectProduct, selectCat } = useSearchBox(null)
  return (
    <div className="relative">
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          placeholder="Search"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="bg-gray-100 border border-gray-200 text-gray-800 text-sm font-semibold pl-8 pr-4 py-1.5 rounded-full w-44 focus:outline-none focus:border-[#FF4500]/40 focus:bg-white placeholder-gray-400 transition-all focus:w-56"
        />
      </div>
      <AnimatePresence>
        {open && (
          <SuggestionDropdown
            products={products} cats={cats} query={query}
            activeIdx={activeIdx} onSelectProduct={selectProduct} onSelectCat={selectCat}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// MobileSearchBox
// ---------------------------------------------------------------------------
function MobileSearchBox({ onClose }) {
  const inputRef = useRef(null)
  const { query, products, cats, open, activeIdx, handleChange, handleKeyDown, handleBlur, handleFocus, selectProduct, selectCat } = useSearchBox(onClose)

  useEffect(() => { inputRef.current?.focus() }, [])

  return (
    <div className="relative">
      <div className="relative">
        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search gadgets..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className="bg-gray-100 border border-gray-200 text-gray-800 text-sm font-semibold pl-8 pr-4 py-2 rounded-full w-full focus:outline-none focus:border-[#FF4500]/40 placeholder-gray-400"
        />
      </div>
      <AnimatePresence>
        {open && (
          <SuggestionDropdown
            products={products} cats={cats} query={query}
            activeIdx={activeIdx} onSelectProduct={selectProduct} onSelectCat={selectCat}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------
export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location                    = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [location])

  return (
    <header className="sticky top-0 z-50">
      <OfferBar />

      <div className={`bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'} border-b border-gray-100`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <span className="font-heading font-extrabold text-[#111] text-xl tracking-tight">
                Unfiltered<span className="text-[#FF4500]">Gadgets</span>
              </span>
            </Link>

            {/* Desktop nav links — font-extrabold, slightly bigger */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `font-body text-[0.9rem] font-extrabold tracking-wide transition-colors ${
                      isActive ? 'text-[#FF4500]' : 'text-[#222] hover:text-[#FF4500]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop search + deals */}
            <div className="hidden md:flex items-center gap-3">
              <DesktopSearchBox />
              <Link
                to="/deals"
                className="bg-[#FF4500] hover:bg-[#CC3700] text-white text-sm font-extrabold px-5 py-1.5 rounded-full transition-colors tracking-wide"
              >
                Deals
              </Link>
            </div>

            {/* Mobile icons */}
            <div className="flex md:hidden items-center gap-2">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-gray-600 p-1">
                <Search size={18} />
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-600 p-1">
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Category nav bar — desktop */}
        <div className="hidden md:block border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-7 h-9">
              {navCategories.map((cat) => (
                <NavLink
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className={({ isActive }) =>
                    `font-body text-[0.8rem] font-extrabold tracking-wide transition-colors ${
                      isActive ? 'text-[#FF4500]' : 'text-[#444] hover:text-[#FF4500]'
                    }`
                  }
                >
                  {cat.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-3"
          >
            <MobileSearchBox onClose={() => setSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="md:hidden bg-white border-b border-gray-100 shadow-md"
          >
            <div className="px-4 py-3 space-y-0.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  className={({ isActive }) =>
                    `block font-body text-[0.9rem] font-extrabold py-2.5 border-b border-gray-50 tracking-wide transition-colors ${
                      isActive ? 'text-[#FF4500]' : 'text-[#222] hover:text-[#FF4500]'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 pb-1 flex flex-wrap gap-2">
                {navCategories.map((cat) => (
                  <NavLink
                    key={cat.slug}
                    to={`/category/${cat.slug}`}
                    className="bg-gray-100 text-[#333] text-xs font-extrabold px-3 py-1.5 rounded-full hover:bg-[#FF4500] hover:text-white transition-colors tracking-wide"
                  >
                    {cat.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}