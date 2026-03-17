// components/sections/CuratedCollections.jsx
import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import CollectionCard from '../cards/CollectionCard.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

export default function CuratedCollections() {
  const { data: collections, loading } = useFetch(() => cmsService.getCollections(), [])

  return (
    <SectionWrapper bg="bg-white">
      <SectionHeader
        title="Curated Collections"
        subtitle="Kits built for your specific lifestyle, tested in real scenarios."
        viewAllHref="/collections"
      />

      {!loading && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {collections?.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </motion.div>
      )}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton rounded-xl h-64" />
          ))}
        </div>
      )}
    </SectionWrapper>
  )
}
