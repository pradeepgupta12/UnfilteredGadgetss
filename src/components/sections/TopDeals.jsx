// // components/sections/TopDeals.jsx
// import { motion } from 'framer-motion'
// import { staggerContainer, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import DealCard from '../cards/DealCard.jsx'
// import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// export default function TopDeals() {
//   const { data: deals, loading } = useFetch(() => cmsService.getTopDeals(), [])

//   return (
//     <SectionWrapper bg="bg-[#0D0D0D]">
//       <SectionHeader
//         title="Top Deals"
//         viewAllHref="/deals"
//         viewAllLabel="VIEW ALL"
//       />

//       {loading ? (
//         <SectionSkeleton cards={4} />
//       ) : (
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={viewportOnce}
//           className="grid grid-cols-2 md:grid-cols-4 gap-4"
//         >
//           {deals?.map((deal) => (
//             <DealCard key={deal.id} deal={deal} />
//           ))}
//         </motion.div>
//       )}
//     </SectionWrapper>
//   )
// }


// // components/sections/TopDeals.jsx
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { HiOutlineLightningBolt } from 'react-icons/hi'
// import { staggerContainer, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import DealCard from '../cards/DealCard.jsx'
// import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// export default function TopDeals() {
//   const { data: deals, loading } = useFetch(() => cmsService.getTopDeals(), [])

//   return (
//     <SectionWrapper bg="bg-white">
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute top-20 left-10 text-8xl text-white">⚡</div>
//         <div className="absolute bottom-20 right-10 text-8xl text-white">⌘</div>
//       </div>

//       <SectionHeader
//         title="Top Deals"
//         viewAllHref="/deals"
//         viewAllLabel="VIEW ALL"
//       />

//       {loading ? (
//         <SectionSkeleton cards={4} />
//       ) : (
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={viewportOnce}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//         >
//           {deals?.map((deal) => (
//             <DealCard key={deal.id} deal={deal} />
//           ))}
//         </motion.div>
//       )}

//       {/* Bottom Banner */}
      
//     </SectionWrapper>
//   )
// }


// components/sections/TopDeals.jsx
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import DealCard from '../cards/DealCard.jsx'
import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

export default function TopDeals() {
  const { data: deals, loading } = useFetch(() => cmsService.getTopDeals(), [])
  const scrollContainerRef = useRef(null)

  return (
    <SectionWrapper bg="bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 text-8xl text-white">⚡</div>
        <div className="absolute bottom-20 right-10 text-8xl text-white">⌘</div>
      </div>

      <SectionHeader
        title="Top Deals"
        viewAllHref="/deals"
        viewAllLabel="VIEW ALL"
      />

      {loading ? (
        <SectionSkeleton cards={4} />
      ) : (
        <div className="relative">
          <motion.div
            ref={scrollContainerRef}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="lg:grid lg:grid-cols-4 lg:gap-6 flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {deals?.map((deal, index) => (
              <div 
                key={deal.id} 
                className={`flex-none w-[75%] sm:w-[45%] lg:w-auto snap-start ${index === deals.length - 1 ? 'relative' : ''}`}
              >
                <DealCard deal={deal} />
              </div>
            ))}
            
            {/* Extra spacer for last card half visible effect on mobile */}
            <div className="flex-none w-10 sm:w-8 lg:w-0"></div>
          </motion.div>

          {/* Clean scroll indicator for mobile - without blur */}
          <div className="flex justify-center items-center gap-1 mt-3 lg:hidden">
            <span className="text-xs text-gray-400 mr-2">More Deals</span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
            <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      )}

      {/* Bottom Banner - You can add your banner here if needed */}
      
      {/* Add this style tag in your global CSS or component */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionWrapper>
  )
}