// import { useState, useEffect, useRef, useCallback } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// const SEGMENTS = [
//   { label: "5% OFF",    code: "SAVE5",    color: "#e8c547", textColor: "#1a1a1a" },
//   { label: "OOPS!",     code: null,       color: "#3a3a3a", textColor: "#ffffff" },
//   { label: "10% OFF",   code: "SAVE10",   color: "#ff4d1a", textColor: "#ffffff" },
//   { label: "TRY AGAIN", code: null,       color: "#222222", textColor: "#ffffff" },
//   { label: "15% OFF",   code: "SAVE15",   color: "#e8c547", textColor: "#1a1a1a" },
//   { label: "OOPS!",     code: null,       color: "#3a3a3a", textColor: "#ffffff" },
//   { label: "20% OFF",   code: "SAVE20",   color: "#ff4d1a", textColor: "#ffffff" },
//   { label: "FREE SHIP", code: "FREESHIP", color: "#2a6e3f", textColor: "#ffffff" },
// ]

// const SPIN_DURATION = 4000
// const EXTRA_ROTATIONS = 5
// const WHEEL_SIZE = 200

// export default function SpinWheelCoupon() {
//   const [isOpen, setIsOpen]         = useState(false)
//   const [isSpinning, setIsSpinning] = useState(false)
//   const [hasSpun, setHasSpun]       = useState(false)
//   const [result, setResult]         = useState(null)
//   const [showResult, setShowResult] = useState(false)
//   const [copied, setCopied]         = useState(false)
//   const canvasRef                   = useRef(null)
//   const currentRotation             = useRef(0)

//   // ── Draw wheel ──────────────────────────────────────────────────────────
//   const drawWheel = useCallback((rotationAngle = 0) => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx    = canvas.getContext("2d")
//     const size   = canvas.width
//     const center = size / 2
//     const radius = center - 3
//     const segAngle = (2 * Math.PI) / SEGMENTS.length

//     ctx.clearRect(0, 0, size, size)

//     SEGMENTS.forEach((seg, i) => {
//       const start = rotationAngle + i * segAngle
//       const end   = start + segAngle

//       ctx.beginPath()
//       ctx.moveTo(center, center)
//       ctx.arc(center, center, radius, start, end)
//       ctx.closePath()
//       ctx.fillStyle = seg.color
//       ctx.fill()
//       ctx.strokeStyle = "#111"
//       ctx.lineWidth = 1.5
//       ctx.stroke()

//       ctx.save()
//       ctx.translate(center, center)
//       ctx.rotate(start + segAngle / 2)
//       ctx.textAlign = "right"
//       ctx.fillStyle = seg.textColor
//       ctx.font = `bold ${size * 0.058}px 'Segoe UI', sans-serif`
//       ctx.fillText(seg.label, radius - 8, 4)
//       ctx.restore()
//     })

//     // Center circle
//     ctx.beginPath()
//     ctx.arc(center, center, size * 0.09, 0, 2 * Math.PI)
//     ctx.fillStyle = "#111"
//     ctx.fill()
//     ctx.strokeStyle = "#ff4d1a"
//     ctx.lineWidth = 2.5
//     ctx.stroke()

//     // Center dot
//     ctx.beginPath()
//     ctx.arc(center, center, size * 0.035, 0, 2 * Math.PI)
//     ctx.fillStyle = "#ff4d1a"
//     ctx.fill()
//   }, [])

//   // Draw wheel as soon as canvas mounts (isOpen true)
//   useEffect(() => {
//     if (isOpen) {
//       const id = requestAnimationFrame(() => drawWheel(currentRotation.current))
//       return () => cancelAnimationFrame(id)
//     }
//   }, [isOpen, drawWheel])

//   // Auto-open on every page load
//   useEffect(() => {
//     const t = setTimeout(() => setIsOpen(true), 600)
//     return () => clearTimeout(t)
//   }, [])

//   // ── Spin logic ───────────────────────────────────────────────────────────
//   function spinWheel() {
//     if (isSpinning || hasSpun) return
//     setIsSpinning(true)
//     setShowResult(false)

//     const winIdx   = Math.floor(Math.random() * SEGMENTS.length)
//     const segAngle = (2 * Math.PI) / SEGMENTS.length
//     const target   =
//       EXTRA_ROTATIONS * 2 * Math.PI +
//       (2 * Math.PI - winIdx * segAngle - segAngle / 2) -
//       Math.PI / 2

//     const startTime = performance.now()
//     const startRot  = currentRotation.current

//     function animate(now) {
//       const elapsed  = now - startTime
//       const progress = Math.min(elapsed / SPIN_DURATION, 1)
//       const eased    = 1 - Math.pow(1 - progress, 3)
//       const current  = startRot + target * eased

//       currentRotation.current = current
//       drawWheel(current)

//       if (progress < 1) {
//         requestAnimationFrame(animate)
//       } else {
//         setIsSpinning(false)
//         setHasSpun(true)
//         setResult(SEGMENTS[winIdx])
//         setTimeout(() => setShowResult(true), 300)
//       }
//     }
//     requestAnimationFrame(animate)
//   }

//   function copyCode() {
//     if (result?.code) {
//       navigator.clipboard.writeText(result.code)
//       setCopied(true)
//       setTimeout(() => setCopied(false), 2000)
//     }
//   }

//   return (
//     <>
//       {/* ── FAB — shown when modal is closed ── */}
//       <AnimatePresence>
//         {!isOpen && (
//           <motion.button
//             initial={{ scale: 0, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0, opacity: 0 }}
//             whileHover={{ scale: 1.12 }}
//             whileTap={{ scale: 0.93 }}
//             onClick={() => setIsOpen(true)}
//             className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 bg-[#ff4d1a] text-white font-bold px-3 py-2.5 rounded-full shadow-xl text-sm"
//             style={{ boxShadow: "0 4px 20px rgba(255,77,26,0.55)" }}
//           >
//             <span className="text-base">🎡</span>
//             <span className="hidden sm:inline">Win a Coupon</span>
//           </motion.button>
//         )}
//       </AnimatePresence>

//       {/* ── Modal — anchored bottom-right ── */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             key="spin-modal"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50"
//             style={{ pointerEvents: "none" }}
//           >
//             {/* Mobile backdrop */}
//             <div
//               className="absolute inset-0 bg-black/40 sm:bg-transparent"
//               style={{ pointerEvents: "auto" }}
//               onClick={() => setIsOpen(false)}
//             />

//             {/* Card — fixed bottom-right */}
//             <motion.div
//               initial={{ scale: 0.85, opacity: 0, y: 24 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.85, opacity: 0, y: 24 }}
//               transition={{ type: "spring", damping: 22, stiffness: 320 }}
//               onClick={(e) => e.stopPropagation()}
//               className="absolute bottom-5 right-5 w-[270px] sm:w-[290px] bg-white rounded-2xl shadow-2xl overflow-hidden"
//               style={{
//                 pointerEvents: "auto",
//                 boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
//               }}
//             >
//               {/* Close */}
//               <button
//                 onClick={() => setIsOpen(false)}
//                 className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-base font-bold leading-none transition"
//               >
//                 ×
//               </button>

//               {/* Header */}
//               <div className="pt-4 pb-1 px-4 text-center">
//                 <p className="text-[#ff4d1a] text-[10px] font-bold tracking-widest uppercase mb-0.5">
//                   Exclusive Offer
//                 </p>
//                 <h2 className="text-lg font-black text-gray-900 leading-tight">Spin & Save</h2>
//                 <p className="text-gray-400 text-xs mt-0.5">
//                   One spin per visit. Real coupons, no tricks 😉
//                 </p>
//               </div>

//               {/* ── Wheel / Result ── */}
//               <AnimatePresence mode="wait">
//                 {!showResult ? (
//                   <motion.div
//                     key="wheel-view"
//                     initial={{ opacity: 1 }}
//                     exit={{ opacity: 0, scale: 0.9 }}
//                     className="flex flex-col items-center px-4 pb-4 pt-2"
//                   >
//                     {/* Pointer triangle */}
//                     <div className="w-full flex justify-center mb-[-8px] z-10 relative">
//                       <div
//                         style={{
//                           width: 0,
//                           height: 0,
//                           borderLeft: "8px solid transparent",
//                           borderRight: "8px solid transparent",
//                           borderTop: "16px solid #ff4d1a",
//                           filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
//                         }}
//                       />
//                     </div>

//                     {/* Canvas wheel */}
//                     <canvas
//                       ref={canvasRef}
//                       width={WHEEL_SIZE}
//                       height={WHEEL_SIZE}
//                       className="rounded-full"
//                       style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
//                     />

//                     {/* Spin button */}
//                     <motion.button
//                       whileHover={!isSpinning && !hasSpun ? { scale: 1.04 } : {}}
//                       whileTap={!isSpinning && !hasSpun ? { scale: 0.97 } : {}}
//                       onClick={spinWheel}
//                       disabled={isSpinning || hasSpun}
//                       className="mt-3 w-full py-2.5 rounded-xl font-black text-white text-sm transition-all"
//                       style={{
//                         background:
//                           isSpinning || hasSpun
//                             ? "#ccc"
//                             : "linear-gradient(135deg,#ff4d1a,#ff7043)",
//                         boxShadow:
//                           isSpinning || hasSpun
//                             ? "none"
//                             : "0 3px 12px rgba(255,77,26,0.45)",
//                         cursor: isSpinning || hasSpun ? "not-allowed" : "pointer",
//                       }}
//                     >
//                       {isSpinning ? "Spinning…" : hasSpun ? "Spun!" : "Spin the Wheel 🎰"}
//                     </motion.button>
//                   </motion.div>
//                 ) : (
//                   /* ── Result screen ── */
//                   <motion.div
//                     key="result-view"
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ type: "spring", damping: 20 }}
//                     className="flex flex-col items-center px-4 pb-4 pt-2"
//                   >
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       animate={{ scale: 1 }}
//                       transition={{ type: "spring", delay: 0.1 }}
//                       className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2"
//                       style={{ background: "rgba(255,77,26,0.1)" }}
//                     >
//                       🎁
//                     </motion.div>

//                     <h3 className="text-base font-black text-gray-900 mb-0.5">
//                       Congratulations! 🎉
//                     </h3>

//                     {result?.code ? (
//                       <>
//                         <p className="text-[#ff4d1a] font-black text-sm tracking-wide mb-1">
//                           YOU WON {result.label}!
//                         </p>
//                         <p className="text-gray-400 text-xs text-center mb-3 leading-relaxed">
//                           Use the code below at checkout on any tech gadget.
//                         </p>

//                         {/* Code box */}
//                         <div className="w-full border-2 border-dashed border-gray-200 rounded-xl p-3 mb-3">
//                           <p className="text-gray-400 text-[10px] font-bold tracking-widest text-center mb-2 uppercase">
//                             Your Promo Code
//                           </p>
//                           <div className="flex items-center justify-center gap-1.5">
//                             {result.code.split("").map((char, i) => (
//                               <motion.div
//                                 key={i}
//                                 initial={{ opacity: 0, y: 8 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: i * 0.06 }}
//                                 className="w-7 h-8 rounded-md flex items-center justify-center font-black text-sm"
//                                 style={{
//                                   background: "rgba(255,77,26,0.08)",
//                                   color: "#ff4d1a",
//                                   border: "1.5px solid rgba(255,77,26,0.2)",
//                                 }}
//                               >
//                                 {char}
//                               </motion.div>
//                             ))}
//                             <button
//                               onClick={copyCode}
//                               className="w-7 h-8 rounded-md flex items-center justify-center bg-gray-100 hover:bg-gray-200 transition text-sm ml-0.5"
//                               title="Copy"
//                             >
//                               {copied ? "✅" : "📋"}
//                             </button>
//                           </div>
//                         </div>

//                         <motion.button
//                           whileHover={{ scale: 1.03 }}
//                           whileTap={{ scale: 0.97 }}
//                           onClick={() => (window.location.href = "/shop")}
//                           className="w-full py-2.5 rounded-xl font-black text-white text-sm"
//                           style={{
//                             background: "linear-gradient(135deg,#ff4d1a,#ff7043)",
//                             boxShadow: "0 3px 12px rgba(255,77,26,0.4)",
//                           }}
//                         >
//                           Shop Now →
//                         </motion.button>

//                         <p className="text-gray-300 text-[10px] mt-2 text-center">
//                           * Valid 24 hrs. Cannot combine with other offers.
//                         </p>
//                       </>
//                     ) : (
//                       <>
//                         <p className="text-gray-500 text-xs text-center mb-3 mt-1">
//                           Better luck next time! Come back tomorrow 🙏
//                         </p>
//                         <motion.button
//                           whileHover={{ scale: 1.03 }}
//                           whileTap={{ scale: 0.97 }}
//                           onClick={() => setIsOpen(false)}
//                           className="w-full py-2.5 rounded-xl font-black text-white text-sm"
//                           style={{
//                             background: "linear-gradient(135deg,#ff4d1a,#ff7043)",
//                             boxShadow: "0 3px 12px rgba(255,77,26,0.4)",
//                           }}
//                         >
//                           Continue Shopping
//                         </motion.button>
//                       </>
//                     )}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SEGMENTS = [
  { label: "5% OFF",    code: "SAVE5",    color: "#e8c547", textColor: "#1a1a1a" },
  { label: "OOPS!",     code: null,       color: "#3a3a3a", textColor: "#ffffff" },
  { label: "10% OFF",   code: "SAVE10",   color: "#ff4d1a", textColor: "#ffffff" },
  { label: "TRY AGAIN", code: null,       color: "#222222", textColor: "#ffffff" },
  { label: "15% OFF",   code: "SAVE15",   color: "#e8c547", textColor: "#1a1a1a" },
  { label: "OOPS!",     code: null,       color: "#3a3a3a", textColor: "#ffffff" },
  { label: "20% OFF",   code: "SAVE20",   color: "#ff4d1a", textColor: "#ffffff" },
  { label: "FREE SHIP", code: "FREESHIP", color: "#2a6e3f", textColor: "#ffffff" },
]

const SPIN_DURATION = 4000
const EXTRA_ROTATIONS = 5
const WHEEL_SIZE = 200

export default function SpinWheelCoupon() {
  const [isOpen, setIsOpen]         = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [hasSpun, setHasSpun]       = useState(false)
  const [result, setResult]         = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [copied, setCopied]         = useState(false)
  const canvasRef                   = useRef(null)
  const currentRotation             = useRef(0)

  // ── Draw wheel ──────────────────────────────────────────────────────────
  const drawWheel = useCallback((rotationAngle = 0) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext("2d")
    const size   = canvas.width
    const center = size / 2
    const radius = center - 3
    const segAngle = (2 * Math.PI) / SEGMENTS.length

    ctx.clearRect(0, 0, size, size)

    SEGMENTS.forEach((seg, i) => {
      const start = rotationAngle + i * segAngle
      const end   = start + segAngle

      ctx.beginPath()
      ctx.moveTo(center, center)
      ctx.arc(center, center, radius, start, end)
      ctx.closePath()
      ctx.fillStyle = seg.color
      ctx.fill()
      ctx.strokeStyle = "#111"
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.save()
      ctx.translate(center, center)
      ctx.rotate(start + segAngle / 2)
      ctx.textAlign = "right"
      ctx.fillStyle = seg.textColor
      ctx.font = `bold ${size * 0.058}px 'Segoe UI', sans-serif`
      ctx.fillText(seg.label, radius - 8, 4)
      ctx.restore()
    })

    // Center circle
    ctx.beginPath()
    ctx.arc(center, center, size * 0.09, 0, 2 * Math.PI)
    ctx.fillStyle = "#111"
    ctx.fill()
    ctx.strokeStyle = "#ff4d1a"
    ctx.lineWidth = 2.5
    ctx.stroke()

    // Center dot
    ctx.beginPath()
    ctx.arc(center, center, size * 0.035, 0, 2 * Math.PI)
    ctx.fillStyle = "#ff4d1a"
    ctx.fill()
  }, [])

  // Draw wheel as soon as canvas mounts (isOpen true)
  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => drawWheel(currentRotation.current))
      return () => cancelAnimationFrame(id)
    }
  }, [isOpen, drawWheel])

  // Auto-open on every page load
  useEffect(() => {
    const t = setTimeout(() => setIsOpen(true), 600)
    return () => clearTimeout(t)
  }, [])

  // ── Spin logic ───────────────────────────────────────────────────────────
  function spinWheel() {
    if (isSpinning || hasSpun) return
    setIsSpinning(true)
    setShowResult(false)

    const winIdx   = Math.floor(Math.random() * SEGMENTS.length)
    const segAngle = (2 * Math.PI) / SEGMENTS.length
    const target   =
      EXTRA_ROTATIONS * 2 * Math.PI +
      (2 * Math.PI - winIdx * segAngle - segAngle / 2) -
      Math.PI / 2

    const startTime = performance.now()
    const startRot  = currentRotation.current

    function animate(now) {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / SPIN_DURATION, 1)
      const eased    = 1 - Math.pow(1 - progress, 3)
      const current  = startRot + target * eased

      currentRotation.current = current
      drawWheel(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        setHasSpun(true)
        setResult(SEGMENTS[winIdx])
        setTimeout(() => setShowResult(true), 300)
      }
    }
    requestAnimationFrame(animate)
  }

  function copyCode() {
    if (result?.code) {
      navigator.clipboard.writeText(result.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <>
      {/* ── FAB — shown when modal is closed ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.93 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-1.5 bg-[#ff4d1a] text-white font-extrabold px-3 py-2.5 rounded-full shadow-xl text-sm"
            style={{ boxShadow: "0 4px 20px rgba(255,77,26,0.55)" }}
          >
            <span className="text-base">🎡</span>
            <span className="hidden sm:inline">Win a Coupon</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Modal — anchored bottom-right ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="spin-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
            style={{ pointerEvents: "none" }}
          >
            {/* Mobile backdrop */}
            <div
              className="absolute inset-0 bg-black/40 sm:bg-transparent"
              style={{ pointerEvents: "auto" }}
              onClick={() => setIsOpen(false)}
            />

            {/* Card — fixed bottom-right */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 24 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-5 right-5 w-[270px] sm:w-[290px] bg-white rounded-2xl shadow-2xl overflow-hidden"
              style={{
                pointerEvents: "auto",
                boxShadow: "0 8px 40px rgba(0,0,0,0.22)",
              }}
            >
              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2.5 right-2.5 z-20 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 text-base font-black leading-none transition"
              >
                ×
              </button>

              {/* Header */}
              <div className="pt-4 pb-1 px-4 text-center">
                <p className="text-[#ff4d1a] text-[10px] font-black tracking-widest uppercase mb-0.5">
                  Exclusive Offer
                </p>
                <h2 className="text-lg font-extrabold text-gray-900 leading-tight">Spin & Save</h2>
                <p className="text-gray-600 text-xs mt-0.5 font-medium">
                  One spin per visit. Real coupons, no tricks 😉
                </p>
              </div>

              {/* ── Wheel / Result ── */}
              <AnimatePresence mode="wait">
                {!showResult ? (
                  <motion.div
                    key="wheel-view"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center px-4 pb-4 pt-2"
                  >
                    {/* Pointer triangle */}
                    <div className="w-full flex justify-center mb-[-8px] z-10 relative">
                      <div
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: "8px solid transparent",
                          borderRight: "8px solid transparent",
                          borderTop: "16px solid #ff4d1a",
                          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.35))",
                        }}
                      />
                    </div>

                    {/* Canvas wheel */}
                    <canvas
                      ref={canvasRef}
                      width={WHEEL_SIZE}
                      height={WHEEL_SIZE}
                      className="rounded-full"
                      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}
                    />

                    {/* Spin button */}
                    <motion.button
                      whileHover={!isSpinning && !hasSpun ? { scale: 1.04 } : {}}
                      whileTap={!isSpinning && !hasSpun ? { scale: 0.97 } : {}}
                      onClick={spinWheel}
                      disabled={isSpinning || hasSpun}
                      className="mt-3 w-full py-2.5 rounded-xl font-extrabold text-white text-sm transition-all"
                      style={{
                        background:
                          isSpinning || hasSpun
                            ? "#ccc"
                            : "linear-gradient(135deg,#ff4d1a,#ff7043)",
                        boxShadow:
                          isSpinning || hasSpun
                            ? "none"
                            : "0 3px 12px rgba(255,77,26,0.45)",
                        cursor: isSpinning || hasSpun ? "not-allowed" : "pointer",
                      }}
                    >
                      {isSpinning ? "Spinning…" : hasSpun ? "Spun!" : "Spin the Wheel 🎰"}
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ── Result screen ── */
                  <motion.div
                    key="result-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", damping: 20 }}
                    className="flex flex-col items-center px-4 pb-4 pt-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-2"
                      style={{ background: "rgba(255,77,26,0.1)" }}
                    >
                      🎁
                    </motion.div>

                    <h3 className="text-base font-extrabold text-gray-900 mb-0.5">
                      Congratulations! 🎉
                    </h3>

                    {result?.code ? (
                      <>
                        <p className="text-[#ff4d1a] font-extrabold text-sm tracking-wide mb-1">
                          YOU WON {result.label}!
                        </p>
                        <p className="text-gray-600 text-xs text-center mb-3 leading-relaxed font-medium">
                          Use the code below at checkout on any tech gadget.
                        </p>

                        {/* Code box */}
                        <div className="w-full border-2 border-dashed border-gray-300 rounded-xl p-3 mb-3">
                          <p className="text-gray-700 text-[10px] font-extrabold tracking-widest text-center mb-2 uppercase">
                            Your Promo Code
                          </p>
                          <div className="flex items-center justify-center gap-1.5">
                            {result.code.split("").map((char, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.06 }}
                                className="w-7 h-8 rounded-md flex items-center justify-center font-extrabold text-sm"
                                style={{
                                  background: "rgba(255,77,26,0.08)",
                                  color: "#ff4d1a",
                                  border: "1.5px solid rgba(255,77,26,0.2)",
                                }}
                              >
                                {char}
                              </motion.div>
                            ))}
                            <button
                              onClick={copyCode}
                              className="w-7 h-8 rounded-md flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition text-sm ml-0.5 font-bold"
                              title="Copy"
                            >
                              {copied ? "✅" : "📋"}
                            </button>
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => (window.location.href = "/shop")}
                          className="w-full py-2.5 rounded-xl font-extrabold text-white text-sm"
                          style={{
                            background: "linear-gradient(135deg,#ff4d1a,#ff7043)",
                            boxShadow: "0 3px 12px rgba(255,77,26,0.4)",
                          }}
                        >
                          Shop Now →
                        </motion.button>

                        <p className="text-gray-500 text-[10px] mt-2 text-center font-medium">
                          * Valid 24 hrs. Cannot combine with other offers.
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-gray-700 text-xs text-center mb-3 mt-1 font-medium">
                          Better luck next time! Come back tomorrow 🙏
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setIsOpen(false)}
                          className="w-full py-2.5 rounded-xl font-extrabold text-white text-sm"
                          style={{
                            background: "linear-gradient(135deg,#ff4d1a,#ff7043)",
                            boxShadow: "0 3px 12px rgba(255,77,26,0.4)",
                          }}
                        >
                          Continue Shopping
                        </motion.button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}