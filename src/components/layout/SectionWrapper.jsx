// components/layout/SectionWrapper.jsx
import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '../../utils/animations.js'

export default function SectionWrapper({
  children,
  className = '',
  id,
  bg = '',
  noPadding = false,
}) {
  return (
    <motion.section
      id={id}
      className={`${noPadding ? '' : 'py-12 md:py-16'} ${bg} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={fadeUp}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </motion.section>
  )
}

export function SectionHeader({ title, subtitle, viewAllHref, viewAllLabel = 'View all' }) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        <h2 className="font-heading text-2xl md:text-3xl font-700 text-black font-bold">{title}</h2>
        {subtitle && <p className="text-[#575555] text-sm mt-1 font-body">{subtitle}</p>}
      </div>
      {viewAllHref && (
        <a
          href={viewAllHref}
          className="text-primary text-sm font-body font-500 hover:text-primary-light transition-colors whitespace-nowrap ml-4 mt-1"
        >
          {viewAllLabel} →
        </a>
      )}
    </div>
  )
}
