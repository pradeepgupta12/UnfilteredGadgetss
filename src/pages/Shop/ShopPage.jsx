// // import { useState, useMemo, useCallback, memo } from "react";
// // import { Helmet } from "react-helmet-async";
// // import { Link, useParams, useSearchParams } from "react-router-dom";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
// // import {
// //   productsData,
// //   CATEGORY_FILTERS,
// //   DEFAULT_FILTERS,
// // } from "../../data/products.data.js";
// // import { staggerContainer, staggerItem } from "../../utils/animations.js";
// // import { useBreakpoint } from "../../hooks/useMediaQuery.js";

// // const SORT_OPTIONS = [
// //   { label: "Relevance", value: "relevance" },
// //   { label: "Price: Low–High", value: "price_asc" },
// //   { label: "Price: High–Low", value: "price_desc" },
// //   { label: "Expert Score", value: "score" },
// // ];

// // const INIT_FILTERS = Object.freeze({
// //   brands: [],
// //   ram: null,
// //   storage: null,
// //   battery: null,
// //   display: null,
// //   price: null,
// //   processor: null,
// //   type: null,
// //   anc: null,
// //   sensor: null,
// //   os: null,
// // });

// // const ALL_PRICE_RANGES = [
// //   ...Object.values(CATEGORY_FILTERS).flatMap((c) => c.price ?? []),
// //   ...DEFAULT_FILTERS.price,
// // ];

// // // Offsets
// // const HEADER_HEIGHT_MOBILE = "top-[84px]"; // 56 + 28
// // const DESKTOP_SIDEBAR_TOP = "top-[140px]";

// // function applyFilters(list, { categorySlug, filters, sort, q }) {
// //   let result = categorySlug
// //     ? list.filter((p) => p.category === categorySlug)
// //     : [...list];

// //   // Brand
// //   if (filters.brands.length > 0)
// //     result = result.filter((p) => filters.brands.includes(p.brand));

// //   // Price
// //   if (filters.price) {
// //     const range = ALL_PRICE_RANGES.find((r) => r.label === filters.price);
// //     if (range)
// //       result = result.filter(
// //         (p) => p.currentPrice >= range.min && p.currentPrice < range.max
// //       );
// //   }

// //   // TYPE FILTER (ADD THIS)
// //   if (filters.type) {
// //     result = result.filter((p) => p.type === filters.type);
// //   }

// //   // Search
// //   if (q) {
// //     const lq = q.toLowerCase();
// //     result = result.filter(
// //       (p) =>
// //         p.name.toLowerCase().includes(lq) ||
// //         p.brand.toLowerCase().includes(lq)
// //     );
// //   }

// //   const sorted = [...result];

// //   if (sort === "price_asc")
// //     sorted.sort((a, b) => a.currentPrice - b.currentPrice);

// //   if (sort === "price_desc")
// //     sorted.sort((a, b) => b.currentPrice - a.currentPrice);

// //   if (sort === "score")
// //     sorted.sort((a, b) => (b.expertScore || 0) - (a.expertScore || 0));

// //   return sorted;
// // }

// // const Dropdown = memo(({ label, options, selected, onChange }) => {
// //   const [open, setOpen] = useState(false);
// //   return (
// //     <div className="relative mb-2">
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className={`w-full flex items-center justify-between bg-white border border-gray-200 rounded-full text-gray-700 px-3 py-2 cursor-pointer font-inter text-[0.75rem] ${selected ? "text-gray-900" : "text-gray-400"}`}
// //       >
// //         <span className="truncate">{selected || label}</span>
// //         <ChevronDown
// //           size={12}
// //           className={`transition-transform ${open ? "rotate-180" : ""}`}
// //         />
// //       </button>
// //       <AnimatePresence>
// //         {open && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -5 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -5 }}
// //             className="absolute top-full left-0 right-0 z-[200] bg-white border border-gray-200 rounded-xl shadow-xl mt-1 overflow-hidden"
// //           >
// //             <div
// //               onClick={() => {
// //                 onChange(null);
// //                 setOpen(false);
// //               }}
// //               className="px-3 py-2 text-[0.75rem] text-gray-400 cursor-pointer hover:bg-gray-50"
// //             >
// //               All
// //             </div>
// //             {options.map((opt, i) => (
// //               <div
// //                 key={i}
// //                 onClick={() => {
// //                   onChange(typeof opt === "string" ? opt : opt.label);
// //                   setOpen(false);
// //                 }}
// //                 className={`px-3 py-2 text-[0.75rem] text-gray-800 cursor-pointer ${selected === (opt.label || opt) ? "bg-orange-50" : "hover:bg-gray-50"}`}
// //               >
// //                 {opt.label || opt}
// //               </div>
// //             ))}
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // });

// // const Checkbox = memo(({ label, checked, onChange }) => (
// //   <label className="flex items-center gap-2 mb-2 cursor-pointer ">
// //     <input
// //       type="checkbox"
// //       checked={checked}
// //       onChange={(e) => onChange(e.target.checked)}
// //       className="accent-orange-600 h-4 w-4"
// //     />
// //     <span className="text-[0.75rem] font-inter text-gray-800">{label}</span>
// //   </label>
// // ));

// // const FilterContent = memo(
// //   ({ cfg, brands, prices, filters, onToggleBrand, onSet }) => (
// //     <>
// //       <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Brand</p>
// //       {brands.map((b) => (
// //         <Checkbox
// //           key={b}
// //           label={b}
// //           checked={filters.brands.includes(b)}
// //           onChange={() => onToggleBrand(b)}
// //         />
// //       ))}
// //       <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Price</p>
// //       <Dropdown
// //         label="Budget"
// //         options={prices}
// //         selected={filters.price}
// //         onChange={(v) => onSet("price", v)}
// //       />
// //       {cfg &&
// //         Object.keys(cfg).map(
// //           (key) =>
// //             key !== "brands" &&
// //             key !== "price" && (
// //               <div key={key}>
// //                 <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora capitalize text-gray-800">
// //                   {key}
// //                 </p>
// //                 <Dropdown
// //                   label={`Select ${key}`}
// //                   options={cfg[key]}
// //                   selected={filters[key]}
// //                   onChange={(v) => onSet(key, v)}
// //                 />
// //               </div>
// //             ),
// //         )}
// //     </>
// //   ),
// // );

// // export default function ShopPage() {
// //   const { slug: categorySlug } = useParams();
// //   const [searchParams] = useSearchParams();
// //   const q = searchParams.get("q") ?? "";
// //   const { isMobile, isDesktop } = useBreakpoint();

// //   const [sort, setSort] = useState("relevance");
// //   const [filters, setFilters] = useState(INIT_FILTERS);
// //   const [filterOpen, setFilterOpen] = useState(false);

// //   const cfg = useMemo(
// //     () => (categorySlug ? CATEGORY_FILTERS[categorySlug] : null),
// //     [categorySlug],
// //   );
// //   const brands = useMemo(() => cfg?.brands ?? DEFAULT_FILTERS.brands, [cfg]);
// //   const prices = useMemo(() => cfg?.price ?? DEFAULT_FILTERS.price, [cfg]);

// //   const handleToggleBrand = useCallback(
// //     (b) =>
// //       setFilters((f) => ({
// //         ...f,
// //         brands: f.brands.includes(b)
// //           ? f.brands.filter((x) => x !== b)
// //           : [...f.brands, b],
// //       })),
// //     [],
// //   );
// //   const handleSet = useCallback(
// //     (k, v) => setFilters((f) => ({ ...f, [k]: v })),
// //     [],
// //   );
// //   const filtered = useMemo(
// //     () => applyFilters(productsData, { categorySlug, filters, sort, q }),
// //     [categorySlug, filters, sort, q],
// //   );

// //   const catHeading = categorySlug
// //     ? categorySlug
// //         .split("-")
// //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
// //         .join(" ")
// //     : "All Gadgets";
// //   const filterProps = {
// //     cfg,
// //     brands,
// //     prices,
// //     filters,
// //     onToggleBrand: handleToggleBrand,
// //     onSet: handleSet,
// //   };

// //   return (
// //     <div className="bg-white min-h-screen">
// //       <Helmet>
// //         <title>{catHeading} | UnfilteredGadgets</title>
// //       </Helmet>

// //       {/* Mobile Sticky Bar */}
// //       {!isDesktop && (
// //         <div
// //           className={`sticky ${HEADER_HEIGHT_MOBILE} z-40 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center`}
// //         >
// //           <div>
// //             <h1 className="text-base font-extrabold font-inter m-0 text-gray-900">
// //               {catHeading}
// //             </h1>
// //             <span className="text-[0.65rem] text-gray-400">
// //               Showing {filtered.length} products
// //             </span>
// //           </div>
// //           <button
// //             onClick={() => setFilterOpen(true)}
// //             className="bg-black text-gray px-4 py-2 rounded-full text-[0.7rem] flex items-center gap-1.5 font-semibold"
// //           >
// //             <SlidersHorizontal size={12} /> Filter
// //           </button>
// //         </div>
// //       )}

// //       <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-4 md:py-8">
// //         <div className="flex gap-8 items-start">
// //           {/* Desktop Sidebar */}
// //           {isDesktop && (
// //             <aside
// //               className={`w-[220px] sticky ${DESKTOP_SIDEBAR_TOP} self-start max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide`}
// //             >
// //               <div className="bg-white border border-gray-100 rounded-xl p-4">
// //                 <h2 className="font-lora font-bold mb-4 text-gray-900">Filters</h2>
// //                 <FilterContent {...filterProps} />
// //               </div>
// //             </aside>
// //           )}

// //           {/* Main Area */}
// //           <main className="flex-1">
// //             {isDesktop && (
// //               <div className="mb-6 border-b border-gray-50 pb-4 flex justify-between items-end">
// //                 <div>
// //                   <h1 className="font-lora text-3xl font-extrabold text-gray-900 m-0">
// //                     {catHeading}
// //                   </h1>
// //                   <p className="text-gray-400 text-sm mt-1">
// //                     We found <b className="text-gray-700">{filtered.length}</b>{" "}
// //                     gadgets for you
// //                   </p>
// //                 </div>
// //                 <div className="w-[180px]">
// //                   <p className="text-[0.7rem] text-gray-800 mb-1 font-semibold">
// //                     SORT BY
// //                   </p>
// //                   <Dropdown
// //                     label="Relevance"
// //                     options={SORT_OPTIONS}
// //                     selected={SORT_OPTIONS.find((o) => o.value === sort)?.label}
// //                     onChange={(val) =>
// //                       setSort(
// //                         SORT_OPTIONS.find((o) => o.label === val)?.value ||
// //                           "relevance",
// //                       )
// //                     }
// //                   />
// //                 </div>
// //               </div>
// //             )}

// //             {filtered.length > 0 ? (
// //               <motion.div
// //                 variants={staggerContainer}
// //                 initial="hidden"
// //                 animate="visible"
// //                 className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
// //               >
// //                 {filtered.map((p) => (
// //                   <motion.div
// //                     key={p.id}
// //                     variants={staggerItem}
// //                     className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
// //                   >
                   
// // <Link 
// //   to={`/product/${p.slug}`} 
// //   className="block bg-[#f9f9f9] w-full aspect-square flex items-center justify-center overflow-hidden"
// // >
// //   <img 
// //     src={p.image} 
// //     alt={p.name} 
// //     className="w-full h-full object-contain p-2 mix-blend-multiply" 
// //   />
// // </Link>
// //                     <div className="p-3">
// //                       <h3 className="text-[0.8rem] font-semibold h-9 overflow-hidden font-lora leading-tight text-gray-900">
// //                         {p.name}
// //                       </h3>
// //                       <div className="mt-2.5 flex items-baseline gap-1.5">
// //                         <span className="font-extrabold text-base text-gray-900">
// //                           ₹{p.currentPrice.toLocaleString("en-IN")}
// //                         </span>
// //                         {p.originalPrice > p.currentPrice && (
// //                           <span className="text-[0.7rem] text-gray-400 line-through">
// //                             ₹{p.originalPrice.toLocaleString("en-IN")}
// //                           </span>
// //                         )}
// //                       </div>
// //                       <a
// //                         href={p.dealLink}
// //                         target="_blank"
// //                         rel="noopener noreferrer"
// //                         className="block text-center bg-orange-600 text-white py-2.5 rounded-full text-[0.75rem] font-bold mt-3 transition-colors hover:bg-orange-700"
// //                       >
// //                         GET DEAL
// //                       </a>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </motion.div>
// //             ) : (
// //               <div className="text-center py-24">
// //                 <p className="text-gray-400">No products match your filters.</p>
// //                 <button
// //                   onClick={() => setFilters(INIT_FILTERS)}
// //                   className="text-orange-600 font-bold mt-2 cursor-pointer"
// //                 >
// //                   Clear All Filters
// //                 </button>
// //               </div>
// //             )}
// //             <div className="h-24" />
// //           </main>
// //         </div>
// //       </div>

// //       {/* Mobile Drawer */}
// //       <AnimatePresence>
// //         {filterOpen && (
// //           <>
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setFilterOpen(false)}
// //               className="fixed inset-0 bg-black/40 z-[100]"
// //             />
// //             <motion.div
// //               initial={{ y: "100%" }}
// //               animate={{ y: 0 }}
// //               exit={{ y: "100%" }}
// //               transition={{ type: "spring", damping: 25 }}
// //               className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl h-[75vh] flex flex-col"
// //             >
// //               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
// //                 <span className="font-extrabold text-lg font-lora">
// //                   Filters
// //                 </span>
// //                 <X
// //                   size={22}
// //                   className="cursor-pointer"
// //                   onClick={() => setFilterOpen(false)}
// //                 />
// //               </div>
// //               <div className="flex-1 overflow-y-auto p-5 pb-28">
// //                 <FilterContent {...filterProps} />
// //                 <div className="mt-5">
// //                   <p className="font-bold text-[0.8rem] mb-3 font-lora">
// //                     Sort By
// //                   </p>
// //                   {SORT_OPTIONS.map((opt) => (
// //                     <div
// //                       key={opt.value}
// //                       onClick={() => setSort(opt.value)}
// //                       className={`py-3 border-b border-gray-50 text-[0.85rem] ${sort === opt.value ? "text-orange-600 font-bold" : "text-gray-700"}`}
// //                     >
// //                       {opt.label}
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //               <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
// //                 <button
// //                   onClick={() => setFilterOpen(false)}
// //                   className="w-full bg-orange-600 text-white py-4 rounded-full font-bold text-sm"
// //                 >
// //                   Show {filtered.length} Results
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }



// // pages/Shop/ShopPage.jsx
// import { useState, useMemo, useCallback, memo } from 'react'
// import { Helmet } from 'react-helmet-async'
// import { Link, useParams, useSearchParams } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChevronDown, SlidersHorizontal, X, SearchX } from 'lucide-react'
// import {
//   productsData,
//   CATEGORY_FILTERS,
//   DEFAULT_FILTERS,
// } from '../../data/products.data.js'
// import { staggerContainer, staggerItem } from '../../utils/animations.js'
// import { useBreakpoint } from '../../hooks/useMediaQuery.js'

// const SORT_OPTIONS = [
//   { label: 'Relevance',       value: 'relevance'  },
//   { label: 'Price: Low–High', value: 'price_asc'  },
//   { label: 'Price: High–Low', value: 'price_desc' },
//   { label: 'Expert Score',    value: 'score'       },
// ]

// const INIT_FILTERS = Object.freeze({
//   brands: [],
//   ram: null, storage: null, battery: null,
//   display: null, price: null, processor: null,
//   type: null, anc: null, sensor: null, os: null,
// })

// const ALL_PRICE_RANGES = [
//   ...Object.values(CATEGORY_FILTERS).flatMap((c) => c.price ?? []),
//   ...DEFAULT_FILTERS.price,
// ]

// // sticky offsets
// const HEADER_HEIGHT_MOBILE = 'top-[84px]'
// const DESKTOP_SIDEBAR_TOP  = 'top-[140px]'

// // ---------------------------------------------------------------------------
// // applyFilters
// // ---------------------------------------------------------------------------
// function applyFilters(list, { categorySlug, filters, sort, q }) {
//   let result = categorySlug
//     ? list.filter((p) => p.category === categorySlug)
//     : [...list]

//   if (filters.brands.length > 0)
//     result = result.filter((p) => filters.brands.includes(p.brand))

//   if (filters.price) {
//     const range = ALL_PRICE_RANGES.find((r) => r.label === filters.price)
//     if (range)
//       result = result.filter(
//         (p) => p.currentPrice >= range.min && p.currentPrice < range.max,
//       )
//   }

//   if (filters.type)
//     result = result.filter((p) => p.type === filters.type)

//   if (q) {
//     const lq = q.toLowerCase()
//     result = result.filter(
//       (p) =>
//         p.name.toLowerCase().includes(lq) ||
//         p.brand.toLowerCase().includes(lq),
//     )
//   }

//   const sorted = [...result]
//   if (sort === 'price_asc')  sorted.sort((a, b) => a.currentPrice - b.currentPrice)
//   if (sort === 'price_desc') sorted.sort((a, b) => b.currentPrice - a.currentPrice)
//   if (sort === 'score')      sorted.sort((a, b) => (b.expertScore || 0) - (a.expertScore || 0))

//   return sorted
// }

// // ---------------------------------------------------------------------------
// // Dropdown
// // ---------------------------------------------------------------------------
// const Dropdown = memo(({ label, options, selected, onChange }) => {
//   const [open, setOpen] = useState(false)
//   return (
//     <div className="relative mb-2">
//       <button
//         onClick={() => setOpen(!open)}
//         className={`w-full flex items-center justify-between bg-white border border-gray-200 rounded-full px-3 py-2 cursor-pointer text-[0.75rem] font-inter transition-colors ${
//           selected ? 'text-gray-900' : 'text-gray-400'
//         } hover:border-orange-300`}
//       >
//         <span className="truncate">{selected || label}</span>
//         <ChevronDown size={12} className={`transition-transform flex-shrink-0 ml-1 ${open ? 'rotate-180' : ''}`} />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -5 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -5 }}
//             className="absolute top-full left-0 right-0 z-[200] bg-white border border-gray-200 rounded-xl shadow-xl mt-1 overflow-hidden"
//           >
//             <div
//               onClick={() => { onChange(null); setOpen(false) }}
//               className="px-3 py-2 text-[0.75rem] text-gray-400 cursor-pointer hover:bg-gray-50"
//             >
//               All
//             </div>
//             {options.map((opt, i) => {
//               const val = typeof opt === 'string' ? opt : opt.label
//               return (
//                 <div
//                   key={i}
//                   onClick={() => { onChange(val); setOpen(false) }}
//                   className={`px-3 py-2 text-[0.75rem] text-gray-800 cursor-pointer ${
//                     selected === val ? 'bg-orange-50 text-orange-600 font-medium' : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   {val}
//                 </div>
//               )
//             })}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// })

// // ---------------------------------------------------------------------------
// // Checkbox
// // ---------------------------------------------------------------------------
// const Checkbox = memo(({ label, checked, onChange }) => (
//   <label className="flex items-center gap-2 mb-2 cursor-pointer group">
//     <input
//       type="checkbox"
//       checked={checked}
//       onChange={(e) => onChange(e.target.checked)}
//       className="accent-orange-600 h-4 w-4 rounded"
//     />
//     <span className="text-[0.75rem] font-inter text-gray-700 group-hover:text-gray-900 transition-colors">
//       {label}
//     </span>
//   </label>
// ))

// // ---------------------------------------------------------------------------
// // FilterContent
// // ---------------------------------------------------------------------------
// const FilterContent = memo(({ cfg, brands, prices, filters, onToggleBrand, onSet }) => (
//   <>
//     <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Brand</p>
//     {brands.map((b) => (
//       <Checkbox
//         key={b}
//         label={b}
//         checked={filters.brands.includes(b)}
//         onChange={() => onToggleBrand(b)}
//       />
//     ))}

//     <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Price</p>
//     <Dropdown
//       label="Budget"
//       options={prices}
//       selected={filters.price}
//       onChange={(v) => onSet('price', v)}
//     />

//     {cfg &&
//       Object.keys(cfg).map(
//         (key) =>
//           key !== 'brands' &&
//           key !== 'price' && (
//             <div key={key}>
//               <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora capitalize text-gray-800">
//                 {key}
//               </p>
//               <Dropdown
//                 label={`Select ${key}`}
//                 options={cfg[key]}
//                 selected={filters[key]}
//                 onChange={(v) => onSet(key, v)}
//               />
//             </div>
//           ),
//       )}
//   </>
// ))

// // ---------------------------------------------------------------------------
// // ProductCard
// // ---------------------------------------------------------------------------
// const ProductCard = memo(({ product }) => (
//   <motion.div
//     variants={staggerItem}
//     className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
//   >
//     <Link
//       to={`/product/${product.slug}`}
//       className="block bg-[#f9f9f9] w-full aspect-square flex items-center justify-center overflow-hidden"
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         loading="lazy"
//         className="w-full h-full object-contain p-2 mix-blend-multiply"
//       />
//     </Link>
//     <div className="p-3">
//       <h3 className="text-[0.8rem] font-semibold h-9 overflow-hidden font-lora leading-tight text-gray-900">
//         {product.name}
//       </h3>
//       <div className="mt-2.5 flex items-baseline gap-1.5">
//         <span className="font-extrabold text-base text-gray-900">
//           ₹{product.currentPrice.toLocaleString('en-IN')}
//         </span>
//         {product.originalPrice > product.currentPrice && (
//           <span className="text-[0.7rem] text-gray-400 line-through">
//             ₹{product.originalPrice.toLocaleString('en-IN')}
//           </span>
//         )}
//       </div>
//       <a
//         href={product.dealLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-full text-[0.75rem] font-bold mt-3 transition-colors"
//       >
//         GET DEAL
//       </a>
//     </div>
//   </motion.div>
// ))

// // ---------------------------------------------------------------------------
// // ShopPage
// // ---------------------------------------------------------------------------
// export default function ShopPage() {
//   const { slug: categorySlug } = useParams()
//   const [searchParams]          = useSearchParams()
//   const q                       = searchParams.get('q') ?? ''
//   const { isMobile, isDesktop } = useBreakpoint()

//   const [sort,       setSort]       = useState('relevance')
//   const [filters,    setFilters]    = useState(INIT_FILTERS)
//   const [filterOpen, setFilterOpen] = useState(false)

//   const cfg    = useMemo(() => (categorySlug ? CATEGORY_FILTERS[categorySlug] : null), [categorySlug])
//   const brands = useMemo(() => cfg?.brands ?? DEFAULT_FILTERS.brands, [cfg])
//   const prices = useMemo(() => cfg?.price  ?? DEFAULT_FILTERS.price,  [cfg])

//   const handleToggleBrand = useCallback(
//     (b) =>
//       setFilters((f) => ({
//         ...f,
//         brands: f.brands.includes(b)
//           ? f.brands.filter((x) => x !== b)
//           : [...f.brands, b],
//       })),
//     [],
//   )
//   const handleSet = useCallback((k, v) => setFilters((f) => ({ ...f, [k]: v })), [])

//   const filtered = useMemo(
//     () => applyFilters(productsData, { categorySlug, filters, sort, q }),
//     [categorySlug, filters, sort, q],
//   )

//   // ---------------------------------------------------------------------------
//   // Page heading — 3 cases:
//   //   1. Category page  → "Mobiles"
//   //   2. Search results → 'Results for "samsung"'
//   //   3. All products   → "All Gadgets"
//   // ---------------------------------------------------------------------------
//   const catHeading = useMemo(() => {
//     if (categorySlug)
//       return categorySlug
//         .split('-')
//         .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
//         .join(' ')
//     if (q) return `Results for "${q}"`
//     return 'All Gadgets'
//   }, [categorySlug, q])

//   const pageTitle = categorySlug
//     ? `${catHeading} | UnfilteredGadgets`
//     : q
//     ? `Search: ${q} | UnfilteredGadgets`
//     : 'Shop | UnfilteredGadgets'

//   const filterProps = { cfg, brands, prices, filters, onToggleBrand: handleToggleBrand, onSet: handleSet }

//   return (
//     <div className="bg-white min-h-screen">
//       <Helmet>
//         <title>{pageTitle}</title>
//       </Helmet>

//       {/* Mobile sticky bar */}
//       {!isDesktop && (
//         <div className={`sticky ${HEADER_HEIGHT_MOBILE} z-40 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center`}>
//           <div>
//             <h1 className="text-base font-extrabold font-inter m-0 text-gray-900 truncate max-w-[200px]">
//               {catHeading}
//             </h1>
//             <span className="text-[0.65rem] text-gray-400">
//               Showing {filtered.length} products
//             </span>
//           </div>
//           <button
//             onClick={() => setFilterOpen(true)}
//             className="bg-black text-white px-4 py-2 rounded-full text-[0.7rem] flex items-center gap-1.5 font-semibold"
//           >
//             <SlidersHorizontal size={12} /> Filter
//           </button>
//         </div>
//       )}

//       <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-4 md:py-8">
//         <div className="flex gap-8 items-start">

//           {/* Desktop sidebar */}
//           {isDesktop && (
//             <aside className={`w-[220px] sticky ${DESKTOP_SIDEBAR_TOP} self-start max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide`}>
//               <div className="bg-white border border-gray-100 rounded-xl p-4">
//                 <h2 className="font-lora font-bold mb-4 text-gray-900">Filters</h2>
//                 <FilterContent {...filterProps} />
//               </div>
//             </aside>
//           )}

//           {/* Main content */}
//           <main className="flex-1 min-w-0">
//             {isDesktop && (
//               <div className="mb-6 border-b border-gray-50 pb-4 flex justify-between items-end gap-4">
//                 <div className="min-w-0">
//                   <h1 className="font-lora text-3xl font-extrabold text-gray-900 m-0 truncate">
//                     {catHeading}
//                   </h1>
//                   <p className="text-gray-400 text-sm mt-1">
//                     {filtered.length > 0
//                       ? <>We found <b className="text-gray-700">{filtered.length}</b> gadgets for you</>
//                       : 'No products found'}
//                   </p>
//                 </div>
//                 <div className="w-[180px] flex-shrink-0">
//                   <p className="text-[0.7rem] text-gray-800 mb-1 font-semibold">SORT BY</p>
//                   <Dropdown
//                     label="Relevance"
//                     options={SORT_OPTIONS}
//                     selected={SORT_OPTIONS.find((o) => o.value === sort)?.label}
//                     onChange={(val) =>
//                       setSort(SORT_OPTIONS.find((o) => o.label === val)?.value || 'relevance')
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {filtered.length > 0 ? (
//               <motion.div
//                 variants={staggerContainer}
//                 initial="hidden"
//                 animate="visible"
//                 className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5"
//               >
//                 {filtered.map((p) => (
//                   <ProductCard key={p.id} product={p} />
//                 ))}
//               </motion.div>
//             ) : (
//               /* ── Empty state ── */
//               <div className="flex flex-col items-center justify-center py-24 text-center">
//                 <SearchX size={40} className="text-gray-300 mb-4" />
//                 {q ? (
//                   <>
//                     <p className="text-gray-500 text-sm font-medium mb-1">
//                       No results for <span className="text-gray-900 font-semibold">"{q}"</span>
//                     </p>
//                     <p className="text-gray-400 text-xs mb-4">
//                       Try a different keyword or browse categories
//                     </p>
//                   </>
//                 ) : (
//                   <p className="text-gray-400 mb-4">No products match your filters.</p>
//                 )}
//                 <button
//                   onClick={() => setFilters(INIT_FILTERS)}
//                   className="text-orange-600 font-bold text-sm cursor-pointer hover:underline"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}

//             <div className="h-24" />
//           </main>
//         </div>
//       </div>

//       {/* Mobile filter drawer */}
//       <AnimatePresence>
//         {filterOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setFilterOpen(false)}
//               className="fixed inset-0 bg-black/40 z-[100]"
//             />
//             <motion.div
//               initial={{ y: '100%' }}
//               animate={{ y: 0 }}
//               exit={{ y: '100%' }}
//               transition={{ type: 'spring', damping: 25 }}
//               className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl h-[75vh] flex flex-col"
//             >
//               <div className="p-5 border-b border-gray-100 flex justify-between items-center">
//                 <span className="font-extrabold text-lg font-lora">Filters</span>
//                 <X size={22} className="cursor-pointer text-gray-500" onClick={() => setFilterOpen(false)} />
//               </div>
//               <div className="flex-1 overflow-y-auto p-5 pb-28">
//                 <FilterContent {...filterProps} />
//                 <div className="mt-5">
//                   <p className="font-bold text-[0.8rem] mb-3 font-lora">Sort By</p>
//                   {SORT_OPTIONS.map((opt) => (
//                     <div
//                       key={opt.value}
//                       onClick={() => setSort(opt.value)}
//                       className={`py-3 border-b border-gray-50 text-[0.85rem] cursor-pointer transition-colors ${
//                         sort === opt.value
//                           ? 'text-orange-600 font-bold'
//                           : 'text-gray-700 hover:text-orange-500'
//                       }`}
//                     >
//                       {opt.label}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
//                 <button
//                   onClick={() => setFilterOpen(false)}
//                   className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-bold text-sm transition-colors"
//                 >
//                   Show {filtered.length} Results
//                 </button>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }


// pages/Shop/ShopPage.jsx
import { useState, useMemo, useCallback, memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, SlidersHorizontal, X, SearchX } from 'lucide-react'
import {
  productsData,
  CATEGORY_FILTERS,
  DEFAULT_FILTERS,
} from '../../data/products.data.js'
import { staggerContainer, staggerItem } from '../../utils/animations.js'
import { useBreakpoint } from '../../hooks/useMediaQuery.js'

const SORT_OPTIONS = [
  { label: 'Relevance',       value: 'relevance'  },
  { label: 'Price: Low–High', value: 'price_asc'  },
  { label: 'Price: High–Low', value: 'price_desc' },
  { label: 'Expert Score',    value: 'score'       },
]

const INIT_FILTERS = Object.freeze({
  brands: [],
  ram: null, storage: null, battery: null,
  display: null, price: null, processor: null,
  type: null, anc: null, sensor: null, os: null,
})

const ALL_PRICE_RANGES = [
  ...Object.values(CATEGORY_FILTERS).flatMap((c) => c.price ?? []),
  ...DEFAULT_FILTERS.price,
]

// sticky offsets
const HEADER_HEIGHT_MOBILE = 'top-[84px]'
const DESKTOP_SIDEBAR_TOP  = 'top-[140px]'

// ---------------------------------------------------------------------------
// applyFilters
// ---------------------------------------------------------------------------
function applyFilters(list, { categorySlug, filters, sort, q }) {
  let result = categorySlug
    ? list.filter((p) => p.category === categorySlug)
    : [...list]

  if (filters.brands.length > 0)
    result = result.filter((p) => filters.brands.includes(p.brand))

  if (filters.price) {
    const range = ALL_PRICE_RANGES.find((r) => r.label === filters.price)
    if (range)
      result = result.filter(
        (p) => p.currentPrice >= range.min && p.currentPrice < range.max,
      )
  }

  if (filters.type)
    result = result.filter((p) => p.type === filters.type)

  if (q) {
    const lq = q.toLowerCase()
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(lq) ||
        p.brand.toLowerCase().includes(lq),
    )
  }

  const sorted = [...result]
  if (sort === 'price_asc')  sorted.sort((a, b) => a.currentPrice - b.currentPrice)
  if (sort === 'price_desc') sorted.sort((a, b) => b.currentPrice - a.currentPrice)
  if (sort === 'score')      sorted.sort((a, b) => (b.expertScore || 0) - (a.expertScore || 0))

  return sorted
}

// ---------------------------------------------------------------------------
// Dropdown
// ---------------------------------------------------------------------------
const Dropdown = memo(({ label, options, selected, onChange }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative mb-2">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between bg-white border border-gray-200 rounded-full px-3 py-2 cursor-pointer text-[0.75rem] font-inter transition-colors ${
          selected ? 'text-gray-900' : 'text-gray-400'
        } hover:border-orange-300`}
      >
        <span className="truncate">{selected || label}</span>
        <ChevronDown size={12} className={`transition-transform flex-shrink-0 ml-1 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="absolute top-full left-0 right-0 z-[200] bg-white border border-gray-200 rounded-xl shadow-xl mt-1 overflow-hidden"
          >
            <div
              onClick={() => { onChange(null); setOpen(false) }}
              className="px-3 py-2 text-[0.75rem] text-gray-400 cursor-pointer hover:bg-gray-50"
            >
              All
            </div>
            {options.map((opt, i) => {
              const val = typeof opt === 'string' ? opt : opt.label
              return (
                <div
                  key={i}
                  onClick={() => { onChange(val); setOpen(false) }}
                  className={`px-3 py-2 text-[0.75rem] text-gray-800 cursor-pointer ${
                    selected === val ? 'bg-orange-50 text-orange-600 font-medium' : 'hover:bg-gray-50'
                  }`}
                >
                  {val}
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

// ---------------------------------------------------------------------------
// Checkbox
// ---------------------------------------------------------------------------
const Checkbox = memo(({ label, checked, onChange }) => (
  <label className="flex items-center gap-2 mb-2 cursor-pointer group">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-orange-600 h-4 w-4 rounded"
    />
    <span className="text-[0.75rem] font-inter text-gray-700 group-hover:text-gray-900 transition-colors">
      {label}
    </span>
  </label>
))

// ---------------------------------------------------------------------------
// FilterContent
// ---------------------------------------------------------------------------
const FilterContent = memo(({ cfg, brands, prices, filters, onToggleBrand, onSet }) => (
  <>
    <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Brand</p>
    {brands.map((b) => (
      <Checkbox
        key={b}
        label={b}
        checked={filters.brands.includes(b)}
        onChange={() => onToggleBrand(b)}
      />
    ))}

    <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora text-gray-800">Price</p>
    <Dropdown
      label="Budget"
      options={prices}
      selected={filters.price}
      onChange={(v) => onSet('price', v)}
    />

    {cfg &&
      Object.keys(cfg).map(
        (key) =>
          key !== 'brands' &&
          key !== 'price' && (
            <div key={key}>
              <p className="font-bold text-[0.8rem] mb-2 mt-3 font-lora capitalize text-gray-800">
                {key}
              </p>
              <Dropdown
                label={`Select ${key}`}
                options={cfg[key]}
                selected={filters[key]}
                onChange={(v) => onSet(key, v)}
              />
            </div>
          ),
      )}
  </>
))

// ---------------------------------------------------------------------------
// ProductCard
// ---------------------------------------------------------------------------
// const ProductCard = memo(({ product }) => (
//   <motion.div
//     variants={staggerItem}
//     className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
//   >
//     <Link
//       to={`/product/${product.slug}`}
//       className="block bg-[#f9f9f9] w-full aspect-square flex items-center justify-center overflow-hidden"
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         loading="lazy"
//         className="w-full h-full object-contain-cover "
//       />
//     </Link>
//     <div className="p-3">
//       <h3 className="text-[0.8rem] font-semibold h-9 overflow-hidden font-lora leading-tight text-gray-900">
//         {product.name}
//       </h3>
//       <div className="mt-2.5 flex items-baseline gap-1.5">
//         <span className="font-extrabold text-base text-gray-900">
//           ₹{product.currentPrice.toLocaleString('en-IN')}
//         </span>
//         {product.originalPrice > product.currentPrice && (
//           <span className="text-[0.7rem] text-gray-400 line-through">
//             ₹{product.originalPrice.toLocaleString('en-IN')}
//           </span>
//         )}
//       </div>
//       <a
//         href={product.dealLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="block text-center bg-orange-600 hover:bg-orange-700 text-white py-2.5 rounded-full text-[0.75rem] font-bold mt-3 transition-colors"
//       >
//         GET DEAL
//       </a>
//     </div>
//   </motion.div>
// ))

const ProductCard = memo(({ product }) => {
  const {
    slug, name, tagline, image,
    currentPrice, originalPrice,
    discount, savingsLabel, dealLink,
  } = product

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden relative h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {/* Discount badge */}
      {discount && (
        <span className="absolute top-2 left-2 z-20 bg-[#FF4500] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {discount}% off
        </span>
      )}

      {/* Image */}
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

      {/* Content */}
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

      {/* CTA */}
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

// ---------------------------------------------------------------------------
// ShopPage
// ---------------------------------------------------------------------------
export default function ShopPage() {
  const { slug: categorySlug } = useParams()
  const [searchParams]          = useSearchParams()
  const q                       = searchParams.get('q') ?? ''
  const { isMobile, isDesktop } = useBreakpoint()

  const [sort,       setSort]       = useState('relevance')
  const [filters,    setFilters]    = useState(INIT_FILTERS)
  const [filterOpen, setFilterOpen] = useState(false)

  const cfg    = useMemo(() => (categorySlug ? CATEGORY_FILTERS[categorySlug] : null), [categorySlug])
  const brands = useMemo(() => cfg?.brands ?? DEFAULT_FILTERS.brands, [cfg])
  const prices = useMemo(() => cfg?.price  ?? DEFAULT_FILTERS.price,  [cfg])

  const handleToggleBrand = useCallback(
    (b) =>
      setFilters((f) => ({
        ...f,
        brands: f.brands.includes(b)
          ? f.brands.filter((x) => x !== b)
          : [...f.brands, b],
      })),
    [],
  )
  const handleSet = useCallback((k, v) => setFilters((f) => ({ ...f, [k]: v })), [])

  const filtered = useMemo(
    () => applyFilters(productsData, { categorySlug, filters, sort, q }),
    [categorySlug, filters, sort, q],
  )

  // ---------------------------------------------------------------------------
  // Page heading — 3 cases:
  //   1. Category page  → "Mobiles"
  //   2. Search results → 'Results for "samsung"'
  //   3. All products   → "All Gadgets"
  // ---------------------------------------------------------------------------
  const catHeading = useMemo(() => {
    if (categorySlug)
      return categorySlug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    if (q) return `Results for "${q}"`
    return 'All Gadgets'
  }, [categorySlug, q])

  const pageTitle = categorySlug
    ? `${catHeading} | UnfilteredGadgets`
    : q
    ? `Search: ${q} | UnfilteredGadgets`
    : 'Shop | UnfilteredGadgets'

  const filterProps = { cfg, brands, prices, filters, onToggleBrand: handleToggleBrand, onSet: handleSet }

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>

      {/* Mobile sticky bar */}
      {!isDesktop && (
        <div className={`sticky ${HEADER_HEIGHT_MOBILE} z-40 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center`}>
          <div>
            <h1 className="text-base font-extrabold font-inter m-0 text-gray-900 truncate max-w-[200px]">
              {catHeading}
            </h1>
            <span className="text-[0.65rem] text-gray-400">
              Showing {filtered.length} products
            </span>
          </div>
          <button
            onClick={() => setFilterOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full text-[0.7rem] flex items-center gap-1.5 font-semibold"
          >
            <SlidersHorizontal size={12} /> Filter
          </button>
        </div>
      )}

      <div className="max-w-[1200px] mx-auto px-4 md:px-5 py-4 md:py-8">
        <div className="flex gap-8 items-start">

          {/* Desktop sidebar */}
          {isDesktop && (
            <aside className={`w-[220px] sticky ${DESKTOP_SIDEBAR_TOP} self-start max-h-[80vh] overflow-y-auto pr-2 scrollbar-hide`}>
              <div className="bg-white border border-gray-100 rounded-xl p-4">
                <h2 className="font-lora font-bold mb-4 text-gray-900">Filters</h2>
                <FilterContent {...filterProps} />
              </div>
            </aside>
          )}

          {/* Main content */}
          <main className="flex-1 min-w-0">
            {isDesktop && (
              <div className="mb-6 border-b border-gray-50 pb-4 flex justify-between items-end gap-4">
                <div className="min-w-0">
                  <h1 className="font-lora text-3xl font-extrabold text-gray-900 m-0 truncate">
                    {catHeading}
                  </h1>
                  <p className="text-gray-400 text-sm mt-1">
                    {filtered.length > 0
                      ? <>We found <b className="text-gray-700">{filtered.length}</b> gadgets for you</>
                      : 'No products found'}
                  </p>
                </div>
                <div className="w-[180px] flex-shrink-0">
                  <p className="text-[0.7rem] text-gray-800 mb-1 font-semibold">SORT BY</p>
                  <Dropdown
                    label="Relevance"
                    options={SORT_OPTIONS}
                    selected={SORT_OPTIONS.find((o) => o.value === sort)?.label}
                    onChange={(val) =>
                      setSort(SORT_OPTIONS.find((o) => o.label === val)?.value || 'relevance')
                    }
                  />
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
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </motion.div>
            ) : (
              /* ── Empty state ── */
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <SearchX size={40} className="text-gray-300 mb-4" />
                {q ? (
                  <>
                    <p className="text-gray-500 text-sm font-medium mb-1">
                      No results for <span className="text-gray-900 font-semibold">"{q}"</span>
                    </p>
                    <p className="text-gray-400 text-xs mb-4">
                      Try a different keyword or browse categories
                    </p>
                  </>
                ) : (
                  <p className="text-gray-400 mb-4">No products match your filters.</p>
                )}
                <button
                  onClick={() => setFilters(INIT_FILTERS)}
                  className="text-orange-600 font-bold text-sm cursor-pointer hover:underline"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <div className="h-24" />
          </main>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setFilterOpen(false)}
              className="fixed inset-0 bg-black/40 z-[100]"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-[101] bg-white rounded-t-3xl h-[75vh] flex flex-col"
            >
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <span className="font-extrabold text-lg font-lora">Filters</span>
                <X size={22} className="cursor-pointer text-gray-500" onClick={() => setFilterOpen(false)} />
              </div>
              <div className="flex-1 overflow-y-auto p-5 pb-28">
                <FilterContent {...filterProps} />
                <div className="mt-5">
                  <p className="font-bold text-[0.8rem] mb-3 font-lora">Sort By</p>
                  {SORT_OPTIONS.map((opt) => (
                    <div
                      key={opt.value}
                      onClick={() => setSort(opt.value)}
                      className={`py-3 border-b border-gray-50 text-[0.85rem] cursor-pointer transition-colors ${
                        sort === opt.value
                          ? 'text-orange-600 font-bold'
                          : 'text-gray-700 hover:text-orange-500'
                      }`}
                    >
                      {opt.label}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-gray-100">
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-full font-bold text-sm transition-colors"
                >
                  Show {filtered.length} Results
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}