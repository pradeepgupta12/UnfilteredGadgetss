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


// components/sections/TopDeals.jsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import DealCard from '../cards/DealCard.jsx'
import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

export default function TopDeals() {
  const { data: deals, loading } = useFetch(() => cmsService.getTopDeals(), [])

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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {deals?.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </motion.div>
      )}

      {/* Bottom Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-[#e8591a]/20 to-transparent p-4 rounded-lg border border-[#e8591a]/30"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8591a]/20 rounded-lg flex items-center justify-center">
              <HiOutlineLightningBolt className="w-5 h-5 text-[#e8591a]" />
            </div>
            <div>
              <p className="text-white font-semibold">Limited Time Offers</p>
              <p className="text-sm text-gray-400">Deals end in 2 days</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-300">
            <span>⚡ Free Shipping</span>
            <span>✓ 1 Year Warranty</span>
            <span>↺ 30 Day Returns</span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}