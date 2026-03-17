// components/sections/BrandDeals.jsx
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import Button from '../common/Button.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

const brandColors = {
  'Amazon': { text: '#FF9900', bg: 'bg-white' },
  'Flipkart': { text: '#2874F0', bg: 'bg-white' },
  'Croma': { text: '#00B140', bg: 'bg-white' },
  'Myntra': { text: '#FF3F6C', bg: 'bg-white' },
}

export default function BrandDeals() {
  const { data: brands, loading } = useFetch(() => cmsService.getBrandDeals(), [])

  return (
    <SectionWrapper bg="bg-white">
      <SectionHeader
        title="Top Deals"
        viewAllHref="/deals"
        viewAllLabel="View all"
      />

      {!loading && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {brands?.map((brand) => {
            const colors = brandColors[brand.name] || { text: '#333', bg: 'bg-white' }
            return (
              <motion.div
                key={brand.id}
                variants={staggerItem}
                className="bg-white rounded-xl p-5 flex flex-col items-center text-center card-hover"
              >
                <div
                  className="font-heading font-800 text-2xl mb-3"
                  style={{ color: colors.text }}
                >
                  {brand.logoText}
                </div>
                <p className="font-heading font-700 text-dark text-lg">{brand.offer}</p>
                <p className="text-[#666] text-sm font-body mb-1">{brand.rewards}</p>
                <p className="text-[#999] text-xs font-body mb-4">{brand.expiry}</p>
                <Button href={brand.dealLink} variant="primary" size="sm" fullWidth>
                  Grab Deal
                </Button>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 h-48 skeleton" />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
