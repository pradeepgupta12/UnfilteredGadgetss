// // pages/Blog/BlogListPage.jsx
// import { useState, useMemo, useCallback, memo } from 'react'
// import { Helmet }        from 'react-helmet-async'
// import { Link }          from 'react-router-dom'
// import { motion }        from 'framer-motion'
// import { ArrowRight }    from 'lucide-react'
// import { blogsData, BLOG_CATEGORIES } from '../../data/blogs.data.js'
// import { buildSEO }      from '../../seo/seoConfig.js'
// import { useBreakpoint } from '../../hooks/useMediaQuery.js'
// import { staggerContainer, staggerItem, fadeUp } from '../../utils/animations.js'

// // Mobile header: offer-bar(28) + navbar(56) = 84px  (no category bar on mobile)
// // Desktop header: offer-bar(28) + navbar(56) + cat-bar(36) = 120px
// const FILTER_TOP_MOBILE  = 84
// const FILTER_TOP_DESKTOP = 120
// const FILTER_BAR_H       = 53   // filter bar height
// const SUBSCRIBE_TOP      = FILTER_TOP_DESKTOP + FILTER_BAR_H + 12

// const CAT_MAP = {
//   'Reviews':        '#FF4500',
//   'Comparisons':    '#2563eb',
//   'Buying Guides':  '#16a34a',
//   'Tech Explained': '#7c3aed',
// }
// const catColor = (c) => CAT_MAP[c] ?? '#555'

// // ─── Category filter bar ──────────────────────────────────────────────────────
// const FilterBar = memo(function FilterBar({ active, onSelect, isMobile }) {
//   return (
//     <div style={{
//       position: 'sticky',
//       // correct top per breakpoint — so heading doesn't slide under header
//       top: isMobile ? FILTER_TOP_MOBILE : FILTER_TOP_DESKTOP,
//       zIndex: 30,
//       background: '#fff',
//       borderBottom: '1px solid #f0f0f0',
//       paddingTop: 10,
//       paddingBottom: 12,
//       marginBottom: 28,
//     }}>
//       <div
//         className="scroll-hide"
//         style={{
//           display: 'flex',
//           gap: 8,
//           flexWrap: 'nowrap',
//           overflowX: 'auto',
//           WebkitOverflowScrolling: 'touch',
//           paddingBottom: 2,
//         }}
//       >
//         {BLOG_CATEGORIES.map(cat => (
//           <button key={cat} onClick={() => onSelect(cat)} style={{
//             fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 500,
//             padding: '5px 16px', borderRadius: 999, cursor: 'pointer', outline: 'none',
//             flexShrink: 0,
//             whiteSpace: 'nowrap',
//             border: `1.5px solid ${active === cat ? '#FF4500' : '#e0e0e0'}`,
//             background: active === cat ? '#FF4500' : '#fff',
//             color: active === cat ? '#fff' : '#555',
//             transition: 'all 0.18s',
//           }}>{cat}</button>
//         ))}
//       </div>
//     </div>
//   )
// })

// // ─── Featured hero — FULL WIDTH ───────────────────────────────────────────────
// const FeaturedCard = memo(function FeaturedCard({ blog }) {
//   const { isMobile } = useBreakpoint()
//   return (
//     <motion.div variants={fadeUp} initial="hidden" animate="visible"
//       style={{
//         display: 'grid',
//         gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
//         border: '1px solid #e8e8e8',
//         borderRadius: 14,
//         overflow: 'hidden',
//         marginBottom: 32,
//         boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
//         width: '100%',
//       }}
//     >
//       <div style={{ height: isMobile ? 200 : 280, overflow: 'hidden' }}>
//         <img src={blog.image} alt={blog.title} style={{
//           width: '100%', height: '100%', objectFit: 'cover', display: 'block',
//           transition: 'transform 0.5s',
//         }}
//           onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
//           onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//         />
//       </div>
//       <div style={{
//         padding: isMobile ? '20px 18px 24px' : '28px 32px',
//         display: 'flex', flexDirection: 'column', justifyContent: 'center',
//       }}>
//         <span style={{
//           display: 'inline-block', alignSelf: 'flex-start',
//           background: catColor(blog.category), color: '#fff',
//           fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700,
//           padding: '3px 9px', borderRadius: 4,
//           textTransform: 'uppercase', letterSpacing: '0.07em',
//           marginBottom: 12, whiteSpace: 'nowrap',
//         }}>{blog.category}</span>

//         <h2 style={{
//           fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//           fontSize: isMobile ? '1.2rem' : '1.5rem',
//           color: '#111', lineHeight: 1.28, marginBottom: 10,
//         }}>{blog.title}</h2>

//         <p style={{
//           fontFamily: 'Inter, sans-serif', fontSize: '0.81rem', color: '#666',
//           lineHeight: 1.7, marginBottom: 20,
//           display: '-webkit-box', WebkitLineClamp: 3,
//           WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{blog.excerpt}</p>

//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//             <img src={blog.author.avatar} alt={blog.author.name}
//               style={{ width: 26, height: 26, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
//             <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#777' }}>
//               {blog.author.name} · {blog.date}
//             </span>
//           </div>
//           <Link to={`/blog/${blog.slug}`} style={{
//             display: 'inline-flex', alignItems: 'center', gap: 4,
//             fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.78rem',
//             color: '#FF4500', textDecoration: 'none',
//           }}>Read Article <ArrowRight size={12} /></Link>
//         </div>
//       </div>
//     </motion.div>
//   )
// })

// // ─── Blog card ────────────────────────────────────────────────────────────────
// const BlogCard = memo(function BlogCard({ blog }) {
//   return (
//     <motion.article variants={staggerItem}
//       style={{
//         background: '#fff', border: '1px solid #eaeaea',
//         borderRadius: 12, overflow: 'hidden',
//         display: 'flex', flexDirection: 'column',
//       }}
//       whileHover={{ y: -4, boxShadow: '0 10px 28px rgba(0,0,0,0.09)' }}
//       transition={{ duration: 0.2 }}
//     >
//       <div style={{ position: 'relative', height: 168, flexShrink: 0 }}>
//         <span style={{
//           position: 'absolute', top: 10, left: 10, zIndex: 10,
//           background: catColor(blog.category), color: '#fff',
//           fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700,
//           padding: '3px 9px', borderRadius: 4,
//           textTransform: 'uppercase', letterSpacing: '0.05em',
//           whiteSpace: 'nowrap', boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
//           pointerEvents: 'none',
//         }}>{blog.category}</span>
//         <Link to={`/blog/${blog.slug}`}
//           style={{ display: 'block', height: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
//           <img src={blog.image} alt={blog.title} loading="lazy" style={{
//             width: '100%', height: '100%', objectFit: 'cover', display: 'block',
//             transition: 'transform 0.4s',
//           }}
//             onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//           />
//         </Link>
//       </div>
//       <div style={{ padding: '14px 15px 15px', flex: 1, display: 'flex', flexDirection: 'column' }}>
//         <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
//           <h3 style={{
//             fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.83rem',
//             color: '#111', lineHeight: 1.52, marginBottom: 7,
//             display: '-webkit-box', WebkitLineClamp: 3,
//             WebkitBoxOrient: 'vertical', overflow: 'hidden',
//           }}>{blog.title}</h3>
//         </Link>
//         <p style={{
//           fontFamily: 'Inter, sans-serif', fontSize: '0.73rem', color: '#888',
//           lineHeight: 1.6, marginBottom: 12, flex: 1,
//           display: '-webkit-box', WebkitLineClamp: 2,
//           WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{blog.excerpt}</p>
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           borderTop: '1px solid #f0f0f0', paddingTop: 10,
//         }}>
//           <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#bbb' }}>
//             By {blog.author.name} · {blog.dateShort}
//           </span>
//           <Link to={`/blog/${blog.slug}`} style={{
//             fontFamily: 'Inter, sans-serif', fontSize: '0.71rem',
//             fontWeight: 600, color: '#FF4500', textDecoration: 'none',
//           }}>Read More →</Link>
//         </div>
//       </div>
//     </motion.article>
//   )
// })

// // ─── Subscribe card ───────────────────────────────────────────────────────────
// const SubscribeSidebar = memo(function SubscribeSidebar({ sticky, stickyTop }) {
//   const [email, setEmail] = useState('')
//   return (
//     <div style={{
//       position: sticky ? 'sticky' : 'static',
//       top: sticky ? stickyTop : 'auto',
//       maxHeight: sticky ? `calc(100vh - ${stickyTop + 24}px)` : 'none',
//       background: '#FF4500', borderRadius: 14, padding: '24px 20px',
//     }}>
//       <h3 style={{
//         fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//         fontSize: '1rem', color: '#fff', marginBottom: 8, lineHeight: 1.3,
//       }}>Subscribe to the Lab</h3>
//       <p style={{
//         fontFamily: 'Inter, sans-serif', fontSize: '0.74rem',
//         color: 'rgba(255,255,255,0.88)', lineHeight: 1.65, marginBottom: 16,
//       }}>
//         Get our weekly "No-BS" tech roundup. No ads, just raw data.
//       </p>
//       <input type="email" placeholder="Your best email"
//         value={email} onChange={e => setEmail(e.target.value)}
//         style={{
//           width: '100%', padding: '9px 12px', borderRadius: 8, border: 'none',
//           fontFamily: 'Inter, sans-serif', fontSize: '0.77rem',
//           marginBottom: 9, outline: 'none', boxSizing: 'border-box', color: '#111',
//         }}
//       />
//       <button style={{
//         width: '100%', background: '#fff', color: '#FF4500',
//         fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '0.8rem',
//         padding: '9px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
//       }}>Join the Insiders</button>
//       <p style={{
//         fontFamily: 'Inter, sans-serif', fontSize: '0.61rem',
//         color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 8,
//       }}>No spam. Unsubscribe anytime.</p>
//     </div>
//   )
// })

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function BlogListPage() {
//   const [activeCategory, setActiveCategory] = useState('All')
//   const { isMobile } = useBreakpoint()

//   const featured  = useMemo(() => blogsData.find(b => b.featured), [])
//   const gridBlogs = useMemo(() => {
//     const rest = blogsData.filter(b => !b.featured)
//     return activeCategory === 'All' ? rest : rest.filter(b => b.category === activeCategory)
//   }, [activeCategory])

//   const handleCat = useCallback(cat => setActiveCategory(cat), [])
//   const seo = buildSEO({ title: 'Unfiltered Blogs', url: '/blogs' })

//   // Subscribe sticky top = just below the filter bar
//   const subscribeStickyTop = SUBSCRIBE_TOP

//   return (
//     <>
//       <Helmet>
//         <title>{seo.title}</title>
//         <meta name="description" content="Honest takes, deep dives, and zero fluff." />
//         <link rel="canonical" href={seo.canonical} />
//       </Helmet>

//       <div style={{ minHeight: '100vh', background: '#fff' }}>
//         <div style={{
//           maxWidth: 1200, margin: '0 auto',
//           padding: isMobile ? '24px 14px 48px' : '36px 24px 64px',
//         }}>

//           {/* Heading — NOT sticky, scrolls away normally */}
//           <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
//             <h1 style={{
//               fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//               fontSize: isMobile ? '1.65rem' : '2.1rem', color: '#111', marginBottom: 4,
//             }}>Unfiltered Blogs</h1>
//             <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.83rem', color: '#999', marginBottom: 0 }}>
//               Honest takes, deep dives, and zero fluff.
//             </p>
//           </motion.div>

//           {/* Sticky filter bar — correct top per device */}
//           <FilterBar active={activeCategory} onSelect={handleCat} isMobile={isMobile} />

//           {/* Featured: FULL WIDTH */}
//           {activeCategory === 'All' && featured && (
//             <FeaturedCard blog={featured} />
//           )}

//           {/* Section heading */}
//           <h2 style={{
//             fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//             fontSize: '1.1rem', color: '#111', marginBottom: 20,
//           }}>
//             {activeCategory === 'All' ? 'Recent Insights' : activeCategory}
//           </h2>

//           {/* Mobile layout */}
//           {isMobile ? (
//             <>
//               {gridBlogs.length === 0
//                 ? <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#bbb', padding: '32px 0' }}>
//                     No posts in this category yet.
//                   </p>
//                 : (
//                   <motion.div variants={staggerContainer} initial="hidden" animate="visible"
//                     style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}
//                   >
//                     {gridBlogs.map(b => <BlogCard key={b.id} blog={b} />)}
//                   </motion.div>
//                 )
//               }
//               <div style={{ marginTop: 36 }}>
//                 <SubscribeSidebar sticky={false} />
//               </div>
//             </>
//           ) : (
//             // Desktop: subscribe LEFT (sticky) | 2-col cards RIGHT
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: '230px 1fr',
//               gap: 28,
//               alignItems: 'flex-start',
//             }}>
//               <SubscribeSidebar sticky stickyTop={subscribeStickyTop} />

//               {gridBlogs.length === 0
//                 ? <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#bbb', padding: '32px 0' }}>
//                     No posts in this category yet.
//                   </p>
//                 : (
//                   <motion.div variants={staggerContainer} initial="hidden" animate="visible"
//                     style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}
//                   >
//                     {gridBlogs.map(b => <BlogCard key={b.id} blog={b} />)}
//                   </motion.div>
//                 )
//               }
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }


// pages/Blog/BlogListPage.jsx
import { useState, useMemo, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { blogsData, BLOG_CATEGORIES } from "../../data/blogs.data.js";
import { buildSEO } from "../../seo/seoConfig.js";
import { useBreakpoint } from "../../hooks/useMediaQuery.js";
import {
  staggerContainer,
  staggerItem,
  fadeUp,
} from "../../utils/animations.js";

const FILTER_TOP_MOBILE = 84;
const FILTER_TOP_DESKTOP = 120;
const FILTER_BAR_H = 53;
const SUBSCRIBE_TOP = FILTER_TOP_DESKTOP + FILTER_BAR_H + 12;

const CAT_MAP = {
  Reviews: "#FF4500",
  Comparisons: "#2563eb",
  "Buying Guides": "#16a34a",
  "Tech Explained": "#7c3aed",
};

const catColor = (c) => CAT_MAP[c] ?? "#555";


// ─── Filter Bar ─────────────────────────────

const FilterBar = memo(function FilterBar({ active, onSelect, isMobile }) {
  return (
    <div
      className="sticky z-30 bg-white border-b border-gray-200 pt-2 pb-3 mb-7"
      style={{ top: isMobile ? FILTER_TOP_MOBILE : FILTER_TOP_DESKTOP }}
    >
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scroll-hide">
        {BLOG_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            className={`text-xs px-4 py-1.5 rounded-full border transition font-semibold
            ${
              active === cat
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
});


// ─── Featured Card ──────────────────────────

const FeaturedCard = memo(function FeaturedCard({ blog }) {
  const { isMobile } = useBreakpoint();

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      className="grid border rounded-xl overflow-hidden shadow-md mb-8 w-full
      md:grid-cols-2"
    >
      <div className={`${isMobile ? "h-[200px]" : "h-[280px]"} overflow-hidden`}>
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="flex flex-col justify-center p-6 md:p-8">
        <span
          className="text-[10px] font-bold text-white px-2 py-1 rounded uppercase tracking-wide mb-3 inline-block w-fit"
          style={{ background: catColor(blog.category) }}
        >
          {blog.category}
        </span>

        <h2 className="font-serif text-xl md:text-2xl font-extrabold text-gray-900 leading-snug mb-2">
          {blog.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <img
              src={blog.author.avatar}
              alt={blog.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-500 font-medium">
              {blog.author.name} · {blog.date}
            </span>
          </div>

          <Link
            to={`/blog/${blog.slug}`}
            className="flex items-center gap-1 text-orange-500 text-sm font-bold"
          >
            Read Article <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
});


// ─── Blog Card ──────────────────────────────

const BlogCard = memo(function BlogCard({ blog }) {
  return (
    <motion.article
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col
      hover:-translate-y-1 hover:shadow-xl transition"
    >
      <div className="relative h-[168px]">
        <span
          className="absolute top-2 left-2 z-10 text-[10px] font-bold text-white px-2 py-1 rounded uppercase shadow"
          style={{ background: catColor(blog.category) }}
        >
          {blog.category}
        </span>

        <Link to={`/blog/${blog.slug}`} className="block h-full">
          <img
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <Link to={`/blog/${blog.slug}`}>
          <h3 className="font-bold text-sm text-gray-900 leading-snug mb-2 line-clamp-3">
            {blog.title}
          </h3>
        </Link>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between border-t pt-2">
          <span className="text-[11px] text-gray-400 font-medium">
            By {blog.author.name} · {blog.dateShort}
          </span>

          <Link
            to={`/blog/${blog.slug}`}
            className="text-xs font-bold text-orange-500"
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.article>
  );
});


// ─── Subscribe Sidebar ──────────────────────

const SubscribeSidebar = memo(function SubscribeSidebar({
  sticky,
  stickyTop,
}) {
  const [email, setEmail] = useState("");

  return (
    <div
      className="bg-orange-500 rounded-xl p-6"
      style={{
        position: sticky ? "sticky" : "static",
        top: sticky ? stickyTop : "auto",
      }}
    >
      <h3 className="font-serif font-extrabold text-white text-lg mb-2">
        Subscribe to the Lab
      </h3>

      <p className="text-sm text-white/90 mb-4">
        Get our weekly "No-BS" tech roundup. No ads, just raw data.
      </p>

      <input
        type="email"
        placeholder="Your best email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 rounded-md text-sm mb-2 text-gray-900 outline-none"
      />

      <button className="w-full bg-white text-orange-500 font-bold py-2 rounded-md text-sm">
        Join the Insiders
      </button>

      <p className="text-[11px] text-white/70 text-center mt-2">
        No spam. Unsubscribe anytime.
      </p>
    </div>
  );
});


// ─── MAIN PAGE ──────────────────────────────

export default function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { isMobile } = useBreakpoint();

  const featured = useMemo(() => blogsData.find((b) => b.featured), []);

  const gridBlogs = useMemo(() => {
    const rest = blogsData.filter((b) => !b.featured);
    return activeCategory === "All"
      ? rest
      : rest.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  const handleCat = useCallback((cat) => setActiveCategory(cat), []);

  const seo = buildSEO({
    title: "Unfiltered Blogs",
    url: "/blogs",
  });

  const subscribeStickyTop = SUBSCRIBE_TOP;

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta
          name="description"
          content="Honest takes, deep dives, and zero fluff."
        />
        <link rel="canonical" href={seo.canonical} />
      </Helmet>

      <div className="min-h-screen bg-white">
        <div className="max-w-[1200px] mx-auto px-4 py-10">

          <div>
            <h1 className="font-serif text-3xl font-extrabold text-gray-900 mb-1">
              Unfiltered Blogs
            </h1>
            <p className="text-sm text-gray-500">
              Honest takes, deep dives, and zero fluff.
            </p>
          </div>

          <FilterBar
            active={activeCategory}
            onSelect={handleCat}
            isMobile={isMobile}
          />

          {activeCategory === "All" && featured && (
            <FeaturedCard blog={featured} />
          )}

          <h2 className="font-serif font-bold text-lg mb-5">
            {activeCategory === "All"
              ? "Recent Insights"
              : activeCategory}
          </h2>

          {isMobile ? (
            <>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-4"
              >
                {gridBlogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </motion.div>

              <div className="mt-10">
                <SubscribeSidebar sticky={false} />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-[230px_1fr] gap-7">
              <SubscribeSidebar sticky stickyTop={subscribeStickyTop} />

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-5"
              >
                {gridBlogs.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}