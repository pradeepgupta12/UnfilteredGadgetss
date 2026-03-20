


// import { motion, AnimatePresence } from "framer-motion"
// import { useState, useEffect } from "react"

// export default function HeroSection() {
//   const [showUploadOptions, setShowUploadOptions] = useState(false)
//   const [imageUrl, setImageUrl] = useState("")
  
//   const [carouselImages, setCarouselImages] = useState([
//     "/image1.png",
//     "/image2.png", 
//     "/image3.png"
//   ])
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
//       )
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [carouselImages.length])

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const newImages = [...carouselImages]
//         newImages[currentImageIndex] = reader.result
//         setCarouselImages(newImages)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleUrlSubmit = () => {
//     if (imageUrl) {
//       const newImages = [...carouselImages]
//       newImages[currentImageIndex] = imageUrl
//       setCarouselImages(newImages)
//       setImageUrl("")
//       setShowUploadOptions(false)
//     }
//   }

//   const handleImageClick = () => {
//     window.location.href = "/shop"
//   }

//   const slideVariants = {
//     enter: () => ({
//       opacity: 0,
//       filter: "blur(10px)"
//     }),
//     center: {
//       zIndex: 1,
//       opacity: 1,
//       filter: "blur(0px)"
//     },
//     exit: () => ({
//       zIndex: 0,
//       opacity: 0,
//       filter: "blur(10px)"
//     })
//   }

//   return (
//     <section
//       className="relative max-w-8xl mx-auto overflow-hidden bg-black"
//       style={{ height: "clamp(280px, 55vw, 520px)" }}
//     >
//       {/* Upload Options Modal */}
//       {showUploadOptions && (
//         <div className="absolute top-16 right-4 z-50 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/20 w-64 sm:w-72">
//           <h3 className="text-white text-sm font-medium mb-3">Update Current Image</h3>
//           <div className="mb-4">
//             <label className="text-gray-400 text-xs block mb-2">Upload New Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="text-white text-xs mb-2 w-full"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Or enter image URL"
//                 value={imageUrl}
//                 onChange={(e) => setImageUrl(e.target.value)}
//                 className="bg-white/10 text-white text-xs px-2 py-1 rounded flex-1"
//               />
//               <button
//                 onClick={handleUrlSubmit}
//                 className="bg-[#ff4d1a] text-white text-xs px-3 py-1 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowUploadOptions(false)}
//             className="text-gray-400 text-xs mt-4 hover:text-white"
//           >
//             Close
//           </button>
//         </div>
//       )}

//       {/* Carousel */}
//       <div
//         className="absolute inset-0 w-full h-full cursor-pointer"
//         onClick={handleImageClick}
//       >
//         <div className="relative w-full h-full overflow-hidden">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={currentImageIndex}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 opacity: { duration: 0.5 },
//                 filter: { duration: 0.5 }
//               }}
//               className="absolute inset-0 w-full h-full"
//               style={{
//                 backgroundImage: `url(${carouselImages[currentImageIndex]})`,
//                 backgroundSize: "100% 100%",   // ✅ poori image fit, no black sides
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//               }}
//             />
//           </AnimatePresence>

//           {/* Subtle overlay */}
//           <div className="absolute inset-0 bg-black/20 pointer-events-none" />

//           {/* Carousel Indicators */}
//           <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
//             {carouselImages.map((_, index) => (
//               <button
//                 key={index}
//                 className={`transition-all duration-300 ${
//                   index === currentImageIndex
//                     ? "w-6 sm:w-8 h-2 bg-[#ff4d1a] rounded-full"
//                     : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
//                 }`}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setCurrentImageIndex(index)
//                 }}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
//             onClick={(e) => {
//               e.stopPropagation()
//               setCurrentImageIndex((prev) =>
//                 prev === 0 ? carouselImages.length - 1 : prev - 1
//               )
//             }}
//             aria-label="Previous image"
//           >
//             ←
//           </button>
//           <button
//             className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
//             onClick={(e) => {
//               e.stopPropagation()
//               setCurrentImageIndex((prev) =>
//                 prev === carouselImages.length - 1 ? 0 : prev + 1
//               )
//             }}
//             aria-label="Next image"
//           >
//             →
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }




// import { motion, AnimatePresence } from "framer-motion"
// import { useState, useEffect } from "react"

// export default function HeroSection() {
//   const [showUploadOptions, setShowUploadOptions] = useState(false)
//   const [imageUrl, setImageUrl] = useState("")
  
//   const [carouselImages, setCarouselImages] = useState([
//     "/image1.png",
//     "/image2.png", 
//     "/image3.png"
//   ])
//   const [currentImageIndex, setCurrentImageIndex] = useState(0)

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => 
//         prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
//       )
//     }, 4000)
//     return () => clearInterval(interval)
//   }, [carouselImages.length])

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const newImages = [...carouselImages]
//         newImages[currentImageIndex] = reader.result
//         setCarouselImages(newImages)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleUrlSubmit = () => {
//     if (imageUrl) {
//       const newImages = [...carouselImages]
//       newImages[currentImageIndex] = imageUrl
//       setCarouselImages(newImages)
//       setImageUrl("")
//       setShowUploadOptions(false)
//     }
//   }

//   const handleImageClick = () => {
//     window.location.href = "/shop"
//   }

//   const slideVariants = {
//     enter: () => ({
//       opacity: 0,
//       filter: "blur(10px)"
//     }),
//     center: {
//       zIndex: 1,
//       opacity: 1,
//       filter: "blur(0px)"
//     },
//     exit: () => ({
//       zIndex: 0,
//       opacity: 0,
//       filter: "blur(10px)"
//     })
//   }

//   return (
//     <section
//       className="relative w-full overflow-hidden bg-black"
//       style={{ height: "clamp(280px, 55vw, 520px)" }}
//     >
//       {/* Upload Options Modal */}
//       {showUploadOptions && (
//         <div className="absolute top-16 right-4 z-50 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/20 w-64 sm:w-72">
//           <h3 className="text-white text-sm font-medium mb-3">Update Current Image</h3>
//           <div className="mb-4">
//             <label className="text-gray-400 text-xs block mb-2">Upload New Image</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleFileUpload}
//               className="text-white text-xs mb-2 w-full"
//             />
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 placeholder="Or enter image URL"
//                 value={imageUrl}
//                 onChange={(e) => setImageUrl(e.target.value)}
//                 className="bg-white/10 text-white text-xs px-2 py-1 rounded flex-1"
//               />
//               <button
//                 onClick={handleUrlSubmit}
//                 className="bg-[#ff4d1a] text-white text-xs px-3 py-1 rounded"
//               >
//                 Add
//               </button>
//             </div>
//           </div>
//           <button
//             onClick={() => setShowUploadOptions(false)}
//             className="text-gray-400 text-xs mt-4 hover:text-white"
//           >
//             Close
//           </button>
//         </div>
//       )}

//       {/* Carousel */}
//       <div
//         className="absolute inset-0 w-full h-full cursor-pointer"
//         onClick={handleImageClick}
//       >
//         <div className="relative w-full h-full overflow-hidden">
//           <AnimatePresence initial={false}>
//             <motion.div
//               key={currentImageIndex}
//               variants={slideVariants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{
//                 opacity: { duration: 0.5 },
//                 filter: { duration: 0.5 }
//               }}
//               className="absolute inset-0 w-full h-full"
//               style={{
//                 backgroundImage: `url(${carouselImages[currentImageIndex]})`,
//                 backgroundSize: "100% 100%",   // ✅ poori image fit, no black sides
//                 backgroundPosition: "center",
//                 backgroundRepeat: "no-repeat",
//               }}
//             />
//           </AnimatePresence>

//           {/* Subtle overlay */}
//           <div className="absolute inset-0 bg-black/20 pointer-events-none" />

//           {/* Carousel Indicators */}
//           <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
//             {carouselImages.map((_, index) => (
//               <button
//                 key={index}
//                 className={`transition-all duration-300 ${
//                   index === currentImageIndex
//                     ? "w-6 sm:w-8 h-2 bg-[#ff4d1a] rounded-full"
//                     : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
//                 }`}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setCurrentImageIndex(index)
//                 }}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <button
//             className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
//             onClick={(e) => {
//               e.stopPropagation()
//               setCurrentImageIndex((prev) =>
//                 prev === 0 ? carouselImages.length - 1 : prev - 1
//               )
//             }}
//             aria-label="Previous image"
//           >
//             ←
//           </button>
//           <button
//             className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
//             onClick={(e) => {
//               e.stopPropagation()
//               setCurrentImageIndex((prev) =>
//                 prev === carouselImages.length - 1 ? 0 : prev + 1
//               )
//             }}
//             aria-label="Next image"
//           >
//             →
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }


import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function HeroSection() {
  const [showUploadOptions, setShowUploadOptions] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  
  const [carouselImages, setCarouselImages] = useState([
    "/image1.png",
    "/image2.png", 
    "/image3.png"
  ])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)
    return () => clearInterval(interval)
  }, [carouselImages.length])

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const newImages = [...carouselImages]
        newImages[currentImageIndex] = reader.result
        setCarouselImages(newImages)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUrlSubmit = () => {
    if (imageUrl) {
      const newImages = [...carouselImages]
      newImages[currentImageIndex] = imageUrl
      setCarouselImages(newImages)
      setImageUrl("")
      setShowUploadOptions(false)
    }
  }

  const handleImageClick = () => {
    window.location.href = "/shop"
  }

  const slideVariants = {
    enter: { opacity: 0, filter: "blur(10px)" },
    center: { zIndex: 1, opacity: 1, filter: "blur(0px)" },
    exit: { zIndex: 0, opacity: 0, filter: "blur(10px)" }
  }

  return (
    <section className="relative w-full bg-black overflow-hidden">

      {/*
        ✅ FINAL CORRECT APPROACH:
        
        Ek hidden <img> hai jo sirf layout ke liye height set karta hai (visibility:hidden).
        Uske upar animated images absolute position pe hain.
        
        Is tarah:
        - Height image ki NATURAL height hogi — koi crop nahi, koi stretch nahi
        - Mobile/tablet/desktop — sab pe same image dikhegi poori
        - object-cover use kar rahe hain taaki full width bhi cover ho
        
        Agar large screen pe bahut zyada height ho → max-height se control kar lo
      */}

      {/* Layout anchor — yeh image sirf height set karti hai, dikhti nahi */}
      <img
        src={carouselImages[currentImageIndex]}
        alt=""
        aria-hidden="true"
        className="w-full block"
        style={{ 
          visibility: "hidden",
          maxHeight: "520px",   // Desktop pe cap — zyada badi nahi hogi
          objectFit: "contain"
        }}
        draggable={false}
      />

      {/* Actual carousel — absolute, poora section cover karega */}
      <div className="absolute inset-0 w-full h-full cursor-pointer" onClick={handleImageClick}>
        
        {/* Upload Options Modal */}
        {showUploadOptions && (
          <div className="absolute top-16 right-4 z-50 bg-black/90 backdrop-blur-md p-4 rounded-xl border border-white/20 w-64 sm:w-72">
            <h3 className="text-white text-sm font-medium mb-3">Update Current Image</h3>
            <div className="mb-4">
              <label className="text-gray-400 text-xs block mb-2">Upload New Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
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
                  onClick={handleUrlSubmit}
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

        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                opacity: { duration: 0.5 },
                filter: { duration: 0.5 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              {/*
                object-cover = full width & height fill, thodi crop ho sakti hai edges pe
                lekin kyunki height image ki natural height hai → practically koi crop nahi
              */}
              <img
                src={carouselImages[currentImageIndex]}
                alt={`Slide ${currentImageIndex + 1}`}
                className="w-full h-full object-cover object-center"
                draggable={false}
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Carousel Indicators */}
          <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 flex gap-2 sm:gap-3 z-10">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                className={`transition-all duration-300 ${
                  index === currentImageIndex
                    ? "w-6 sm:w-8 h-2 bg-[#ff4d1a] rounded-full"
                    : "w-2 h-2 bg-white/50 hover:bg-white/80 rounded-full"
                }`}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentImageIndex(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImageIndex((prev) =>
                prev === 0 ? carouselImages.length - 1 : prev - 1
              )
            }}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition z-10 text-sm sm:text-base"
            onClick={(e) => {
              e.stopPropagation()
              setCurrentImageIndex((prev) =>
                prev === carouselImages.length - 1 ? 0 : prev + 1
              )
            }}
            aria-label="Next image"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}