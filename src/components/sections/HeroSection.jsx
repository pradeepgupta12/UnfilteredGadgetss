



// import { motion } from "framer-motion"

// export default function HeroSection() {

//   const leftImage = "/unfiltered-gadgets/public/right-image-hero-section.png"
//   const rightImage = "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg"

//   return (
//     <section className="relative w-full min-h-[520px] overflow-hidden bg-black">

//       {/* LEFT IMAGE */}
//       <div className="absolute inset-y-0 left-0 w-full md:w-1/2">
//         <img
//           src={leftImage}
//           alt="Gadget"
//           className="w-full h-full object-cover"
//         />

//         {/* overlay */}
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* RIGHT IMAGE BACKGROUND */}
//       <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
//         <img
//           src={rightImage}
//           alt="Tech background"
//           className="w-full h-full object-cover"
//         />

//         {/* dark overlay for readability */}
//         <div className="absolute inset-0 bg-[#0A0A0A]/85" />

//         {/* grid pattern */}
//         <div
//           className="absolute inset-0 opacity-[0.06]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,69,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,69,0,0.3) 1px, transparent 1px)",
//             backgroundSize: "40px 40px",
//           }}
//         />
//       </div>

//       {/* CONTENT */}
//       <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center justify-end">

//         <div className="max-w-lg py-16">

//           {/* Badge */}
//           <motion.div
//             initial={{ opacity: 0, y: 15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="mb-5"
//           >
//             <span className="bg-[#ff4d1a]/10 text-[#ff4d1a] px-4 py-1.5 rounded-full text-sm border border-[#ff4d1a]/20">
//               UnfilteredGadgets Promise
//             </span>
//           </motion.div>

//           {/* Heading */}
//           <motion.h1
//             initial={{ opacity: 0, y: 25 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//             className="text-3xl md:text-5xl font-bold text-white leading-tight"
//           >
//             Gadgets Without <br />
//             <span className="text-[#ff4d1a]">Gimmick's</span>
//           </motion.h1>

//           {/* Paragraph */}
//           <p className="text-gray-400 mt-5 text-base">
//             No paid reviews. No inflated specs. Just real performance data,
//             honest pros & cons, and gadgets that actually deserve your money.
//           </p>

//           {/* Buttons */}
//           <div className="flex gap-4 mt-7 flex-wrap">

//             <a
//               href="/shop"
//               className="bg-[#ff4d1a] hover:bg-[#ff6233] text-white px-6 py-2.5 rounded-full font-medium transition"
//             >
//               Browse Gadgets
//             </a>

//             <a
//               href="/blogs"
//               className="bg-[#ff4d1a]/10 border border-[#ff4d1a]/20 text-[#ff4d1a] px-6 py-2.5 rounded-full font-medium hover:bg-[#ff4d1a]/20 transition"
//             >
//               Read the Lab
//             </a>

//           </div>

//           {/* STATS */}
//           <div className="flex gap-8 mt-10 border-t border-white/10 pt-6">

//             <div>
//               <div className="text-[#ff4d1a] text-xl font-bold">
//                 4,000+
//               </div>
//               <div className="text-gray-500 text-xs">
//                 Products Tested
//               </div>
//             </div>

//             <div>
//               <div className="text-[#ff4d1a] text-xl font-bold">
//                 98%
//               </div>
//               <div className="text-gray-500 text-xs">
//                 Accuracy Score
//               </div>
//             </div>

//             <div>
//               <div className="text-[#ff4d1a] text-xl font-bold">
//                 ₹0
//               </div>
//               <div className="text-gray-500 text-xs">
//                 Paid placements
//               </div>
//             </div>

//           </div>

//         </div>

//       </div>

//     </section>
//   )
// }


import { motion } from "framer-motion"
import { useState } from "react"

export default function HeroSection() {
  const [leftImage, setLeftImage] = useState("/right-image-hero-section.png")
  const [rightImage, setRightImage] = useState("https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg")
  const [showUploadOptions, setShowUploadOptions] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const handleFileUpload = (e, position) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (position === 'left') {
          setLeftImage(reader.result)
        } else {
          setRightImage(reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlSubmit = (position) => {
    if (imageUrl) {
      if (position === 'left') {
        setLeftImage(imageUrl)
      } else {
        setRightImage(imageUrl)
      }
      setImageUrl("")
      setShowUploadOptions(false)
    }
  }

  return (
    <section className="relative w-full min-h-[520px] overflow-hidden bg-black">

     
      {showUploadOptions && (
        <div className="absolute top-16 right-4 z-50 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/20 w-72">
          <h3 className="text-white text-sm font-medium mb-3">Update Images</h3>
          
          {/* Left Image Upload */}
          <div className="mb-4">
            <label className="text-gray-400 text-xs block mb-2">Left Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'left')}
              className="text-white text-xs mb-2 w-full"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-white/10 text-white text-xs px-2 py-1 rounded flex-1"
              />
              <button
                onClick={() => handleUrlSubmit('left')}
                className="bg-[#ff4d1a] text-white text-xs px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>

          {/* Right Image Upload */}
          <div>
            <label className="text-gray-400 text-xs block mb-2">Right Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileUpload(e, 'right')}
              className="text-white text-xs mb-2 w-full"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Or enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-white/10 text-white text-xs px-2 py-1 rounded flex-1"
              />
              <button
                onClick={() => handleUrlSubmit('right')}
                className="bg-[#ff4d1a] text-white text-xs px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowUploadOptions(false)}
            className="text-gray-400 text-xs mt-4 hover:text-white"
          >
            Close
          </button>
        </div>
      )}

      {/* LEFT IMAGE */}
      <div className="absolute inset-y-0 left-0 w-full md:w-1/2">
        <img
          src={leftImage}
          alt="Gadget"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found"
          }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* RIGHT IMAGE BACKGROUND */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2">
        <img
          src={rightImage}
          alt="Tech background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found"
          }}
        />
        {/* dark overlay for readability */}
        <div className="absolute inset-0 bg-[#0A0A0A]/85" />
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,69,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,69,0,0.3) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 h-full flex items-center justify-end">
        <div className="max-w-lg py-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-5"
          >
            <span className="bg-[#ff4d1a]/10 text-[#ff4d1a] px-4 py-1.5 rounded-full text-sm border border-[#ff4d1a]/20">
              UnfilteredGadgets Promise
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl font-bold text-white leading-tight"
          >
            Gadgets Without <br />
            <span className="text-[#ff4d1a]">Gimmick's</span>
          </motion.h1>

          {/* Paragraph */}
          <p className="text-gray-400 mt-5 text-base">
            No paid reviews. No inflated specs. Just real performance data,
            honest pros & cons, and gadgets that actually deserve your money.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-7 flex-wrap">
            <a
              href="/shop"
              className="bg-[#ff4d1a] hover:bg-[#ff6233] text-white px-6 py-2.5 rounded-full font-medium transition"
            >
              Browse Gadgets
            </a>
            <a
              href="/blogs"
              className="bg-[#ff4d1a]/10 border border-[#ff4d1a]/20 text-[#ff4d1a] px-6 py-2.5 rounded-full font-medium hover:bg-[#ff4d1a]/20 transition"
            >
              Read the Lab
            </a>
          </div>

          {/* STATS */}
          <div className="flex gap-8 mt-10 border-t border-white/10 pt-6">
            <div>
              <div className="text-[#ff4d1a] text-xl font-bold">4,000+</div>
              <div className="text-gray-500 text-xs">Products Tested</div>
            </div>
            <div>
              <div className="text-[#ff4d1a] text-xl font-bold">98%</div>
              <div className="text-gray-500 text-xs">Accuracy Score</div>
            </div>
            <div>
              <div className="text-[#ff4d1a] text-xl font-bold">₹0</div>
              <div className="text-gray-500 text-xs">Paid placements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}