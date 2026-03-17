// components/sections/LimitedDeals.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import DealCard from '../cards/DealCard.jsx'
import { SectionSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

function Countdown() {
  const [time, setTime] = useState({ h: 11, m: 12, s: 30 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        s -= 1
        if (s < 0) { s = 59; m -= 1 }
        if (m < 0) { m = 59; h -= 1 }
        if (h < 0) { h = 0; m = 0; s = 0 }
        return { h, m, s }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const pad = (n) => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1">
      <span className="text-[#373535] text-xs font-body mr-1">Ends In</span>
      {[time.h, time.m, time.s].map((val, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-white border border-[#373535] text-[#373535] font-mono text-xs font-500 px-1.5 py-0.5 rounded min-w-[24px] text-center">
            {pad(val)}
          </span>
          {i < 2 && <span className="text-[#373535] text-xs font-mono">:</span>}
        </span>
      ))}
    </div>
  )
}

export default function LimitedDeals() {
  const { data: deals, loading } = useFetch(() => cmsService.getLimitedDeals(), [])

  return (
    <SectionWrapper bg="bg-white">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl font-700 text-black">Limited Time Deals</h2>
        </div>
        <Countdown />
      </div>

      {loading ? (
        <SectionSkeleton cards={4} />
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {deals?.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  )
}
