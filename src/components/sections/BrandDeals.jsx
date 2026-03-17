


// // components/sections/BrandDeals.jsx
// import { motion } from 'framer-motion'
// import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import Button from '../common/Button.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// const brandColors = {
//   'Amazon':  { text: '#FF9900' },
//   'Flipkart':{ text: '#2874F0' },
//   'Croma':   { text: '#00B140' },
//   'Myntra':  { text: '#FF3F6C' },
// }

// export default function BrandDeals() {
//   const { data: brands, loading } = useFetch(() => cmsService.getBrandDeals(), [])

//   return (
//     <SectionWrapper bg="bg-white">
//       <SectionHeader
//         title="Top Deals"
//         viewAllHref="/deals"
//         viewAllLabel="View all"
//       />

//       {!loading && (
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={viewportOnce}
//           className="grid grid-cols-2 md:grid-cols-4 gap-5"
//         >
//           {brands?.map((brand) => {
//             const colors = brandColors[brand.name] || { text: '#333' }
//             return (
//               <motion.div
//                 key={brand.id}
//                 variants={staggerItem}
//                 className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
//               >
//                 {/* Brand Logo / Name */}
//                 <div
//                   className="font-extrabold text-2xl mb-4 tracking-tight"
//                   style={{ color: colors.text }}
//                 >
//                   {brand.logoText}
//                 </div>

//                 {/* Offer */}
//                 <p className="font-bold text-gray-900 text-base leading-snug mb-1">
//                   {brand.offer}
//                 </p>

//                 {/* Rewards */}
//                 <p className="text-gray-500 text-sm font-medium mb-1">
//                   {brand.rewards}
//                 </p>

//                 {/* Expiry */}
//                 <p className="text-gray-400 text-xs mb-5">
//                   {brand.expiry}
//                 </p>

//                 <Button href={brand.dealLink} variant="primary" size="sm" fullWidth>
//                   Grab Deal
//                 </Button>
//               </motion.div>
//             )
//           })}
//         </motion.div>
//       )}

//       {loading && (
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//           {[1, 2, 3, 4].map((i) => (
//             <div key={i} className="bg-white rounded-2xl p-6 h-52 skeleton border border-gray-100" />
//           ))}
//         </div>
//       )}
//     </SectionWrapper>
//   )
// }


// components/sections/BrandDeals.jsx
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import Button from '../common/Button.jsx'
import brandDealsData from '../../data/brandDeals.json'

// Placeholder component for image errors
const PlaceholderIcon = () => (
  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
    <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  </div>
)

export default function BrandDeals() {
  const [brands] = useState(brandDealsData.brands)
  const [loading] = useState(false)
  const scrollContainerRef = useRef(null)

  return (
    <SectionWrapper bg="bg-white">
      <SectionHeader
        title="Top Gadgets Deals"
      />

      {!loading && brands.length > 0 ? (
        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {brands?.map((brand, index) => (
              <motion.div
                key={brand.id}
                variants={staggerItem}
                className={`flex-none w-[70%] sm:w-[45%] md:w-[23%] snap-start min-h-[280px] md:min-h-[300px]`}
              >
                <div className="bg-white rounded-2xl p-6 flex flex-col items-center text-center border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 h-full">
                  {/* Brand Logo Image with Error Handling */}
                  <div className="w-20 h-20 mb-4 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={brand.logoImage} 
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        
                        const parent = e.target.parentElement;
                        const placeholder = document.createElement('div');
                        placeholder.className = 'w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0';
                        placeholder.innerHTML = `
                          <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                          </svg>
                        `;
                        parent.appendChild(placeholder);
                      }}
                    />
                  </div>

                  {/* Content Container with consistent height */}
                  <div className="flex flex-col flex-grow w-full">
                    {/* Offer */}
                    <p className="font-bold text-gray-900 text-base leading-snug mb-1 line-clamp-2 min-h-[40px]">
                      {brand.offer}
                    </p>

                    {/* Rewards */}
                    <p className="text-gray-500 text-sm font-medium mb-1 line-clamp-2 min-h-[32px]">
                      {brand.rewards}
                    </p>

                    {/* Expiry */}
                    <p className="text-gray-400 text-xs mb-5 line-clamp-1 min-h-[16px]">
                      {brand.expiry}
                    </p>

                    {/* Button - always at bottom */}
                    <div className="mt-auto">
                      <Button href={brand.dealLink} variant="primary" size="sm" fullWidth>
                        Grab Deal
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Extra spacer for last card half visible effect - sirf mobile pe */}
            <div className="flex-none w-10 sm:w-8 md:w-0"></div>
          </motion.div>
          
          {/* Simple indicator that more content exists - without blur */}
          <div className="flex justify-center items-center gap-1 mt-3 md:hidden">
            <span className="text-xs text-gray-400 mr-2">More</span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      ) : (
        // Loading state with min-height and horizontal scroll skeleton
        <div className="flex gap-5 overflow-x-auto pb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-none w-[70%] sm:w-[45%] md:w-[23%] min-h-[280px] md:min-h-[300px]">
              <div className="bg-white rounded-2xl p-6 h-full border border-gray-100">
                <div className="animate-pulse h-full flex flex-col">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex-shrink-0"></div>
                  <div className="w-32 h-4 bg-gray-200 rounded mx-auto mb-2"></div>
                  <div className="w-40 h-3 bg-gray-200 rounded mx-auto mb-1"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded mx-auto mb-5"></div>
                  <div className="w-full h-8 bg-gray-200 rounded mt-auto"></div>
                </div>
              </div>
            </div>
          ))}
          <div className="flex-none w-10 sm:w-8 md:w-0"></div>
        </div>
      )}
      
      {/* Add this style tag in your global CSS or component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionWrapper>
  )
}