// // components/cards/ProductCard.jsx
// import { motion } from 'framer-motion'
// import { staggerItem } from '../../utils/animations.js'

// export default function ProductCard({ product }) {
//   const { name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, pros, cons, dealLink, badge } = product

//   return (
//     <motion.div variants={staggerItem}
//       style={{
//         background: '#fff', border: '1px solid #e8e8e8', borderRadius: 10,
//         overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s',
//       }}
//       whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}
//     >
//       {/* Image area */}
//       <div style={{ position: 'relative', background: '#f8f8f8', height: 168, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 16px' }}>
//         {discount && (
//           <span style={{
//             position: 'absolute', top: 8, left: 8, zIndex: 10,
//             background: '#FF4500', color: '#fff',
//             fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 600,
//             padding: '2px 7px', borderRadius: 4,
//           }}>
//             {discount}% off
//           </span>
//         )}
      
//         <img
//           src={image}
//           alt={name}
//           loading="lazy"
//           style={{ maxHeight: 130, maxWidth: '100%', objectFit: 'contain', position: 'relative', zIndex: 1 }}
//         />
//       </div>

//       {/* Content */}
//       <div style={{ padding: '12px 14px 14px' }}>
//         <h3 style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 600, fontSize: '0.8125rem', color: '#111', lineHeight: 1.35, marginBottom: 2 }}>
//           {name}
//         </h3>
//         <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#aaa', marginBottom: 8 }}>{tagline}</p>

//         {/* Pros / cons */}
      

//         {/* Price row */}
//         <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
//           <span style={{ fontFamily: 'Lora, Georgia, serif', fontWeight: 700, fontSize: '1rem', color: '#111' }}>
//             ₹{currentPrice?.toLocaleString('en-IN')}
//           </span>
//           {originalPrice && (
//             <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#bbb', textDecoration: 'line-through' }}>
//               ₹{originalPrice?.toLocaleString('en-IN')}
//             </span>
//           )}
//           {savingsLabel && (
//             <span style={{
//               background: '#e6f7ed', color: '#1a7c3e',
//               fontFamily: 'Inter, sans-serif', fontSize: '0.6875rem', fontWeight: 600,
//               padding: '2px 7px', borderRadius: 4,
//             }}>{savingsLabel}</span>
//           )}
//         </div>

//         <a href={dealLink} target="_blank" rel="noopener noreferrer"
//           style={{
//             display: 'block', width: '100%', textAlign: 'center',
//             background: '#FF4500', color: '#fff',
//             fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '0.75rem',
//             padding: '7px 0', borderRadius: 999, textDecoration: 'none',
//             textTransform: 'uppercase', letterSpacing: '0.04em',
//           }}
//         >
//           GRAB DEAL
//         </a>
//       </div>
//     </motion.div>
//   )
// }


// components/cards/ProductCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerItem } from '../../utils/animations.js'

export default function ProductCard({ product }) {
  const { slug, name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, dealLink } = product

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col"
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.09)' }}
    >
      {/* Entire card top (image + content) navigates to product page */}
      <Link to={`/product/${slug}`} className="flex flex-col flex-1 no-underline group">

        {/* Image */}
        <div className="relative bg-gray-50 h-[168px] flex items-center justify-center px-4 py-3 overflow-hidden flex-shrink-0">
          {discount && (
            <span className="absolute top-2 left-2 z-10 bg-[#FF4500] text-white text-xs font-bold px-2 py-0.5 rounded">
              {discount}% off
            </span>
          )}
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="max-h-[130px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Text content */}
        <div className="px-3.5 pt-3 pb-1 flex flex-col flex-1">
          <h3 className="font-lora font-extrabold text-[0.9rem] text-[#111] leading-snug mb-1 group-hover:text-[#FF4500] transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="font-inter font-semibold text-[0.72rem] text-gray-400 mb-2.5 line-clamp-1">
            {tagline}
          </p>
          <div className="flex items-center gap-1.5 flex-wrap mb-3">
            <span className="font-lora font-extrabold text-[1.05rem] text-[#111]">
              ₹{currentPrice?.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="font-inter font-semibold text-[0.72rem] text-gray-300 line-through">
                ₹{originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {savingsLabel && (
              <span className="bg-[#e6f7ed] text-[#1a7c3e] font-inter font-bold text-[0.7rem] px-1.5 py-0.5 rounded">
                {savingsLabel}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* GRAB DEAL — external link, outside the card Link to avoid nesting */}
      <div className="px-3.5 pb-3.5">
        <a
          href={dealLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center bg-[#FF4500] hover:bg-[#CC3700] text-white font-inter font-extrabold text-[0.8rem] py-2.5 rounded-full no-underline uppercase tracking-wide transition-colors"
        >
          GRAB DEAL
        </a>
      </div>
    </motion.div>
  )
}