// // components/sections/FeaturedProducts.jsx
// import { motion } from 'framer-motion'
// import { staggerContainer, viewportOnce } from '../../utils/animations.js'
// import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
// import ProductCard from '../cards/ProductCard.jsx'
// import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
// import { useFetch } from '../../hooks/useFetch.js'
// import { cmsService } from '../../services/cms.service.js'

// export default function FeaturedProducts() {
//   const { data: products, loading } = useFetch(() => cmsService.getFeaturedProducts(), [])

//   return (
//     <SectionWrapper>
//       <SectionHeader
//         title="Featured Products"
//         viewAllHref="/shop"
//         viewAllLabel="View all"
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
//           {products?.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </motion.div>
//       )}
//     </SectionWrapper>
//   )
// }


// components/sections/FeaturedProducts.jsx
import { motion } from 'framer-motion'
import { HiOutlineSparkles } from 'react-icons/hi'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import ProductCard from '../cards/ProductCard.jsx'
import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

export default function FeaturedProducts() {
  const { data: products, loading } = useFetch(() => cmsService.getFeaturedProducts(), [])

  return (
    <SectionWrapper className='bg-white'>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 right-10 text-8xl text-white">★</div>
        <div className="absolute bottom-20 left-10 text-8xl text-white">✨</div>
      </div>

      <SectionHeader
        title="Featured Products"
        viewAllHref="/shop"
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
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      )}

      {/* Bottom Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-purple-500/10 to-transparent p-4 rounded-lg border border-purple-500/30"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <HiOutlineSparkles className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-semibold">Curated Just For You</p>
              <p className="text-sm text-gray-400">Hand-picked premium products</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm text-gray-300">
            <span>✨ Expert Reviewed</span>
            <span>✓ Authentic Products</span>
            <span>↺ Easy Returns</span>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}