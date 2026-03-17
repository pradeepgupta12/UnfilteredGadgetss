// // pages/Blog/BlogDetailPage.jsx
// import { useMemo, memo } from 'react'
// import { Helmet }     from 'react-helmet-async'
// import { Link, useParams } from 'react-router-dom'
// import { motion }     from 'framer-motion'
// import { getBlogBySlug, getRelatedBlogs } from '../../data/blogs.data.js'
// import { buildSEO }   from '../../seo/seoConfig.js'
// import { useBreakpoint } from '../../hooks/useMediaQuery.js'
// import { fadeUp, staggerContainer, staggerItem } from '../../utils/animations.js'

// const CAT_MAP = {
//   'Reviews':        '#FF4500',
//   'Comparisons':    '#2563eb',
//   'Buying Guides':  '#16a34a',
//   'Tech Explained': '#7c3aed',
// }
// const catColor = (c) => CAT_MAP[c] ?? '#555'

// // ─── Related card ─────────────────────────────────────────────────────────────
// const RelatedCard = memo(function RelatedCard({ blog }) {
//   return (
//     <motion.article variants={staggerItem}
//       style={{
//         background: '#fff', border: '1px solid #eaeaea',
//         borderRadius: 10, overflow: 'hidden',
//       }}
//       whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}
//     >
//       {/* thumb */}
//       <div style={{
//         position: 'relative', height: 148,
//         overflow: 'hidden', background: '#f5f5f5', flexShrink: 0,
//       }}>
//         <span style={{
//           position: 'absolute', top: 8, left: 8, zIndex: 10,
//           background: catColor(blog.category), color: '#fff',
//           fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 700,
//           padding: '3px 8px', borderRadius: 4,
//           textTransform: 'uppercase', letterSpacing: '0.05em',
//           whiteSpace: 'nowrap', boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
//         }}>{blog.category}</span>
//         <Link to={`/blog/${blog.slug}`} style={{ display: 'block', height: '100%' }}>
//           <img src={blog.image} alt={blog.title} loading="lazy"
//             style={{ width: '100%', height: '100%', objectFit: 'cover',
//               display: 'block', transition: 'transform 0.4s' }}
//             onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
//             onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
//           />
//         </Link>
//       </div>

//       {/* body */}
//       <div style={{ padding: '12px 13px 14px' }}>
//         <Link to={`/blog/${blog.slug}`} style={{ textDecoration: 'none' }}>
//           <h4 style={{
//             fontFamily: 'Inter, sans-serif', fontWeight: 600,
//             fontSize: '0.78rem', color: '#111',
//             lineHeight: 1.5, marginBottom: 6,
//             display: '-webkit-box', WebkitLineClamp: 2,
//             WebkitBoxOrient: 'vertical', overflow: 'hidden',
//           }}>{blog.title}</h4>
//         </Link>
//         <p style={{
//           fontFamily: 'Inter, sans-serif', fontSize: '0.71rem', color: '#888',
//           lineHeight: 1.58, marginBottom: 10,
//           display: '-webkit-box', WebkitLineClamp: 2,
//           WebkitBoxOrient: 'vertical', overflow: 'hidden',
//         }}>{blog.excerpt}</p>
//         <div style={{
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//           borderTop: '1px solid #f5f5f5', paddingTop: 8,
//         }}>
//           <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.66rem', color: '#bbb' }}>
//             By {blog.author.name} · {blog.dateShort}
//           </span>
//           <Link to={`/blog/${blog.slug}`}
//             style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
//               fontWeight: 600, color: '#FF4500', textDecoration: 'none' }}>
//             Read More →
//           </Link>
//         </div>
//       </div>
//     </motion.article>
//   )
// })

// // ─── MAIN PAGE ────────────────────────────────────────────────────────────────
// export default function BlogDetailPage() {
//   const { slug } = useParams()
//   const { isMobile } = useBreakpoint()

//   const blog    = useMemo(() => getBlogBySlug(slug), [slug])
//   const related = useMemo(() => getRelatedBlogs(slug, 3), [slug])

//   const seo = useMemo(() => blog
//     ? buildSEO({ title: blog.title, description: blog.excerpt, url: `/blog/${slug}` })
//     : buildSEO({ title: 'Blog Not Found', url: '/blogs' }),
//     [blog, slug]
//   )

//   if (!blog) {
//     return (
//       <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center',
//         justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
//         <p style={{ fontFamily: 'Lora, Georgia, serif', fontSize: '1.2rem', color: '#111' }}>
//           Post not found
//         </p>
//         <Link to="/blogs" style={{ fontFamily: 'Inter, sans-serif',
//           color: '#FF4500', fontWeight: 600, fontSize: '0.85rem' }}>
//           ← Back to Blogs
//         </Link>
//       </div>
//     )
//   }

//   const px = isMobile ? '14px' : '24px'

//   return (
//     <>
//       <Helmet>
//         <title>{seo.title}</title>
//         <meta name="description"    content={seo.description} />
//         <link rel="canonical"       href={seo.canonical} />
//         <meta property="og:title"   content={blog.title} />
//         <meta property="og:description" content={blog.excerpt} />
//         <meta property="og:image"   content={blog.image} />
//         <meta property="og:type"    content="article" />
//         <script type="application/ld+json">{JSON.stringify({
//           '@context': 'https://schema.org', '@type': 'Article',
//           headline: blog.title, description: blog.excerpt,
//           image: blog.image, datePublished: blog.date,
//           author: { '@type': 'Person', name: blog.author.name },
//         })}</script>
//       </Helmet>

//       <div style={{ minHeight: '100vh', background: '#fff' }}>
//         {/* Max-width container — single column article layout */}
//         <div style={{
//           maxWidth: 1200, margin: '0 auto',
//           padding: `0 ${px} 72px`,
//         }}>

//           {/* Breadcrumb */}
//           <nav style={{
//             fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#bbb',
//             padding: '14px 0 20px',
//             display: 'flex', gap: 5, alignItems: 'center',
//           }}>
//             <Link to="/"      style={{ color: '#bbb', textDecoration: 'none' }}>Home</Link>
//             <span>/</span>
//             <Link to="/blogs" style={{ color: '#bbb', textDecoration: 'none' }}>Blogs</Link>
//           </nav>

//           <motion.article initial="hidden" animate="visible" variants={fadeUp}>

//             {/* Hero image — full width */}
//             <div style={{
//               borderRadius: 14, overflow: 'hidden',
//               height: isMobile ? 220 : 380,
//               marginBottom: 24,
//             }}>
//               <img src={blog.image} alt={blog.title}
//                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
//             </div>

//             {/* Author + date row */}
//             <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
//               <img src={blog.author.avatar} alt={blog.author.name}
//                 style={{ width: 30, height: 30, borderRadius: '50%',
//                   objectFit: 'cover', flexShrink: 0 }} />
//               <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.76rem', color: '#888' }}>
//                 {blog.date}
//               </span>
//             </div>

//             {/* Category badge */}
//             <span style={{
//               display: 'inline-block',
//               background: catColor(blog.category), color: '#fff',
//               fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700,
//               padding: '3px 10px', borderRadius: 4,
//               textTransform: 'uppercase', letterSpacing: '0.08em',
//               marginBottom: 14,
//             }}>{blog.category}</span>

//             {/* Title */}
//             <h1 style={{
//               fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//               fontSize: isMobile ? '1.45rem' : '1.85rem',
//               color: '#111', lineHeight: 1.28, marginBottom: 14,
//             }}>{blog.title}</h1>

//             {/* Lead excerpt */}
//             <p style={{
//               fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
//               color: '#555', lineHeight: 1.78, marginBottom: 28,
//             }}>{blog.excerpt}</p>

//             {/* Body paragraphs */}
//             <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 24 }}>
//               {blog.body.map((para, i) => (
//                 <p key={i} style={{
//                   fontFamily: 'Inter, sans-serif',
//                   fontSize: isMobile ? '0.86rem' : '0.89rem',
//                   color: '#333', lineHeight: 1.88,
//                   marginBottom: i < blog.body.length - 1 ? 20 : 0,
//                   ...(i === 2 ? { paddingLeft: 20 } : {}),
//                 }}>{para}</p>
//               ))}
//             </div>

//             {/* Related blogs */}
//             <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #f0f0f0' }}>
//               <h2 style={{
//                 fontFamily: 'Lora, Georgia, serif', fontWeight: 700,
//                 fontSize: '1.05rem', color: '#111', marginBottom: 18,
//               }}>Related Blogs</h2>

//               <motion.div
//                 variants={staggerContainer} initial="hidden"
//                 whileInView="visible" viewport={{ once: true }}
//                 style={{
//                   display: 'grid',
//                   gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
//                   gap: 14,
//                 }}
//               >
//                 {related.map(b => <RelatedCard key={b.id} blog={b} />)}
//               </motion.div>
//             </div>

//           </motion.article>
//         </div>
//       </div>
//     </>
//   )
// }

/// pages/Blog/BlogDetailPage.jsx
import { useMemo, memo } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getBlogBySlug, getRelatedBlogs } from '../../data/blogs.data.js'
import { buildSEO } from '../../seo/seoConfig.js'
import { useBreakpoint } from '../../hooks/useMediaQuery.js'
import { fadeUp, staggerContainer, staggerItem } from '../../utils/animations.js'

const CAT_MAP = {
  'Reviews': '#FF4500',
  'Comparisons': '#2563eb',
  'Buying Guides': '#16a34a',
  'Tech Explained': '#7c3aed',
}
const catColor = (c) => CAT_MAP[c] ?? '#555'

// ─── Related card ─────────────────────────────────────────────────────────────
const RelatedCard = memo(function RelatedCard({ blog }) {
  return (
    <motion.article
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-lg overflow-hidden min-h-[320px] flex flex-col"
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}
    >
      {/* thumb */}
      <div className="relative h-[148px] overflow-hidden bg-gray-100 flex-shrink-0">
        <span
          className="absolute top-2 left-2 z-10 text-white font-inter font-bold text-[0.58rem] px-2 py-[3px] rounded uppercase tracking-wider shadow-sm"
          style={{ background: catColor(blog.category) }}
        >
          {blog.category}
        </span>
        <Link to={`/blog/${blog.slug}`} className="block h-full">
          <img
            src={blog.image}
            alt={blog.title}
            loading="lazy"
            className="w-full h-full object-cover block transition-transform duration-400 hover:scale-104"
          />
        </Link>
      </div>

      {/* body */}
      <div className="p-3 pb-3.5 flex-1 flex flex-col">
        <Link to={`/blog/${blog.slug}`} className="no-underline">
          <h4 className="font-inter font-semibold text-[0.78rem] text-gray-900 leading-relaxed mb-1.5 line-clamp-2">
            {blog.title}
          </h4>
        </Link>
        <p className="font-inter text-[0.71rem] font-medium text-gray-600 leading-relaxed mb-2.5 line-clamp-2 flex-1">
          {blog.excerpt}
        </p>
        <div className="flex items-center justify-between border-t border-gray-100 pt-2">
          <span className="font-inter text-[0.66rem] font-medium text-gray-500">
            By {blog.author.name} · {blog.dateShort}
          </span>
          <Link
            to={`/blog/${blog.slug}`}
            className="font-inter text-[0.7rem] font-semibold text-[#FF4500] no-underline hover:underline"
          >
            Read More →
          </Link>
        </div>
      </div>
    </motion.article>
  )
})

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BlogDetailPage() {
  const { slug } = useParams()
  const { isMobile } = useBreakpoint()

  const blog = useMemo(() => getBlogBySlug(slug), [slug])
  const related = useMemo(() => getRelatedBlogs(slug, 3), [slug])

  const seo = useMemo(
    () =>
      blog
        ? buildSEO({ title: blog.title, description: blog.excerpt, url: `/blog/${slug}` })
        : buildSEO({ title: 'Blog Not Found', url: '/blogs' }),
    [blog, slug]
  )

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4">
        <p className="font-lora text-xl font-medium text-gray-900">Post not found</p>
        <Link to="/blogs" className="font-inter text-[#FF4500] font-semibold text-sm hover:underline">
          ← Back to Blogs
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: blog.title,
            description: blog.excerpt,
            image: blog.image,
            datePublished: blog.date,
            author: { '@type': 'Person', name: blog.author.name },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Max-width container — single column article layout */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 pb-[72px]">
          {/* Breadcrumb */}
          <nav className="font-inter text-xs md:text-sm font-medium text-gray-500 py-3.5 md:py-5 flex gap-1 items-center">
            <Link to="/" className="text-gray-500 no-underline hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-500">/</span>
            <Link to="/blogs" className="text-gray-500 no-underline hover:text-gray-700">
              Blogs
            </Link>
          </nav>

          <motion.article initial="hidden" animate="visible" variants={fadeUp}>
            {/* Hero image — full width */}
            <div
              className={`rounded-lg md:rounded-xl overflow-hidden mb-6 ${
                isMobile ? 'h-[220px]' : 'h-[380px]'
              }`}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover block"
              />
            </div>

            {/* Author + date row */}
            <div className="flex items-center gap-2.5 mb-3.5">
              <img
                src={blog.author.avatar}
                alt={blog.author.name}
                className="w-7 h-7 md:w-[30px] md:h-[30px] rounded-full object-cover flex-shrink-0"
              />
              <span className="font-inter text-sm md:text-base font-medium text-gray-600">
                {blog.date}
              </span>
            </div>

            {/* Category badge */}
            <span
              className="inline-block text-white font-inter font-bold text-xs md:text-sm px-2.5 py-[3px] rounded uppercase tracking-wider mb-3.5"
              style={{ background: catColor(blog.category) }}
            >
              {blog.category}
            </span>

            {/* Title */}
            <h1 className="font-lora font-bold text-2xl md:text-3xl text-gray-900 leading-tight mb-3.5">
              {blog.title}
            </h1>

            {/* Lead excerpt */}
            <p className="font-inter text-sm md:text-base font-medium text-gray-700 leading-relaxed mb-7">
              {blog.excerpt}
            </p>

            {/* Body paragraphs */}
            <div className="border-t border-gray-100 pt-6">
              {blog.body.map((para, i) => (
                <p
                  key={i}
                  className={`font-inter text-sm md:text-base font-[450] text-gray-800 leading-relaxed ${
                    i < blog.body.length - 1 ? 'mb-5' : ''
                  } ${i === 2 ? 'pl-5' : ''}`}
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Related blogs */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <h2 className="font-lora font-bold text-base md:text-lg text-gray-900 mb-4">
                Related Blogs
              </h2>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className={`grid gap-3.5 ${
                  isMobile ? 'grid-cols-1' : 'grid-cols-3'
                }`}
              >
                {related.map((b) => (
                  <RelatedCard key={b.id} blog={b} />
                ))}
              </motion.div>
            </div>
          </motion.article>
        </div>
      </div>
    </>
  )
}