// pages/NotFound/NotFound.jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations.js'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="text-center"
      >
        <div className="font-heading font-800 text-[120px] md:text-[180px] leading-none gradient-text opacity-20 select-none">
          404
        </div>
        <h1 className="font-heading font-700 text-white text-2xl md:text-3xl -mt-6 mb-3">
          Page Not Found
        </h1>
        <p className="text-[#666] font-body text-sm mb-8 max-w-sm mx-auto">
          Looks like this gadget doesn't exist. Maybe it was recalled?
        </p>
        <Link
          to="/"
          className="inline-block bg-primary hover:bg-primary-dark text-white font-body font-600 px-8 py-3 rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
