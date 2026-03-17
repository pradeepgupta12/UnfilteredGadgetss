


// // components/sections/FeaturedProducts.jsx
// import { motion } from 'framer-motion'
// import { HiOutlineSparkles } from 'react-icons/hi'
// import { staggerContainer, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import ProductCard from '../cards/ProductCard.jsx'
// import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// export default function FeaturedProducts() {
//   const { data: products, loading } = useFetch(() => cmsService.getFeaturedProducts(), [])

//   return (
//     <SectionWrapper className='bg-white'>
//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5 pointer-events-none">
//         <div className="absolute top-20 right-10 text-8xl text-white">★</div>
//         <div className="absolute bottom-20 left-10 text-8xl text-white">✨</div>
//       </div>

//       <SectionHeader
//         title="Featured Products"
//         viewAllHref="/shop"
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
//           {products?.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </motion.div>
//       )}

//       {/* Bottom Banner */}
     
//     </SectionWrapper>
//   )
// }


// // components/sections/FeaturedProducts.jsx
// import { motion } from 'framer-motion'
// import { useNavigate } from 'react-router-dom'
// import { staggerContainer, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import ProductCard from '../cards/ProductCard.jsx'
// import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// const MAX_PRODUCTS = 4

// export default function FeaturedProducts() {
//   const { data: products, loading } = useFetch(() => cmsService.getFeaturedProducts(), [])
//   const navigate = useNavigate()

//   const visibleProducts = products?.slice(0, MAX_PRODUCTS)
//   const hasMore = products?.length > MAX_PRODUCTS

//   return (
//     <SectionWrapper className="bg-white">
//       <SectionHeader
//         title="Featured Products"
//         viewAllHref="/shop"
//         viewAllLabel={hasMore ? 'View all' : undefined}
//       />

//       {loading ? (
//         <SectionSkeleton cards={MAX_PRODUCTS} />
//       ) : (
//         <>
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             whileInView="visible"
//             viewport={viewportOnce}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
//           >
//             {visibleProducts?.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </motion.div>

//           {/* View All button — bottom, only when more than 4 */}
//           {hasMore && (
//             <div className="mt-10 text-center">
//               <button
//                 onClick={() => navigate('/shop')}
//                 className="inline-block px-8 py-2.5 bg-[#FF4500] hover:bg-[#CC3700] text-white text-sm font-extrabold rounded-full uppercase tracking-wide transition-colors duration-200"
//               >
//                 View All Products
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </SectionWrapper>
//   )
// }

// components/sections/FeaturedProducts.jsx
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import ProductCard from '../cards/ProductCard.jsx'
import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

const MAX_PRODUCTS = 4

export default function FeaturedProducts() {
  const { data: products, loading } = useFetch(() => cmsService.getFeaturedProducts(), [])
  const navigate = useNavigate()
  const scrollContainerRef = useRef(null)

  const visibleProducts = products?.slice(0, MAX_PRODUCTS)
  const hasMore = products?.length > MAX_PRODUCTS

  return (
    <SectionWrapper className="bg-white">
      <SectionHeader
        title="Featured Products"
        viewAllHref="/shop"
        viewAllLabel={hasMore ? 'View all' : undefined}
      />

      {loading ? (
        <SectionSkeleton cards={MAX_PRODUCTS} />
      ) : (
        <>
          {/* Mobile: Horizontal Scroll | Desktop: Grid */}
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
              {visibleProducts?.map((product, index) => (
                <div 
                  key={product.id} 
                  className={`flex-none w-[75%] sm:w-[45%] lg:w-auto snap-start ${index === visibleProducts.length - 1 ? 'relative' : ''}`}
                >
                  <ProductCard product={product} />
                </div>
              ))}
              
              {/* Extra spacer for last card half visible effect on mobile */}
              <div className="flex-none w-10 sm:w-8 lg:w-0"></div>
            </motion.div>

            {/* Clean scroll indicator for mobile - without blur */}
            <div className="flex justify-center items-center gap-1 mt-3 lg:hidden">
              <span className="text-xs text-gray-400 mr-2">More</span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
              <svg className="w-4 h-4 text-gray-400 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* View All button — bottom, only when more than 4 (hidden on mobile) */}
          {hasMore && (
            <div className="mt-10 text-center hidden lg:block">
              <button
                onClick={() => navigate('/shop')}
                className="inline-block px-8 py-2.5 bg-[#FF4500] hover:bg-[#CC3700] text-white text-sm font-extrabold rounded-full uppercase tracking-wide transition-colors duration-200"
              >
                View All Products
              </button>
            </div>
          )}
        </>
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