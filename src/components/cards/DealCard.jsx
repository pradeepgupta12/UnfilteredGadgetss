
// // components/cards/DealCard.jsx
// import { motion } from 'framer-motion'
// import { staggerItem } from '../../utils/animations.js'
// import LazyImage from '../common/LazyImage.jsx'
// import Button from '../common/Button.jsx'

// export default function DealCard({ deal }) {
//   const { name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, dealLink } = deal

//   return (
//     <motion.div
//       variants={staggerItem}
//       className="bg-[#111] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden card-hover relative h-full flex flex-col"
//     >
//       {/* Discount Badge - FIXED: z-index higher than image */}
//       {discount && (
//         <span className="absolute top-2 left-2 z-20 bg-[#e8591a] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
//           {discount}% off
//         </span>
//       )}

//       {/* Image Container - fixed height */}
//       <div className="relative bg-[#181818] h-44 flex-shrink-0 overflow-hidden">
//         <LazyImage
//           src={image}
//           alt={name}
//           className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
//           objectFit="cover"
//         />
        
//         {/* Optional Overlay for better text readability if needed */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
//       </div>

//       {/* Content - flex-grow to take remaining space */}
//       <div className="p-4 relative z-10 bg-[#111] flex flex-col flex-grow">
//         {/* Title with min-height and line-clamp */}
//         <div className="min-h-[2.5rem] mb-1">
//           <h3 className="font-heading font-600 text-white text-sm leading-snug line-clamp-2">
//             {name}
//           </h3>
//         </div>
        
//         {/* Tagline with line-clamp */}
//         <div className="min-h-[1.25rem] mb-3">
//           <p className="text-[#666] text-xs font-body line-clamp-1">
//             {tagline || 'No description available'}
//           </p>
//         </div>

//         {/* Pricing with fixed min-height */}
//         <div className="min-h-[2rem] mb-4">
//           <div className="flex items-center gap-2 flex-wrap">
//             <span className="font-heading font-700 text-white">
//               ₹{currentPrice?.toLocaleString('en-IN')}
//             </span>
//             {originalPrice && (
//               <span className="text-[#555] line-through text-xs font-body">
//                 ₹{originalPrice?.toLocaleString('en-IN')}
//               </span>
//             )}
//             {savingsLabel && (
//               <span className="bg-green-600 text-white text-xs font-mono font-500 px-2 py-0.5 rounded-2xl whitespace-nowrap">
//                 {savingsLabel}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* Button - always at bottom */}
//         <div className="mt-auto">
//           <Button href={dealLink} variant="primary" size="sm" fullWidth>
//             GRAB DEAL
//           </Button>
//         </div>
//       </div>
//     </motion.div>
//   )
// }


// components/cards/DealCard.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerItem } from '../../utils/animations.js'
import LazyImage from '../common/LazyImage.jsx'

export default function DealCard({ deal }) {
  const { slug, name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, dealLink } = deal

  return (
    <motion.div
      variants={staggerItem}
      className="bg-[#111] border border-[rgba(255,255,255,0.06)] rounded-xl overflow-hidden card-hover relative h-full flex flex-col"
    >
      {/* Discount badge */}
      {discount && (
        <span className="absolute top-2 left-2 z-20 bg-[#e8591a] text-white text-xs font-extrabold px-2 py-1 rounded-full shadow-lg">
          {discount}% off
        </span>
      )}

      {/* Image — click → product page */}
      <Link to={`/product/${slug}`} className="relative bg-[#181818] h-44 flex-shrink-0 overflow-hidden block group">
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Link>

      {/* Entire content block — click → product page */}
      <Link to={`/product/${slug}`} className="flex flex-col flex-grow p-4 no-underline group">

        {/* Name */}
        <div className="min-h-[2.5rem] mb-1.5">
          <h3 className="font-heading font-extrabold text-white text-[0.9rem] leading-snug line-clamp-2 group-hover:text-[#FF4500] transition-colors">
            {name}
          </h3>
        </div>

        {/* Tagline */}
        <div className="min-h-[1.25rem] mb-3">
          <p className="text-[#888] text-[0.72rem] font-semibold font-body line-clamp-1">
            {tagline || 'No description available'}
          </p>
        </div>

        {/* Pricing */}
        <div className="min-h-[2rem] mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-heading font-extrabold text-white text-[1.05rem]">
              ₹{currentPrice?.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-[#555] line-through text-[0.72rem] font-semibold font-body">
                ₹{originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {savingsLabel && (
              <span className="bg-green-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-2xl whitespace-nowrap">
                {savingsLabel}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* GRAB DEAL — external link, outside card Link to avoid nesting <a> in <a> */}
      <div className="px-4 pb-4 mt-auto">
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