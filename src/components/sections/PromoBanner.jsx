// components/sections/PromoBanner.jsx
import { motion } from 'framer-motion'
import { zoomIn, viewportOnce } from '../../utils/animations.js'

export default function PromoBanner() {
  return (
    <motion.section
    
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={zoomIn}
      className="my-0 "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <a
          href="https://amazon.in"
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, #FF9900 0%, #FF6B00 40%, #FF4500 100%)',
            minHeight: '160px',
          }}
        >
          {/* Background boxes decoration */}
          <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-20">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-white rounded"
                style={{
                  width: 60 + i * 20,
                  height: 60 + i * 20,
                  left: i * 30,
                  top: -(30 + i * 10),
                  transform: `rotate(${-15 + i * 10}deg)`,
                }}
              />
            ))}
          </div>
          <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-20">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute border-2 border-white rounded"
                style={{
                  width: 50 + i * 25,
                  height: 50 + i * 25,
                  right: i * 25,
                  top: -(25 + i * 8),
                  transform: `rotate(${15 - i * 10}deg)`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-10 gap-6">
            {/* Left: Amazon brand */}
            <div>
              <div className="font-heading font-800 text-4xl md:text-5xl text-white leading-none">amazon</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-16 h-0.5 bg-white/60 rounded-full" />
                <div className="w-3 h-3 border-2 border-white/60 rounded-full" />
              </div>
            </div>

            {/* Center: CTA */}
            <div className="text-center">
              <p className="text-white/80 font-body font-500 text-lg uppercase tracking-widest">BIG SALE!</p>
              <p className="font-heading font-800 text-5xl md:text-6xl text-white leading-none">UP TO</p>
              <p className="font-heading font-800 text-5xl md:text-6xl text-white leading-none">70%</p>
              <p className="font-heading font-800 text-4xl md:text-5xl text-white leading-none">OFF</p>
            </div>

            {/* Right: Sub text + CTA */}
            <div className="text-center md:text-right">
              <p className="text-white/80 font-body text-base mb-4">Limited Time Deals. Shop Now.</p>
              <span className="inline-block bg-white text-[#FF6B00] font-heading font-700 text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors cursor-pointer">
                Shop Amazon →
              </span>
            </div>
          </div>
        </a>
      </div>
    </motion.section>
  )
}
