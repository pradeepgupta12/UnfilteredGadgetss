import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerItem } from '../../utils/animations.js'
import LazyImage from '../common/LazyImage.jsx'

export default function DealCard({ deal }) {
  const { slug, name, tagline, image, currentPrice, originalPrice, discount, savingsLabel, dealLink } = deal

  return (
    <motion.div
      variants={staggerItem}
      className="bg-white border border-gray-200 rounded-xl overflow-hidden relative h-full flex flex-col hover:-translate-y-1 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
    >
      {/* Discount badge */}
      {discount && (
        <span className="absolute top-2 left-2 z-20 bg-[#e8591a] text-white text-xs font-bold px-2 py-1 rounded-full shadow">
          {discount}% off
        </span>
      )}

      {/* Image */}
      <Link
        to={`/product/${slug}`}
        className="relative bg-gray-50 h-44 flex-shrink-0 overflow-hidden block group"
      >
        <LazyImage
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </Link>

      {/* Content */}
      <Link to={`/product/${slug}`} className="flex flex-col flex-grow p-4 no-underline group">

        {/* Name */}
        <div className="min-h-[2.5rem] mb-1.5">
          <h3 className="font-bold text-gray-900 text-[18px] leading-snug line-clamp-2 group-hover:text-[#e8591a] transition-colors">
            {name}
          </h3>
        </div>

        {/* Tagline */}
        <div className="min-h-[1.25rem] mb-3">
          <p className="text-gray-700 text-[14px] font-medium line-clamp-1">
            {tagline || 'No description available'}
          </p>
        </div>

        {/* Pricing */}
        <div className="min-h-[2rem] mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-extrabold text-gray-900 text-[1.05rem]">
              ₹{currentPrice?.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-gray-600 line-through text-[0.72rem] font-medium">
                ₹{originalPrice?.toLocaleString('en-IN')}
              </span>
            )}
            {savingsLabel && (
              <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-2xl whitespace-nowrap border border-green-100">
                {savingsLabel}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Grab Deal */}
      <div className="px-4 pb-4 mt-auto">
        <a
          href={dealLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="block w-full text-center bg-[#FF4500] hover:bg-[#CC3700] text-white font-extrabold text-[0.8rem] py-2.5 rounded-full no-underline uppercase tracking-wide transition-colors"
        >
          GRAB DEAL
        </a>
      </div>
    </motion.div>
  )
}