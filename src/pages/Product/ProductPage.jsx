// // // pages/Product/ProductPage.jsx
// // import { useState, useMemo, useCallback, memo } from 'react'
// // import { Helmet } from 'react-helmet-async'
// // import { Link, useParams } from 'react-router-dom'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import { ShoppingCart, CheckCircle, AlertCircle, Star } from 'lucide-react'
// // import { getProductBySlug, productsData } from '../../data/products.data.js'
// // import { buildSEO } from '../../seo/seoConfig.js'
// // import { staggerContainer, staggerItem, fadeUp } from '../../utils/animations.js'
// // import { useBreakpoint } from '../../hooks/useMediaQuery.js'

// // // ─── StarRating — pure, memo'd ────────────────────────────────────────────────
// // const STARS = [1, 2, 3, 4, 5]
// // const StarRating = memo(function StarRating({ value, size = 14 }) {
// //   return (
// //     <span style={{ display: 'inline-flex', gap: 2 }}>
// //       {STARS.map(i => (
// //         <Star key={i} size={size}
// //           fill={i <= Math.round(value) ? '#FF9900' : 'none'}
// //           color={i <= Math.ceil(value) ? '#FF9900' : '#ddd'}
// //           strokeWidth={1.5}
// //         />
// //       ))}
// //     </span>
// //   )
// // })

// // // ─── ScoreCircle — pure computation, memo'd ───────────────────────────────────
// // const ScoreCircle = memo(function ScoreCircle({ score }) {
// //   const R    = 36
// //   const circ = 2 * Math.PI * R
// //   const dash = (score / 10) * circ
// //   return (
// //     <div style={{ position: 'relative', width: 88, height: 88, flexShrink: 0 }}>
// //       <svg width="88" height="88" style={{ transform: 'rotate(-90deg)' }}>
// //         <circle cx="44" cy="44" r={R} fill="none" stroke="#f0f0f0" strokeWidth="5" />
// //         <circle cx="44" cy="44" r={R} fill="none" stroke="#FF4500" strokeWidth="5"
// //           strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
// //       </svg>
// //       <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
// //         <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 800, fontSize: '1.5rem', color: '#111', lineHeight: 1 }}>{score}</span>
// //         <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 2 }}>Expert</span>
// //       </div>
// //     </div>
// //   )
// // })

// // // ─── RatingBar — memo'd ───────────────────────────────────────────────────────
// // const RatingBar = memo(function RatingBar({ star, count, total }) {
// //   const pct = total > 0 ? (count / total) * 100 : 0
// //   return (
// //     <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
// //       <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#555', width: 18, textAlign: 'right', flexShrink: 0 }}>{star}.0</span>
// //       <div style={{ flex: 1, height: 6, background: '#f0f0f0', borderRadius: 3, overflow: 'hidden' }}>
// //         <motion.div
// //           initial={{ width: 0 }} whileInView={{ width: `${pct}%` }}
// //           transition={{ duration: 0.7, ease: 'easeOut' }}
// //           style={{ height: '100%', background: '#FF9900', borderRadius: 3 }}
// //         />
// //       </div>
// //       <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#ccc', width: 55, flexShrink: 0 }}>
// //         {count} reviews
// //       </span>
// //     </div>
// //   )
// // })

// // // ─── SpecTable — memo'd, stable key using section name ────────────────────────
// // const SpecTable = memo(function SpecTable({ specifications }) {
// //   if (!specifications) {
// //     return <p style={{ fontFamily: 'Inter, sans-serif', color: '#aaa', fontSize: '0.8rem' }}>No specs available.</p>
// //   }
// //   return (
// //     <div>
// //       {Object.entries(specifications).map(([section, fields]) => {
// //         const fieldEntries = Object.entries(fields)
// //         return (
// //           <div key={section} style={{ marginBottom: 20 }}>
// //             <div style={{ border: '1px solid #e8e8e8', borderRadius: 8, overflow: 'hidden' }}>
// //               <div style={{ padding: '10px 16px', background: '#fafafa', borderBottom: '1px solid #e8e8e8' }}>
// //                 <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '0.88rem', color: '#111' }}>{section}</span>
// //               </div>
// //               {fieldEntries.map(([key, val], i) => (
// //                 <div key={key} style={{
// //                   display: 'grid', gridTemplateColumns: '140px 1fr',
// //                   borderBottom: i < fieldEntries.length - 1 ? '1px solid #f5f5f5' : 'none',
// //                   background: i % 2 === 0 ? '#fff' : '#fafafa',
// //                 }}>
// //                   <div style={{ padding: '9px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#888', fontWeight: 500, borderRight: '1px solid #f5f5f5' }}>
// //                     {key}
// //                   </div>
// //                   <div style={{ padding: '9px 16px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#111' }}>
// //                     {val}
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         )
// //       })}
// //     </div>
// //   )
// // })

// // // ─── RelatedCard — memo'd ─────────────────────────────────────────────────────
// // const RelatedCard = memo(function RelatedCard({ product }) {
// //   return (
// //     <motion.div variants={staggerItem}
// //       style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 10, overflow: 'hidden' }}
// //       whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
// //     >
// //       <Link to={`/product/${product.slug}`}
// //         style={{ display: 'block', background: '#f8f8f8', height: 130, overflow: 'hidden' }}>
// //         <img src={product.image} alt={product.name} loading="lazy"
// //           style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
// //           onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
// //           onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
// //         />
// //       </Link>
// //       <div style={{ padding: '9px 11px 11px' }}>
// //         <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
// //           <p style={{
// //             fontFamily: 'Lora, Georgia, serif', fontWeight: 600, fontSize: '0.78rem',
// //             color: '#111', lineHeight: 1.3, marginBottom: 4,
// //             display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
// //           }}>{product.name}</p>
// //         </Link>
// //         <p style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '0.88rem', color: '#111' }}>
// //           ₹{product.currentPrice?.toLocaleString('en-IN')}
// //         </p>
// //       </div>
// //     </motion.div>
// //   )
// // })

// // // ─── ImageGallery — isolated state so parent doesn't re-render ────────────────
// // const ImageGallery = memo(function ImageGallery({ images, name, isMobile }) {
// //   const [activeImg, setActiveImg] = useState(0)

// //   return (
// //     <div>
// //       <div style={{
// //         background: '#f8f8f8', borderRadius: 12, overflow: 'hidden',
// //         height: isMobile ? 260 : 360,
// //         display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
// //       }}>
// //         <AnimatePresence mode="wait">
// //           <motion.img key={activeImg}
// //             src={images?.[activeImg] ?? images?.[0]}
// //             alt={name}
// //             initial={{ opacity: 0, scale: 0.97 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.22 }}
// //             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
// //           />
// //         </AnimatePresence>
// //       </div>
// //       {images && images.length > 1 && (
// //         <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4 }}>
// //           {images.map((img, i) => (
// //             <button key={i} onClick={() => setActiveImg(i)}
// //               style={{
// //                 width: 54, height: 54, flexShrink: 0, borderRadius: 7, overflow: 'hidden',
// //                 cursor: 'pointer', padding: 0, background: '#f8f8f8',
// //                 border: activeImg === i ? '2px solid #FF4500' : '2px solid #e8e8e8',
// //                 transition: 'border-color 0.15s',
// //               }}>
// //               <img src={img} alt={`${name} ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
// //             </button>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   )
// // })

// // // ─── VerdictCard — memo'd, extracted from main render ─────────────────────────
// // const VerdictCard = memo(function VerdictCard({ verdict, scores, expertScore, isMobile }) {
// //   return (
// //     <div style={{ background: '#f8f8f8', border: '1px solid #eee', borderRadius: 12, padding: isMobile ? '20px 16px' : '26px 28px', marginBottom: 24 }}>
// //       <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
// //         <div style={{ flex: 1, minWidth: 0 }}>
// //           <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 800, fontSize: '0.72rem', color: '#FF4500', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>
// //             THE UNFILTERED VERDICT
// //           </h2>
// //           <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#444', lineHeight: 1.8, marginBottom: 20 }}>
// //             {verdict}
// //           </p>
// //           <div style={{ display: 'flex', gap: isMobile ? 18 : 26, flexWrap: 'wrap' }}>
// //             {scores?.map(s => (
// //               <div key={s.label} style={{ textAlign: 'center' }}>
// //                 <div style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 800, fontSize: '1.3rem', color: '#111', lineHeight: 1 }}>
// //                   {s.value}
// //                 </div>
// //                 <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 3 }}>
// //                   {s.label}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //         {expertScore && !isMobile && <ScoreCircle score={expertScore} />}
// //       </div>
// //       {expertScore && isMobile && (
// //         <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
// //           <ScoreCircle score={expertScore} />
// //         </div>
// //       )}
// //     </div>
// //   )
// // })

// // // ─── ProsConsGrid — memo'd ────────────────────────────────────────────────────
// // const ProsConsGrid = memo(function ProsConsGrid({ pros, cons, isMobile }) {
// //   return (
// //     <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14, marginBottom: 32 }}>
// //       <div style={{ background: '#f0faf4', border: '1px solid #d0edda', borderRadius: 10, padding: '18px 20px' }}>
// //         <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
// //           <CheckCircle size={15} color="#1a7c3e" />
// //           <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '0.88rem', color: '#1a7c3e' }}>The Good</span>
// //         </div>
// //         {pros?.map((p, i) => (
// //           <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
// //             <span style={{ color: '#1a7c3e', flexShrink: 0, marginTop: 1 }}>•</span>
// //             <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.77rem', color: '#333', lineHeight: 1.55 }}>{p}</span>
// //           </div>
// //         ))}
// //       </div>
// //       <div style={{ background: '#fff5f0', border: '1px solid #fdd8cc', borderRadius: 10, padding: '18px 20px' }}>
// //         <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
// //           <AlertCircle size={15} color="#c0392b" />
// //           <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '0.88rem', color: '#c0392b' }}>The Bad</span>
// //         </div>
// //         {cons?.map((c, i) => (
// //           <div key={i} style={{ display: 'flex', gap: 7, marginBottom: 7 }}>
// //             <span style={{ color: '#c0392b', flexShrink: 0, marginTop: 1 }}>•</span>
// //             <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.77rem', color: '#333', lineHeight: 1.55 }}>{c}</span>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   )
// // })

// // // ─── ReviewsSection — memo'd ──────────────────────────────────────────────────
// // const RATING_STARS = [5, 4, 3, 2, 1]
// // const ReviewsSection = memo(function ReviewsSection({ reviews, ratingAvg, ratingCount, ratingBreakdown, isMobile }) {
// //   const totalRatings = useMemo(
// //     () => ratingBreakdown?.reduce((s, r) => s + r.count, 0) ?? 0,
// //     [ratingBreakdown]
// //   )
// //   return (
// //     <div style={{ marginBottom: 40 }}>
// //       <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '1.1rem', color: '#111', marginBottom: 20 }}>Reviews</h2>
// //       <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '180px 1fr', gap: isMobile ? 16 : 36, marginBottom: 20 }}>
// //         <div>
// //           <div style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 800, fontSize: '2.8rem', color: '#111', lineHeight: 1 }}>{ratingAvg}</div>
// //           <StarRating value={ratingAvg} size={14} />
// //           <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#aaa', marginTop: 4 }}>
// //             {(ratingCount / 1000).toFixed(1)}k Ratings
// //           </p>
// //         </div>
// //         <div style={{ paddingTop: 4 }}>
// //           {RATING_STARS.map(star => {
// //             const row = ratingBreakdown?.find(r => r.star === star)
// //             return <RatingBar key={star} star={star} count={row?.count ?? 0} total={totalRatings} />
// //           })}
// //         </div>
// //       </div>
// //       {reviews?.length > 0 && reviews.map(r => (
// //         <div key={r.id} style={{ borderTop: '1px solid #f0f0f0', paddingTop: 18, paddingBottom: 18 }}>
// //           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8, gap: 10 }}>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
// //               <div style={{ width: 34, height: 34, background: '#f0f0f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Lora, serif', fontWeight: 700, fontSize: '0.85rem', color: '#555', flexShrink: 0 }}>
// //                 {r.user.charAt(0)}
// //               </div>
// //               <div>
// //                 <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem', color: '#111' }}>{r.user}</p>
// //                 <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#aaa' }}>{r.tag} · {r.date}</p>
// //               </div>
// //             </div>
// //             <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
// //               <span style={{ fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.88rem', color: '#111' }}>{r.rating}.0</span>
// //               <StarRating value={r.rating} size={12} />
// //             </div>
// //           </div>
// //           <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.77rem', color: '#555', lineHeight: 1.7 }}>"{r.text}"</p>
// //         </div>
// //       ))}
// //     </div>
// //   )
// // })

// // // ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
// // export default function ProductPage() {
// //   const { slug } = useParams()
// //   const { isMobile, isTablet, isDesktop } = useBreakpoint()
// //   const [tab, setTab] = useState('description')

// //   // Stable tab setter
// //   const handleTabChange = useCallback((t) => setTab(t), [])

// //   // Data — no useState needed, derives from URL
// //   const product = useMemo(() => getProductBySlug(slug), [slug])
// //   const related  = useMemo(
// //     () => product ? productsData.filter(p => p.category === product.category && p.slug !== slug).slice(0, 4) : [],
// //     [product, slug]
// //   )
// //   const seo = useMemo(() => product ? buildSEO({
// //     title: `${product.name} Review`,
// //     description: `${product.name} — Honest expert review, score, pros & cons. ₹${product.currentPrice?.toLocaleString('en-IN')}.`,
// //     url: `/product/${slug}`,
// //   }) : null, [product, slug])

// //   const relatedCols = isMobile ? 2 : isTablet ? 3 : 4

// //   if (!product) {
// //     return (
// //       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
// //         <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.1rem', color: '#111' }}>Product not found</p>
// //         <Link to="/shop" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#FF4500', fontWeight: 600 }}>← Back to Shop</Link>
// //       </div>
// //     )
// //   }

// //   const {
// //     name, tagline, badge, category, images, currentPrice, originalPrice,
// //     discount, emiText, dealLink, expertScore, scores, verdictPreview,
// //     verdict, pros, cons, reviews, ratingAvg, ratingCount, ratingBreakdown, specifications,
// //   } = product

// //   const px = isMobile ? '14px' : '24px'

// //   return (
// //     <>
// //       <Helmet>
// //         <title>{seo.title}</title>
// //         <meta name="description" content={seo.description} />
// //         <link rel="canonical" href={seo.canonical} />
// //         <script type="application/ld+json">{JSON.stringify({
// //           '@context': 'https://schema.org', '@type': 'Product',
// //           name, description: tagline,
// //           offers: { '@type': 'Offer', price: currentPrice, priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
// //           aggregateRating: { '@type': 'AggregateRating', ratingValue: ratingAvg, reviewCount: ratingCount },
// //         })}</script>
// //       </Helmet>

// //       <div style={{ minHeight: '100vh', background: '#fff' }}>
// //         <div style={{ maxWidth: 1200, margin: '0 auto', padding: `0 ${px}` }}>

// //           {/* Breadcrumb */}
// //           <nav style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#aaa', padding: '14px 0 18px', display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
// //             <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>Home</Link>
// //             <span>/</span>
// //             <Link to={`/category/${category}`} style={{ color: '#aaa', textDecoration: 'none', textTransform: 'capitalize' }}>{category}</Link>
// //             <span>/</span>
// //             <span style={{ color: '#111', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{name}</span>
// //           </nav>

// //           {/* Top section */}
// //           <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 44, marginBottom: isMobile ? 24 : 36 }}>

// //             {/* Gallery — isolated state, no parent re-render on image change */}
// //             <ImageGallery images={images} name={name} isMobile={isMobile} />

// //             {/* Info */}
// //             <motion.div initial="hidden" animate="visible" variants={fadeUp}>
// //               {badge && (
// //                 <span style={{ display: 'inline-block', fontFamily: 'Inter, sans-serif', fontSize: '0.63rem', fontWeight: 700, color: '#FF4500', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 7 }}>
// //                   {badge}
// //                 </span>
// //               )}
// //               <h1 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: isMobile ? '1.5rem' : '1.85rem', color: '#111', lineHeight: 1.15, marginBottom: 5 }}>
// //                 {name}
// //               </h1>
// //               <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#777', marginBottom: 18 }}>{tagline}</p>

// //               <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, marginBottom: 5, flexWrap: 'wrap' }}>
// //                 <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 800, fontSize: isMobile ? '1.5rem' : '1.75rem', color: '#111', lineHeight: 1 }}>
// //                   ₹{currentPrice?.toLocaleString('en-IN')}
// //                 </span>
// //                 {originalPrice && (
// //                   <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#bbb', textDecoration: 'line-through', marginBottom: 2 }}>
// //                     ₹{originalPrice?.toLocaleString('en-IN')}
// //                   </span>
// //                 )}
// //                 {discount > 0 && (
// //                   <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700, color: '#FF4500', marginBottom: 2 }}>
// //                     {discount}% OFF
// //                   </span>
// //                 )}
// //               </div>
// //               {emiText && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#aaa', marginBottom: 16 }}>{emiText}</p>}

// //               <a href={dealLink} target="_blank" rel="noopener noreferrer"
// //                 style={{
// //                   display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
// //                   width: '100%', background: '#FF4500', color: '#fff',
// //                   fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.875rem',
// //                   padding: '12px 0', borderRadius: 8, textDecoration: 'none', marginBottom: 14,
// //                   transition: 'background 0.18s',
// //                 }}
// //                 onMouseEnter={e => e.currentTarget.style.background = '#CC3700'}
// //                 onMouseLeave={e => e.currentTarget.style.background = '#FF4500'}
// //               >
// //                 <ShoppingCart size={15} /> Grab Deal
// //               </a>

// //               {verdictPreview && (
// //                 <div style={{ background: '#fff8f5', border: '1px solid #ffe0d0', borderRadius: 8, padding: '12px 14px' }}>
// //                   <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 7 }}>
// //                     <span style={{ fontSize: '0.85rem' }}>🔍</span>
// //                     <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', fontWeight: 700, color: '#FF4500', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
// //                       Unfiltered Verdict Preview
// //                     </span>
// //                   </div>
// //                   <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.76rem', color: '#555', lineHeight: 1.65, fontStyle: 'italic' }}>
// //                     {verdictPreview}
// //                   </p>
// //                 </div>
// //               )}
// //             </motion.div>
// //           </div>

// //           {/* Tabs */}
// //           <div style={{ borderBottom: '2px solid #f0f0f0', display: 'flex', marginBottom: 24 }}>
// //             {['description', 'specification'].map(t => (
// //               <button key={t} onClick={() => handleTabChange(t)}
// //                 style={{
// //                   fontFamily: 'Inter, sans-serif', fontWeight: 600,
// //                   fontSize: isMobile ? '0.8rem' : '0.875rem',
// //                   padding: isMobile ? '10px 16px' : '11px 24px',
// //                   background: 'none', border: 'none', cursor: 'pointer',
// //                   color: tab === t ? '#111' : '#999',
// //                   borderBottom: tab === t ? '2px solid #FF4500' : '2px solid transparent',
// //                   marginBottom: -2, transition: 'all 0.18s', textTransform: 'capitalize',
// //                 }}
// //               >{t}</button>
// //             ))}
// //           </div>

// //           {/* Tab content */}
// //           <AnimatePresence mode="wait">
// //             {tab === 'description' ? (
// //               <motion.div key="desc" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
// //                 <VerdictCard verdict={verdict} scores={scores} expertScore={expertScore} isMobile={isMobile} />
// //                 <ProsConsGrid pros={pros} cons={cons} isMobile={isMobile} />
// //                 <ReviewsSection
// //                   reviews={reviews} ratingAvg={ratingAvg}
// //                   ratingCount={ratingCount} ratingBreakdown={ratingBreakdown}
// //                   isMobile={isMobile}
// //                 />
// //               </motion.div>
// //             ) : (
// //               <motion.div key="spec" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}
// //                 style={{ marginBottom: 40 }}>
// //                 <SpecTable specifications={specifications} />
// //               </motion.div>
// //             )}
// //           </AnimatePresence>

// //           {/* Related */}
// //           {related.length > 0 && (
// //             <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 28, marginBottom: 48 }}>
// //               <h2 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '1.1rem', color: '#111', marginBottom: 16 }}>
// //                 Related Products
// //               </h2>
// //               <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
// //                 style={{ display: 'grid', gridTemplateColumns: `repeat(${relatedCols}, 1fr)`, gap: 12 }}
// //               >
// //                 {related.map(p => <RelatedCard key={p.id} product={p} />)}
// //               </motion.div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   )
// // }


// // pages/Product/ProductPage.jsx
// import { useState, useMemo, useCallback, memo } from 'react'
// import { Helmet } from 'react-helmet-async'
// import { Link, useParams } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ShoppingCart, CheckCircle, AlertCircle, Star } from 'lucide-react'
// import { getProductBySlug, productsData } from '../../data/products.data.js'
// import { buildSEO } from '../../seo/seoConfig.js'
// import { staggerContainer, staggerItem, fadeUp } from '../../utils/animations.js'
// import { useBreakpoint } from '../../hooks/useMediaQuery.js'

// // ─── StarRating ───────────────────────────────────────────────────────────────
// const STARS = [1, 2, 3, 4, 5]
// const StarRating = memo(function StarRating({ value, size = 14 }) {
//   return (
//     <span className="inline-flex gap-0.5">
//       {STARS.map((i) => (
//         <Star
//           key={i}
//           size={size}
//           fill={i <= Math.round(value) ? '#FF9900' : 'none'}
//           color={i <= Math.ceil(value) ? '#FF9900' : '#ddd'}
//           strokeWidth={1.5}
//         />
//       ))}
//     </span>
//   )
// })

// // ─── ScoreCircle ──────────────────────────────────────────────────────────────
// const ScoreCircle = memo(function ScoreCircle({ score }) {
//   const R    = 36
//   const circ = 2 * Math.PI * R
//   const dash = (score / 10) * circ
//   return (
//     <div className="relative w-[88px] h-[88px] flex-shrink-0">
//       <svg width="88" height="88" className="-rotate-90">
//         <circle cx="44" cy="44" r={R} fill="none" stroke="#f0f0f0" strokeWidth="5" />
//         <circle
//           cx="44" cy="44" r={R} fill="none"
//           stroke="#FF4500" strokeWidth="5"
//           strokeDasharray={`${dash} ${circ}`}
//           strokeLinecap="round"
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center">
//         <span className="font-lora font-extrabold text-2xl text-[#111] leading-none">{score}</span>
//         <span className="font-inter text-[0.55rem] text-gray-400 uppercase tracking-widest mt-0.5">Expert</span>
//       </div>
//     </div>
//   )
// })

// // ─── RatingBar ────────────────────────────────────────────────────────────────
// const RatingBar = memo(function RatingBar({ star, count, total }) {
//   const pct = total > 0 ? (count / total) * 100 : 0
//   return (
//     <div className="flex items-center gap-2 mb-1.5">
//       <span className="font-inter text-[0.72rem] text-gray-500 w-[18px] text-right flex-shrink-0">
//         {star}.0
//       </span>
//       <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//         <motion.div
//           initial={{ width: 0 }}
//           whileInView={{ width: `${pct}%` }}
//           transition={{ duration: 0.7, ease: 'easeOut' }}
//           className="h-full bg-[#FF9900] rounded-full"
//         />
//       </div>
//       <span className="font-inter text-[0.67rem] text-gray-300 w-[55px] flex-shrink-0">
//         {count} reviews
//       </span>
//     </div>
//   )
// })

// // ─── SpecTable ────────────────────────────────────────────────────────────────
// const SpecTable = memo(function SpecTable({ specifications }) {
//   if (!specifications) {
//     return (
//       <p className="font-inter text-gray-400 text-[0.8rem]">No specs available.</p>
//     )
//   }
//   return (
//     <div className="space-y-5">
//       {Object.entries(specifications).map(([section, fields]) => {
//         const fieldEntries = Object.entries(fields)
//         return (
//           <div key={section}>
//             <div className="border border-gray-200 rounded-lg overflow-hidden">
//               <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-200">
//                 <span className="font-lora font-bold text-[0.88rem] text-[#111]">{section}</span>
//               </div>
//               {fieldEntries.map(([key, val], i) => (
//                 <div
//                   key={key}
//                   className={`grid grid-cols-[140px_1fr] ${
//                     i < fieldEntries.length - 1 ? 'border-b border-gray-100' : ''
//                   } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
//                 >
//                   <div className="px-4 py-2.5 font-inter text-[0.75rem] text-gray-400 font-medium border-r border-gray-100">
//                     {key}
//                   </div>
//                   <div className="px-4 py-2.5 font-inter text-[0.75rem] text-[#111]">
//                     {val}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   )
// })

// // ─── RelatedCard ──────────────────────────────────────────────────────────────
// const RelatedCard = memo(function RelatedCard({ product }) {
//   return (
//     <motion.div
//       variants={staggerItem}
//       className="bg-white border border-gray-200 rounded-xl overflow-hidden"
//       whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' }}
//     >
//       <Link
//         to={`/product/${product.slug}`}
//         className="block bg-gray-50 h-[130px] overflow-hidden"
//       >
//         <img
//           src={product.image}
//           alt={product.name}
//           loading="lazy"
//           className="w-full h-full object-cover transition-transform duration-300 hover:scale-[1.04]"
//         />
//       </Link>
//       <div className="p-2.5 pb-3">
//         <Link to={`/product/${product.slug}`} className="no-underline">
//           <p className="font-lora font-semibold text-[0.78rem] text-[#111] leading-snug mb-1 line-clamp-2">
//             {product.name}
//           </p>
//         </Link>
//         <p className="font-lora font-bold text-[0.88rem] text-[#111]">
//           ₹{product.currentPrice?.toLocaleString('en-IN')}
//         </p>
//       </div>
//     </motion.div>
//   )
// })

// // ─── ImageGallery ─────────────────────────────────────────────────────────────
// const ImageGallery = memo(function ImageGallery({ images, name, isMobile }) {
//   const [activeImg, setActiveImg] = useState(0)
//   return (
//     <div>
//       <div
//         className={`bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-2.5 ${
//           isMobile ? 'h-[260px]' : 'h-[360px]'
//         }`}
//       >
//         <AnimatePresence mode="wait">
//           <motion.img
//             key={activeImg}
//             src={images?.[activeImg] ?? images?.[0]}
//             alt={name}
//             initial={{ opacity: 0, scale: 0.97 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.22 }}
//             className="w-full h-full object-cover"
//           />
//         </AnimatePresence>
//       </div>
//       {images && images.length > 1 && (
//         <div className="flex gap-2 overflow-x-auto pb-1">
//           {images.map((img, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveImg(i)}
//               className={`w-[54px] h-[54px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer p-0 bg-gray-50 transition-all ${
//                 activeImg === i
//                   ? 'border-2 border-[#FF4500]'
//                   : 'border-2 border-gray-200 hover:border-gray-400'
//               }`}
//             >
//               <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// })

// // ─── VerdictCard ──────────────────────────────────────────────────────────────
// const VerdictCard = memo(function VerdictCard({ verdict, scores, expertScore, isMobile }) {
//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 md:p-7 mb-6">
//       <div className={`flex items-start justify-between gap-5 ${isMobile ? 'flex-wrap' : ''}`}>
//         <div className="flex-1 min-w-0">
//           <h2 className="font-inter font-bold text-[0.72rem] text-[#FF4500] tracking-[0.12em] uppercase mb-2.5">
//             THE UNFILTERED VERDICT
//           </h2>
//           <p className="font-inter text-[0.8rem] text-gray-500 leading-relaxed mb-5">
//             {verdict}
//           </p>
//           <div className={`flex gap-5 md:gap-7 flex-wrap`}>
//             {scores?.map((s) => (
//               <div key={s.label} className="text-center">
//                 <div className="font-lora font-extrabold text-[1.3rem] text-[#111] leading-none">
//                   {s.value}
//                 </div>
//                 <div className="font-inter text-[0.62rem] text-gray-400 uppercase tracking-wide mt-0.5">
//                   {s.label}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//         {expertScore && !isMobile && <ScoreCircle score={expertScore} />}
//       </div>
//       {expertScore && isMobile && (
//         <div className="flex justify-center mt-4">
//           <ScoreCircle score={expertScore} />
//         </div>
//       )}
//     </div>
//   )
// })

// // ─── ProsConsGrid ─────────────────────────────────────────────────────────────
// const ProsConsGrid = memo(function ProsConsGrid({ pros, cons, isMobile }) {
//   return (
//     <div className={`grid gap-3.5 mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
//       {/* Pros */}
//       <div className="bg-[#f0faf4] border border-[#d0edda] rounded-xl p-4 md:p-5">
//         <div className="flex items-center gap-2 mb-3">
//           <CheckCircle size={15} color="#1a7c3e" />
//           <span className="font-lora font-bold text-[0.88rem] text-[#1a7c3e]">The Good</span>
//         </div>
//         {pros?.map((p, i) => (
//           <div key={i} className="flex gap-2 mb-2">
//             <span className="text-[#1a7c3e] flex-shrink-0 mt-0.5 text-sm">•</span>
//             <span className="font-inter text-[0.77rem] text-gray-700 leading-relaxed">{p}</span>
//           </div>
//         ))}
//       </div>

//       {/* Cons */}
//       <div className="bg-[#fff5f0] border border-[#fdd8cc] rounded-xl p-4 md:p-5">
//         <div className="flex items-center gap-2 mb-3">
//           <AlertCircle size={15} color="#c0392b" />
//           <span className="font-lora font-bold text-[0.88rem] text-[#c0392b]">The Bad</span>
//         </div>
//         {cons?.map((c, i) => (
//           <div key={i} className="flex gap-2 mb-2">
//             <span className="text-[#c0392b] flex-shrink-0 mt-0.5 text-sm">•</span>
//             <span className="font-inter text-[0.77rem] text-gray-700 leading-relaxed">{c}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// })

// // ─── ReviewsSection ───────────────────────────────────────────────────────────
// const RATING_STARS = [5, 4, 3, 2, 1]
// const ReviewsSection = memo(function ReviewsSection({
//   reviews, ratingAvg, ratingCount, ratingBreakdown, isMobile,
// }) {
//   const totalRatings = useMemo(
//     () => ratingBreakdown?.reduce((s, r) => s + r.count, 0) ?? 0,
//     [ratingBreakdown],
//   )
//   return (
//     <div className="mb-10">
//       <h2 className="font-lora font-bold text-[1.1rem] text-[#111] mb-5">Reviews</h2>
//       <div className={`grid gap-4 md:gap-9 mb-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-[180px_1fr]'}`}>
//         <div>
//           <div className="font-lora font-extrabold text-[2.8rem] text-[#111] leading-none">
//             {ratingAvg}
//           </div>
//           <StarRating value={ratingAvg} size={14} />
//           <p className="font-inter text-[0.7rem] text-gray-400 mt-1">
//             {(ratingCount / 1000).toFixed(1)}k Ratings
//           </p>
//         </div>
//         <div className="pt-1">
//           {RATING_STARS.map((star) => {
//             const row = ratingBreakdown?.find((r) => r.star === star)
//             return (
//               <RatingBar key={star} star={star} count={row?.count ?? 0} total={totalRatings} />
//             )
//           })}
//         </div>
//       </div>

//       {reviews?.length > 0 &&
//         reviews.map((r) => (
//           <div key={r.id} className="border-t border-gray-100 pt-4 pb-4">
//             <div className="flex items-start justify-between mb-2 gap-2.5">
//               <div className="flex items-center gap-2.5">
//                 <div className="w-[34px] h-[34px] bg-gray-100 rounded-full flex items-center justify-center font-lora font-bold text-[0.85rem] text-gray-500 flex-shrink-0">
//                   {r.user.charAt(0)}
//                 </div>
//                 <div>
//                   <p className="font-inter font-semibold text-[0.78rem] text-[#111]">{r.user}</p>
//                   <p className="font-inter text-[0.67rem] text-gray-400">{r.tag} · {r.date}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-1.5 flex-shrink-0">
//                 <span className="font-inter font-bold text-[0.88rem] text-[#111]">{r.rating}.0</span>
//                 <StarRating value={r.rating} size={12} />
//               </div>
//             </div>
//             <p className="font-inter text-[0.77rem] text-gray-500 leading-[1.7]">"{r.text}"</p>
//           </div>
//         ))}
//     </div>
//   )
// })

// // ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
// export default function ProductPage() {
//   const { slug }                      = useParams()
//   const { isMobile, isTablet, isDesktop } = useBreakpoint()
//   const [tab, setTab]                 = useState('description')

//   const handleTabChange = useCallback((t) => setTab(t), [])

//   const product = useMemo(() => getProductBySlug(slug), [slug])
//   const related  = useMemo(
//     () =>
//       product
//         ? productsData
//             .filter((p) => p.category === product.category && p.slug !== slug)
//             .slice(0, 4)
//         : [],
//     [product, slug],
//   )
//   const seo = useMemo(
//     () =>
//       product
//         ? buildSEO({
//             title: `${product.name} Review`,
//             description: `${product.name} — Honest expert review, score, pros & cons. ₹${product.currentPrice?.toLocaleString('en-IN')}.`,
//             url: `/product/${slug}`,
//           })
//         : null,
//     [product, slug],
//   )

//   const relatedCols = isMobile ? 2 : isTablet ? 3 : 4

//   if (!product) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
//         <p className="font-lora text-[1.1rem] text-[#111]">Product not found</p>
//         <Link to="/shop" className="font-inter text-[0.8rem] text-[#FF4500] font-semibold">
//           ← Back to Shop
//         </Link>
//       </div>
//     )
//   }

//   const {
//     name, tagline, badge, category, images, currentPrice, originalPrice,
//     discount, emiText, dealLink, expertScore, scores, verdictPreview,
//     verdict, pros, cons, reviews, ratingAvg, ratingCount, ratingBreakdown, specifications,
//   } = product

//   return (
//     <>
//       <Helmet>
//         <title>{seo.title}</title>
//         <meta name="description" content={seo.description} />
//         <link rel="canonical" href={seo.canonical} />
//         <script type="application/ld+json">
//           {JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'Product',
//             name,
//             description: tagline,
//             offers: {
//               '@type': 'Offer',
//               price: currentPrice,
//               priceCurrency: 'INR',
//               availability: 'https://schema.org/InStock',
//             },
//             aggregateRating: {
//               '@type': 'AggregateRating',
//               ratingValue: ratingAvg,
//               reviewCount: ratingCount,
//             },
//           })}
//         </script>
//       </Helmet>

//       <div className="min-h-screen bg-white">
//         <div className="max-w-[1200px] mx-auto px-3.5 md:px-6">

//           {/* Breadcrumb */}
//           <nav className="font-inter text-[0.7rem] text-gray-400 py-3.5 flex items-center gap-1.5 flex-wrap">
//             <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors no-underline">
//               Home
//             </Link>
//             <span>/</span>
//             <Link
//               to={`/category/${category}`}
//               className="text-gray-400 hover:text-gray-600 transition-colors capitalize no-underline"
//             >
//               {category}
//             </Link>
//             <span>/</span>
//             <span className="text-[#111] truncate max-w-[180px]">{name}</span>
//           </nav>

//           {/* Top section — gallery + info */}
//           <div className={`grid gap-5 md:gap-11 mb-6 md:mb-9 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>

//             {/* Gallery */}
//             <ImageGallery images={images} name={name} isMobile={isMobile} />

//             {/* Info */}
//             <motion.div initial="hidden" animate="visible" variants={fadeUp}>
//               {badge && (
//                 <span className="inline-block font-inter text-[0.63rem] font-bold text-[#FF4500] tracking-[0.1em] uppercase mb-2">
//                   {badge}
//                 </span>
//               )}
//               <h1 className={`font-lora font-bold text-[#111] leading-tight mb-1.5 ${isMobile ? 'text-2xl' : 'text-[1.85rem]'}`}>
//                 {name}
//               </h1>
//               <p className="font-inter text-[0.78rem] text-gray-500 mb-4.5">{tagline}</p>

//               {/* Pricing */}
//               <div className="flex items-end gap-2.5 mb-1.5 flex-wrap">
//                 <span className={`font-lora font-extrabold text-[#111] leading-none ${isMobile ? 'text-2xl' : 'text-[1.75rem]'}`}>
//                   ₹{currentPrice?.toLocaleString('en-IN')}
//                 </span>
//                 {originalPrice && (
//                   <span className="font-inter text-[0.88rem] text-gray-300 line-through mb-0.5">
//                     ₹{originalPrice?.toLocaleString('en-IN')}
//                   </span>
//                 )}
//                 {discount > 0 && (
//                   <span className="font-inter text-[0.82rem] font-bold text-[#FF4500] mb-0.5">
//                     {discount}% OFF
//                   </span>
//                 )}
//               </div>
//               {emiText && (
//                 <p className="font-inter text-[0.7rem] text-gray-400 mb-4">{emiText}</p>
//               )}

//               {/* CTA */}
//               <a
//                 href={dealLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 w-full bg-[#FF4500] hover:bg-[#CC3700] text-white font-inter font-bold text-[0.875rem] py-3 rounded-lg no-underline mb-3.5 transition-colors"
//               >
//                 <ShoppingCart size={15} /> Grab Deal
//               </a>

//               {/* Verdict preview */}
//               {verdictPreview && (
//                 <div className="bg-[#fff8f5] border border-[#ffe0d0] rounded-lg p-3.5">
//                   <div className="flex items-center gap-1.5 mb-2">
//                     <span className="text-[0.85rem]">🔍</span>
//                     <span className="font-inter text-[0.65rem] font-bold text-[#FF4500] uppercase tracking-wide">
//                       Unfiltered Verdict Preview
//                     </span>
//                   </div>
//                   <p className="font-inter text-[0.76rem] text-gray-500 leading-[1.65] italic">
//                     {verdictPreview}
//                   </p>
//                 </div>
//               )}
//             </motion.div>
//           </div>

//           {/* Tabs */}
//           <div className="border-b-2 border-gray-100 flex mb-6">
//             {['description', 'specification'].map((t) => (
//               <button
//                 key={t}
//                 onClick={() => handleTabChange(t)}
//                 className={`font-inter font-semibold capitalize -mb-0.5 transition-all border-b-2 cursor-pointer bg-transparent ${
//                   isMobile ? 'text-[0.8rem] px-4 py-2.5' : 'text-[0.875rem] px-6 py-3'
//                 } ${
//                   tab === t
//                     ? 'text-[#111] border-[#FF4500]'
//                     : 'text-gray-400 border-transparent hover:text-gray-600'
//                 }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>

//           {/* Tab content */}
//           <AnimatePresence mode="wait">
//             {tab === 'description' ? (
//               <motion.div
//                 key="desc"
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.22 }}
//               >
//                 <VerdictCard
//                   verdict={verdict} scores={scores}
//                   expertScore={expertScore} isMobile={isMobile}
//                 />
//                 <ProsConsGrid pros={pros} cons={cons} isMobile={isMobile} />
//                 <ReviewsSection
//                   reviews={reviews} ratingAvg={ratingAvg}
//                   ratingCount={ratingCount} ratingBreakdown={ratingBreakdown}
//                   isMobile={isMobile}
//                 />
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="spec"
//                 initial={{ opacity: 0, y: 6 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.22 }}
//                 className="mb-10"
//               >
//                 <SpecTable specifications={specifications} />
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Related products */}
//           {related.length > 0 && (
//             <div className="border-t border-gray-100 pt-7 mb-12">
//               <h2 className="font-lora font-bold text-[1.1rem] text-[#111] mb-4">
//                 Related Products
//               </h2>
//               <motion.div
//                 variants={staggerContainer}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true }}
//                 className={`grid gap-3`}
//                 style={{ gridTemplateColumns: `repeat(${relatedCols}, 1fr)` }}
//               >
//                 {related.map((p) => (
//                   <RelatedCard key={p.id} product={p} />
//                 ))}
//               </motion.div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }


import { useState, useMemo, useCallback, useRef, memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, CheckCircle, AlertCircle, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { getProductBySlug, productsData } from '../../data/products.data.js'
import { buildSEO } from '../../seo/seoConfig.js'
import { staggerContainer, staggerItem, fadeUp } from '../../utils/animations.js'
import { useBreakpoint } from '../../hooks/useMediaQuery.js'

// ─── StarRating ───────────────────────────────────────────────────────────────
const STARS = [1, 2, 3, 4, 5]
const StarRating = memo(function StarRating({ value, size = 14 }) {
  return (
    <span className="inline-flex gap-0.5">
      {STARS.map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= Math.round(value) ? '#FF9900' : 'none'}
          color={i <= Math.ceil(value) ? '#FF9900' : '#ddd'}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
})

// ─── ScoreCircle ──────────────────────────────────────────────────────────────
const ScoreCircle = memo(function ScoreCircle({ score }) {
  const R    = 36
  const circ = 2 * Math.PI * R
  const dash = (score / 10) * circ
  return (
    <div className="relative w-[88px] h-[88px] flex-shrink-0">
      <svg width="88" height="88" className="-rotate-90">
        <circle cx="44" cy="44" r={R} fill="none" stroke="#f0f0f0" strokeWidth="5" />
        <circle
          cx="44" cy="44" r={R} fill="none"
          stroke="#FF4500" strokeWidth="5"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-lora font-extrabold text-2xl text-[#111] leading-none">{score}</span>
        <span className="font-inter text-[0.55rem] text-gray-400 uppercase tracking-widest mt-0.5">Expert</span>
      </div>
    </div>
  )
})

// ─── RatingBar ────────────────────────────────────────────────────────────────
const RatingBar = memo(function RatingBar({ star, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="font-inter font-semibold text-[0.72rem] text-gray-600 w-[18px] text-right flex-shrink-0">
        {star}.0
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full bg-[#FF9900] rounded-full"
        />
      </div>
      <span className="font-inter font-medium text-[0.67rem] text-gray-400 w-[55px] flex-shrink-0">
        {count} reviews
      </span>
    </div>
  )
})

// ─── SpecTable ────────────────────────────────────────────────────────────────
const SpecTable = memo(function SpecTable({ specifications }) {
  if (!specifications) {
    return (
      <p className="font-inter font-medium text-gray-400 text-[0.8rem]">No specs available.</p>
    )
  }
  return (
    <div className="space-y-5">
      {Object.entries(specifications).map(([section, fields]) => {
        const fieldEntries = Object.entries(fields)
        return (
          <div key={section}>
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <span className="font-lora font-extrabold text-[0.9rem] text-[#111]">{section}</span>
              </div>
              {fieldEntries.map(([key, val], i) => (
                <div
                  key={key}
                  className={`grid grid-cols-[160px_1fr] ${
                    i < fieldEntries.length - 1 ? 'border-b border-gray-100' : ''
                  } ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <div className="px-4 py-3 font-inter font-semibold text-[0.75rem] text-gray-500 border-r border-gray-100">
                    {key}
                  </div>
                  <div className="px-4 py-3 font-inter font-medium text-[0.75rem] text-[#111]">
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
})

// ─── RelatedCard ──────────────────────────────────────────────────────────────
const RelatedCard = memo(function RelatedCard({ product }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all duration-200 flex flex-col h-full min-h-[320px]">
      {/* Image */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block bg-gray-50 h-[160px] overflow-hidden group"
      >
        {product.discount && (
          <span className="absolute top-2 left-2 z-10 bg-[#FF4500] text-white text-[0.62rem] font-bold px-2 py-0.5 rounded-full">
            {product.discount}% off
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="p-3.5 flex flex-col flex-1">
        <Link to={`/product/${product.slug}`} className="no-underline group">
          <p className="font-bold text-[0.82rem] text-gray-900 leading-snug mb-1 line-clamp-2 min-h-[32px] group-hover:text-[#FF4500] transition-colors">
            {product.name}
          </p>
        </Link>

        {product.tagline && (
          <p className="font-medium text-[0.7rem] text-gray-400 mb-2 line-clamp-1 min-h-[16px]">
            {product.tagline}
          </p>
        )}

        <div className="flex items-center gap-1.5 flex-wrap mb-3">
          <span className="font-extrabold text-[0.95rem] text-gray-900">
            ₹{product.currentPrice?.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="font-medium text-[0.7rem] text-gray-300 line-through">
              ₹{product.originalPrice?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <a
            href={product.dealLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="block w-full text-center bg-[#FF4500] hover:bg-[#CC3700] text-white font-extrabold text-[0.72rem] py-2 rounded-full uppercase tracking-wide transition-colors"
          >
            Grab Deal
          </a>
        </div>
      </div>
    </div>
  )
})

// ─── RelatedCarousel ──────────────────────────────────────────────────────────
const RelatedCarousel = memo(function RelatedCarousel({ related, isMobile }) {
  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft]   = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Card width: mobile = 70vw-ish, tablet = ~240px, desktop = ~260px
  const cardWidth = isMobile ? 200 : 260
  const gap       = 16

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  const scroll = useCallback((dir) => {
    const el = scrollRef.current
    if (!el) return
    const amount = (cardWidth + gap) * (isMobile ? 1 : 2)
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }, [cardWidth, gap, isMobile])

  return (
    <div className="relative">
      {/* Left arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll left"
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10
            w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md
            flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
      )}

      {/* Right arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll right"
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10
            w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md
            flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRight size={16} className="text-gray-600" />
        </button>
      )}

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="flex gap-4 overflow-x-auto pb-2 scroll-smooth"
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          /* hide scrollbar cross-browser */
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {related.map((p) => (
          <div
            key={p.id}
            style={{
              flex: `0 0 ${cardWidth}px`,
              scrollSnapAlign: 'start',
            }}
          >
            <RelatedCard product={p} />
          </div>
        ))}
      </div>

      {/* Hide webkit scrollbar via inline style tag trick */}
      <style>{`.scroll-smooth::-webkit-scrollbar{display:none}`}</style>
    </div>
  )
})

// ─── ImageGallery ─────────────────────────────────────────────────────────────
const ImageGallery = memo(function ImageGallery({ images, name, isMobile }) {
  const [activeImg, setActiveImg] = useState(0)
  return (
    <div>
      <div
        className={`bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center mb-2.5 ${
          isMobile ? 'h-[260px]' : 'h-[360px]'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImg}
            src={images?.[activeImg] ?? images?.[0]}
            alt={name}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </div>
      {images && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`w-[54px] h-[54px] flex-shrink-0 rounded-lg overflow-hidden cursor-pointer p-0 bg-gray-50 transition-all ${
                activeImg === i
                  ? 'border-2 border-[#FF4500]'
                  : 'border-2 border-gray-200 hover:border-gray-400'
              }`}
            >
              <img src={img} alt={`${name} ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
})

// ─── VerdictCard ──────────────────────────────────────────────────────────────
const VerdictCard = memo(function VerdictCard({ verdict, scores, expertScore, isMobile }) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 md:p-7 mb-6">
      <div className={`flex items-start justify-between gap-5 ${isMobile ? 'flex-wrap' : ''}`}>
        <div className="flex-1 min-w-0">
          <h2 className="font-inter font-extrabold text-[0.72rem] text-[#FF4500] tracking-[0.12em] uppercase mb-2.5">
            THE UNFILTERED VERDICT
          </h2>
          <p className="font-inter font-medium text-[0.8rem] text-gray-500 leading-relaxed mb-5">
            {verdict}
          </p>
          <div className="flex gap-5 md:gap-7 flex-wrap">
            {scores?.map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-lora font-extrabold text-[1.3rem] text-[#111] leading-none">
                  {s.value}
                </div>
                <div className="font-inter font-semibold text-[0.62rem] text-gray-400 uppercase tracking-wide mt-0.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {expertScore && !isMobile && <ScoreCircle score={expertScore} />}
      </div>
      {expertScore && isMobile && (
        <div className="flex justify-center mt-4">
          <ScoreCircle score={expertScore} />
        </div>
      )}
    </div>
  )
})

// ─── ProsConsGrid ─────────────────────────────────────────────────────────────
const ProsConsGrid = memo(function ProsConsGrid({ pros, cons, isMobile }) {
  return (
    <div className={`grid gap-3.5 mb-8 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
      <div className="bg-[#f0faf4] border border-[#d0edda] rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle size={15} color="#1a7c3e" />
          <span className="font-lora font-extrabold text-[0.88rem] text-[#1a7c3e]">The Good</span>
        </div>
        {pros?.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <span className="text-[#1a7c3e] flex-shrink-0 mt-0.5 text-sm">•</span>
            <span className="font-inter font-medium text-[0.77rem] text-gray-700 leading-relaxed">{p}</span>
          </div>
        ))}
      </div>

      <div className="bg-[#fff5f0] border border-[#fdd8cc] rounded-xl p-4 md:p-5">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={15} color="#c0392b" />
          <span className="font-lora font-extrabold text-[0.88rem] text-[#c0392b]">The Bad</span>
        </div>
        {cons?.map((c, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <span className="text-[#c0392b] flex-shrink-0 mt-0.5 text-sm">•</span>
            <span className="font-inter font-medium text-[0.77rem] text-gray-700 leading-relaxed">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

// ─── ReviewsSection ───────────────────────────────────────────────────────────
const RATING_STARS = [5, 4, 3, 2, 1]
const ReviewsSection = memo(function ReviewsSection({
  reviews, ratingAvg, ratingCount, ratingBreakdown, isMobile,
}) {
  const totalRatings = useMemo(
    () => ratingBreakdown?.reduce((s, r) => s + r.count, 0) ?? 0,
    [ratingBreakdown],
  )
  return (
    <div className="mb-10">
      <h2 className="font-lora font-extrabold text-[1.1rem] text-[#111] mb-5">Reviews</h2>
      <div className={`grid gap-4 md:gap-9 mb-5 ${isMobile ? 'grid-cols-1' : 'grid-cols-[180px_1fr]'}`}>
        <div>
          <div className="font-lora font-extrabold text-[2.8rem] text-[#111] leading-none">
            {ratingAvg}
          </div>
          <StarRating value={ratingAvg} size={14} />
          <p className="font-inter font-semibold text-[0.7rem] text-gray-400 mt-1">
            {(ratingCount / 1000).toFixed(1)}k Ratings
          </p>
        </div>
        <div className="pt-1">
          {RATING_STARS.map((star) => {
            const row = ratingBreakdown?.find((r) => r.star === star)
            return (
              <RatingBar key={star} star={star} count={row?.count ?? 0} total={totalRatings} />
            )
          })}
        </div>
      </div>

      {reviews?.length > 0 &&
        reviews.map((r) => (
          <div key={r.id} className="border-t border-gray-100 pt-4 pb-4">
            <div className="flex items-start justify-between mb-2 gap-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-[34px] h-[34px] bg-gray-100 rounded-full flex items-center justify-center font-lora font-bold text-[0.85rem] text-gray-500 flex-shrink-0">
                  {r.user.charAt(0)}
                </div>
                <div>
                  <p className="font-inter font-bold text-[0.78rem] text-[#111]">{r.user}</p>
                  <p className="font-inter font-medium text-[0.67rem] text-gray-400">{r.tag} · {r.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="font-inter font-extrabold text-[0.88rem] text-[#111]">{r.rating}.0</span>
                <StarRating value={r.rating} size={12} />
              </div>
            </div>
            <p className="font-inter font-medium text-[0.77rem] text-gray-500 leading-[1.7]">"{r.text}"</p>
          </div>
        ))}
    </div>
  )
})

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function ProductPage() {
  const { slug }                          = useParams()
  const { isMobile, isTablet, isDesktop } = useBreakpoint()
  const [tab, setTab]                     = useState('description')

  const handleTabChange = useCallback((t) => setTab(t), [])

  const product = useMemo(() => getProductBySlug(slug), [slug])

  // No slice limit — carousel handles any number of cards
  const related = useMemo(
    () =>
      product
        ? productsData.filter((p) => p.category === product.category && p.slug !== slug)
        : [],
    [product, slug],
  )

  const seo = useMemo(
    () =>
      product
        ? buildSEO({
            title: `${product.name} Review`,
            description: `${product.name} — Honest expert review, score, pros & cons. ₹${product.currentPrice?.toLocaleString('en-IN')}.`,
            url: `/product/${slug}`,
          })
        : null,
    [product, slug],
  )

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="font-lora font-bold text-[1.1rem] text-[#111]">Product not found</p>
        <Link to="/shop" className="font-inter font-semibold text-[0.8rem] text-[#FF4500]">
          ← Back to Shop
        </Link>
      </div>
    )
  }

  const {
    name, tagline, badge, category, images, currentPrice, originalPrice,
    discount, emiText, dealLink, expertScore, scores, verdictPreview,
    verdict, pros, cons, reviews, ratingAvg, ratingCount, ratingBreakdown, specifications,
  } = product

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name,
            description: tagline,
            offers: {
              '@type': 'Offer',
              price: currentPrice,
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: ratingAvg,
              reviewCount: ratingCount,
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-3.5 md:px-6">

          {/* Breadcrumb */}
          <nav className="font-inter font-medium text-[0.7rem] text-gray-400 py-3.5 flex items-center gap-1.5 flex-wrap">
            <Link to="/" className="text-gray-400 hover:text-gray-600 transition-colors no-underline">
              Home
            </Link>
            <span>/</span>
            <Link
              to={`/category/${category}`}
              className="text-gray-400 hover:text-gray-600 transition-colors capitalize no-underline"
            >
              {category}
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#111] truncate max-w-[180px]">{name}</span>
          </nav>

          {/* Top section — gallery + info */}
          <div className={`grid gap-5 md:gap-11 mb-6 md:mb-9 ${isMobile ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <ImageGallery images={images} name={name} isMobile={isMobile} />

            {/* Info */}
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              {badge && (
                <span className="inline-block font-inter font-extrabold text-[0.63rem] text-[#FF4500] tracking-[0.1em] uppercase mb-2">
                  {badge}
                </span>
              )}
              <h1 className={`font-lora font-extrabold text-[#111] leading-tight mb-1.5 ${isMobile ? 'text-2xl' : 'text-[1.85rem]'}`}>
                {name}
              </h1>
              <p className="font-inter font-medium text-[0.78rem] text-gray-500 mb-4">{tagline}</p>

              {/* Pricing */}
              <div className="flex items-end gap-2.5 mb-1.5 flex-wrap">
                <span className={`font-lora font-extrabold text-[#111] leading-none ${isMobile ? 'text-2xl' : 'text-[1.75rem]'}`}>
                  ₹{currentPrice?.toLocaleString('en-IN')}
                </span>
                {originalPrice && (
                  <span className="font-inter font-semibold text-[0.88rem] text-gray-300 line-through mb-0.5">
                    ₹{originalPrice?.toLocaleString('en-IN')}
                  </span>
                )}
                {discount > 0 && (
                  <span className="font-inter font-extrabold text-[0.82rem] text-[#FF4500] mb-0.5">
                    {discount}% OFF
                  </span>
                )}
              </div>
              {emiText && (
                <p className="font-inter font-medium text-[0.7rem] text-gray-400 mb-4">{emiText}</p>
              )}

              {/* CTA */}
              <a
                href={dealLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#FF4500] hover:bg-[#CC3700] text-white font-inter font-extrabold text-[0.875rem] py-3 rounded-xl no-underline mb-3.5 transition-colors"
              >
                <ShoppingCart size={15} /> Grab Deal
              </a>

              {/* Verdict preview */}
              {verdictPreview && (
                <div className="bg-[#fff8f5] border border-[#ffe0d0] rounded-xl p-3.5">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[0.85rem]">🔍</span>
                    <span className="font-inter font-extrabold text-[0.65rem] text-[#FF4500] uppercase tracking-wide">
                      Unfiltered Verdict Preview
                    </span>
                  </div>
                  <p className="font-inter font-medium text-[0.76rem] text-gray-500 leading-[1.65] italic">
                    {verdictPreview}
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="border-b-2 border-gray-100 flex mb-6">
            {['description', 'specification'].map((t) => (
              <button
                key={t}
                onClick={() => handleTabChange(t)}
                className={`font-inter font-bold capitalize -mb-0.5 transition-all border-b-2 cursor-pointer bg-transparent ${
                  isMobile ? 'text-[0.8rem] px-4 py-2.5' : 'text-[0.875rem] px-6 py-3'
                } ${
                  tab === t
                    ? 'text-[#111] border-[#FF4500]'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {tab === 'description' ? (
              <motion.div
                key="desc"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                <VerdictCard
                  verdict={verdict} scores={scores}
                  expertScore={expertScore} isMobile={isMobile}
                />
                <ProsConsGrid pros={pros} cons={cons} isMobile={isMobile} />
                <ReviewsSection
                  reviews={reviews} ratingAvg={ratingAvg}
                  ratingCount={ratingCount} ratingBreakdown={ratingBreakdown}
                  isMobile={isMobile}
                />
              </motion.div>
            ) : (
              <motion.div
                key="spec"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="mb-10"
              >
                <SpecTable specifications={specifications} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Related products — Carousel */}
          {related.length > 0 && (
            <div className="border-t border-gray-100 pt-7 mb-12">
              <h2 className="font-lora font-extrabold text-[1.1rem] text-[#111] mb-5">
                Related Products
              </h2>
              <RelatedCarousel related={related} isMobile={isMobile} />
            </div>
          )}

        </div>
      </div>
    </>
  )
}