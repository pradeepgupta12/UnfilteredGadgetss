// components/cards/CollectionCard.jsx
import { motion } from 'framer-motion'
import { zoomIn } from '../../utils/animations.js'
import LazyImage from '../common/LazyImage.jsx'

export default function CollectionCard({ collection }) {
  const { title, subtitle, image, slug, ctaLabel } = collection

  return (
    <motion.a
      href={`/category/${slug}`}
      variants={zoomIn}
      className="relative rounded-xl overflow-hidden h-64 block group cursor-pointer"
    >
      {/* Background image */}
      <LazyImage
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-700"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <h3 className="font-heading font-700 text-white text-xl leading-tight">{title}</h3>
        <p className="text-white/70 text-xs font-body mt-1 mb-3">{subtitle}</p>
        <span className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white text-xs font-body font-500 px-3 py-1.5 rounded-full transition-all border border-white/20">
          {ctaLabel} →
        </span>
      </div>
    </motion.a>
  )
}
