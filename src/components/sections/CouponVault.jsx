// components/sections/CouponVault.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'
import { Copy, Check, Tag } from 'lucide-react'

function CouponCard({ coupon }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.button
      variants={staggerItem}
      onClick={handleCopy}
      className="flex items-center gap-3  hover:bg-[#222] border border-[rgba(255,255,255,0.08)] hover:border-primary/30 rounded-xl px-4 py-3 transition-all group cursor-pointer text-left w-full"
    >
      <div className="w-8 h-8  rounded-lg flex items-center justify-center flex-shrink-0">
        <Tag size={14} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono font-500 text-white text-sm tracking-wider">{coupon.code}</p>
        <p className="text-[#666] text-xs font-body truncate">{coupon.label}</p>
      </div>
      <div className="flex-shrink-0">
        {copied ? (
          <Check size={14} className="text-accent-green" />
        ) : (
          <Copy size={14} className="text-[#555] group-hover:text-primary transition-colors" />
        )}
      </div>
    </motion.button>
  )
}

export default function CouponVault() {
  const { data: coupons, loading } = useFetch(() => cmsService.getCoupons(), [])

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="py-14 bg-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: 'bg-white',
          }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-40px] left-[-40px] w-32 h-32 border-2 border-accent-gold/20 rounded-full" />
          <div className="absolute bottom-[-40px] right-[-40px] w-48 h-48 border border-accent-gold/10 rounded-full" />
          <div className="absolute top-4 right-8 w-3 h-3 bg-accent-gold/30 rounded-full" />
          <div className="absolute bottom-6 left-12 w-2 h-2 bg-primary/40 rounded-full" />

          <div className="relative z-10 px-8 py-10">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-heading font-700 text-white text-2xl md:text-3xl">
                🏷️ Coupon Vault
              </h2>
              <p className="text-[#888] text-sm font-body mt-1">
                We generate new coupons everyday!
              </p>
            </div>

            {/* Coupon Grid */}
            {!loading && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto"
              >
                {coupons?.map((coupon) => (
                  <CouponCard key={coupon.id} coupon={coupon} />
                ))}
              </motion.div>
            )}

            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="skeleton h-14 rounded-xl" />
                ))}
              </div>
            )}

            <p className="text-center text-[#444] text-xs font-body mt-6">Terms &amp; Conditions apply</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
