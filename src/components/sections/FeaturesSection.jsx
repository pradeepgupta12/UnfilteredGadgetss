// // components/sections/FeaturesSection.jsx
// import { motion } from 'framer-motion'
// import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
// import { featuresData } from '../../data/site.data.js'

// export default function FeaturesSection() {
//   return (
//     <section className="py-14 bg-[#080808]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           variants={staggerContainer}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: '-60px' }}
//           className="grid grid-cols-1 md:grid-cols-3 gap-8"
//         >
//           {featuresData.map((feature) => (
//             <motion.div
//               key={feature.id}
//               variants={staggerItem}
//               className="flex flex-col items-center text-center p-6"
//             >
//               <div className="w-14 h-14 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-2xl mb-5">
//                 {feature.icon}
//               </div>
//               <h3 className="font-heading font-700 text-white text-lg mb-3">{feature.title}</h3>
//               <p className="text-[#666] text-sm font-body leading-relaxed">{feature.description}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   )
// }



// components/sections/FeaturesSection.jsx
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, viewportOnce } from '../../utils/animations.js'
import { featuresData } from '../../data/site.data.js'
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineRefresh } from 'react-icons/hi'

// Default features if data not available
const defaultFeatures = [
  {
    id: 1,
    icon: <HiOutlineShieldCheck className="w-7 h-7 text-[#e8591a]" />,
    title: "Certified Quality",
    description: "Every product undergoes rigorous 50-point inspection"
  },
  {
    id: 2,
    icon: <HiOutlineTruck className="w-7 h-7 text-[#e8591a]" />,
    title: "Free Shipping",
    description: "Fast & free delivery on all orders over ₹999"
  },
  {
    id: 3,
    icon: <HiOutlineRefresh className="w-7 h-7 text-[#e8591a]" />,
    title: "Easy Returns",
    description: "30-day money-back guarantee, no questions asked"
  }
]

export default function FeaturesSection() {
  const features = featuresData?.length ? featuresData : defaultFeatures

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#e8591a]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-[#e8591a] text-sm font-semibold tracking-wider uppercase">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Features We're Proud Of
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mt-3">
            We go above and beyond to ensure the best experience for our customers
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={staggerItem}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center p-8 bg-gradient-to-b from-[#111] to-[#0a0a0a] rounded-2xl border border-[rgba(255,255,255,0.06)] hover:border-[#e8591a]/30 transition-all duration-300 group"
            >
              {/* Icon Container */}
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-[#e8591a]/10 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300 border border-[#e8591a]/20">
                  {feature.icon}
                </div>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-[#e8591a]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              <h3 className="font-heading font-700 text-white text-lg mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 text-sm font-body leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Line */}
              <div className="w-12 h-0.5 bg-[#e8591a]/30 rounded-full mt-6 group-hover:w-20 transition-all duration-300"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "10K+", label: "Products Sold" },
            { value: "4.9", label: "Trustpilot Rating" },
            { value: "2K+", label: "5-Star Reviews" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-4">
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}