// import { useState, useEffect, useRef } from "react";

// // ========== JSON DATA ==========
// const data = {
//   site: { name: "TechDeals" },
//   hero: {
//     heading_line1: "Redefining Value in",
//     heading_line2: "Premium Tech.",
//     description:
//       "We believe everyone deserves access to the best electronic devices without the premium price tag. Discover how we source and curate the world's best tech deals.",
//   },
//   mission: {
//     label: "OUR MISSION",
//     heading: "Making High-End Technology Accessible to Everyone",
//     description:
//       "Our commitment is simple: bridge the gap between innovation and affordability. By leveraging direct partnerships with manufacturers and mastering the certified refurbishment process, we ensure quality is never compromised for price.",
//     badge_text: "Trustworthy deals, verified for performance.",
//     image_url:
//       "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
//     image_alt: "Premium laptop on dark background",
//   },
//   why_choose: {
//     heading: "Why Choose TechDeals?",
//     subheading:
//       "We've built our reputation on three core pillars that guarantee a superior shopping experience for our community.",
//     cards: [
//       {
//         id: 1,
//         icon: "certified",
//         title: "Certified Refurbished",
//         description:
//           "Every pre-owned device undergoes a rigorous 50-point inspection to ensure it performs like new.",
//       },
//       {
//         id: 2,
//         icon: "price",
//         title: "Price Match Guarantee",
//         description:
//           "Found a better deal elsewhere? We'll match it. We are dedicated to offering the lowest prices on the market.",
//       },
//       {
//         id: 3,
//         icon: "shipping",
//         title: "Fast & Free Shipping",
//         description:
//           "Get your tech when you need it. We offer free 2-day shipping on all orders over $99 nationwide.",
//       },
//     ],
//   },
//   cta: {
//     heading: "Ready to find your next upgrade?",
//     subheading:
//       "Join over 100,000 smart shoppers who never pay full price for technology.",
//     button_text: "Browse Today's Deals",
//   },
// };

// // ========== SCROLL REVEAL HOOK ==========
// function useReveal(delay = 0, from = "bottom") {
//   const ref = useRef(null);
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const obs = new IntersectionObserver(
//       ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
//       { threshold: 0.1 }
//     );
//     obs.observe(el);
//     return () => obs.disconnect();
//   }, []);
//   const tx = from === "left" ? "-48px" : from === "right" ? "48px" : "0px";
//   const ty = from === "bottom" ? "36px" : "0px";
//   return {
//     ref,
//     style: {
//       opacity: visible ? 1 : 0,
//       transform: visible ? "translate(0,0)" : `translate(${tx},${ty})`,
//       transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
//     },
//   };
// }

// // ========== ICONS ==========
// const ShieldIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05a2b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
//   </svg>
// );
// const CertifiedIcon = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e05a2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="3" width="20" height="14" rx="2" />
//     <line x1="8" y1="21" x2="16" y2="21" />
//     <line x1="12" y1="17" x2="12" y2="21" />
//     <circle cx="12" cy="10" r="3" />
//   </svg>
// );
// const PriceIcon = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e05a2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="2" y="5" width="20" height="14" rx="2" />
//     <line x1="2" y1="10" x2="22" y2="10" />
//     <line x1="6" y1="15" x2="10" y2="15" />
//   </svg>
// );
// const ShippingIcon = () => (
//   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e05a2b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
//     <rect x="1" y="3" width="15" height="13" rx="1" />
//     <path d="M16 8h4l3 5v3h-7V8z" />
//     <circle cx="5.5" cy="18.5" r="2.5" />
//     <circle cx="18.5" cy="18.5" r="2.5" />
//   </svg>
// );
// const iconMap = { certified: CertifiedIcon, price: PriceIcon, shipping: ShippingIcon };

// // ========== HERO ==========
// function Hero() {
//   const h = useReveal(0);
//   const p = useReveal(150);
//   return (
//     <section style={{
//       background: "linear-gradient(180deg, #2c4a41 0%, #1d3830 55%, #163129 100%)",
//       padding: "56px 24px 52px",
//       textAlign: "center",
//     }}>
//       <div style={{ maxWidth: "500px", margin: "0 auto" }}>
//         <h1 ref={h.ref} style={{
//           ...h.style,
//           fontSize: "28px", fontWeight: 800,
//           color: "#fff", lineHeight: 1.25, marginBottom: "16px",
//         }}>
//           {data.hero.heading_line1}
//           <br />
//           <span style={{ color: "#e8581a", fontStyle: "italic" }}>
//             {data.hero.heading_line2}
//           </span>
//         </h1>
//         <p ref={p.ref} style={{
//           ...p.style,
//           color: "rgba(255,255,255,0.72)",
//           fontSize: "13px", lineHeight: 1.75,
//         }}>
//           {data.hero.description}
//         </p>
//       </div>
//     </section>
//   );
// }

// // ========== MISSION ==========
// function Mission() {
//   const left  = useReveal(0,   "left");
//   const right = useReveal(100, "right");
//   return (
//     <section style={{ background: "#fff", padding: "48px 24px" }}>
//       <div style={{
//         maxWidth: "820px", margin: "0 auto",
//         display: "flex", flexWrap: "wrap",
//         gap: "40px", alignItems: "center",
//       }}>
//         {/* text */}
//         <div ref={left.ref} style={{ ...left.style, flex: "1 1 280px", minWidth: 0 }}>
//           <p style={{
//             color: "#e05a2b", fontSize: "10px",
//             fontWeight: 700, letterSpacing: "2px",
//             textTransform: "uppercase", marginBottom: "10px",
//           }}>
//             {data.mission.label}
//           </p>
//           <h2 style={{
//             fontSize: "21px", fontWeight: 800,
//             color: "#111", lineHeight: 1.25, marginBottom: "12px",
//           }}>
//             {data.mission.heading}
//           </h2>
//           <p style={{
//             fontSize: "12.5px", color: "#555",
//             lineHeight: 1.75, marginBottom: "18px",
//           }}>
//             {data.mission.description}
//           </p>
//           <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
//             <ShieldIcon />
//             <span style={{ color: "#e05a2b", fontSize: "12px", fontWeight: 600 }}>
//               {data.mission.badge_text}
//             </span>
//           </div>
//         </div>
//         {/* image */}
//         <div ref={right.ref} style={{ ...right.style, flex: "0 0 auto" }}>
//           <div style={{
//             width: "210px", height: "160px",
//             borderRadius: "10px", overflow: "hidden",
//             boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
//           }}>
//             <img
//               src={data.mission.image_url}
//               alt={data.mission.image_alt}
//               style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ========== CARD ==========
// function FeatureCard({ card, delay }) {
//   const rev = useReveal(delay);
//   const Icon = iconMap[card.icon];
//   const [hovered, setHovered] = useState(false);
//   return (
//     <div
//       ref={rev.ref}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       style={{
//         ...rev.style,
//         flex: "1 1 180px", minWidth: 0,
//         background: "#fff",
//         borderRadius: "10px",
//         padding: "28px 20px",
//         textAlign: "center",
//         boxShadow: hovered ? "0 8px 28px rgba(0,0,0,0.13)" : "0 2px 10px rgba(0,0,0,0.07)",
//         transform: (hovered ? "translateY(-4px)" : "translateY(0)") + " " + (rev.style.transform || ""),
//         transition: rev.style.transition + ", box-shadow 0.25s, transform 0.25s",
//       }}
//     >
//       <div style={{
//         width: "50px", height: "50px",
//         background: "rgba(224,90,43,0.09)",
//         borderRadius: "10px",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         margin: "0 auto 16px",
//       }}>
//         <Icon />
//       </div>
//       <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>
//         {card.title}
//       </h3>
//       <p style={{ fontSize: "11.5px", color: "#888", lineHeight: 1.7 }}>
//         {card.description}
//       </p>
//     </div>
//   );
// }

// // ========== WHY CHOOSE ==========
// function WhyChoose() {
//   const header = useReveal(0);
//   return (
//     <section style={{ background: "#e8eceb", padding: "52px 24px" }}>
//       <div ref={header.ref} style={{ ...header.style, textAlign: "center", marginBottom: "32px" }}>
//         <h2 style={{ fontSize: "21px", fontWeight: 700, color: "#111", marginBottom: "10px" }}>
//           {data.why_choose.heading}
//         </h2>
//         <p style={{
//           fontSize: "12px", color: "#666",
//           maxWidth: "380px", margin: "0 auto", lineHeight: 1.7,
//         }}>
//           {data.why_choose.subheading}
//         </p>
//       </div>
//       <div style={{
//         display: "flex", gap: "16px",
//         maxWidth: "820px", margin: "0 auto",
//         flexWrap: "wrap",
//       }}>
//         {data.why_choose.cards.map((card, i) => (
//           <FeatureCard key={card.id} card={card} delay={i * 100} />
//         ))}
//       </div>
//     </section>
//   );
// }

// // ========== CTA ==========
// function CTA() {
//   const rev = useReveal(0);
//   const [hovered, setHovered] = useState(false);
//   return (
//     <section style={{ background: "#e05a2b", padding: "56px 24px", textAlign: "center" }}>
//       <div ref={rev.ref} style={{ ...rev.style, maxWidth: "480px", margin: "0 auto" }}>
//         <h2 style={{
//           fontSize: "26px", fontWeight: 700,
//           color: "#fff", lineHeight: 1.2, marginBottom: "10px",
//         }}>
//           {data.cta.heading}
//         </h2>
//         <p style={{
//           fontSize: "12.5px", color: "rgba(255,255,255,0.85)",
//           marginBottom: "24px", lineHeight: 1.65,
//         }}>
//           {data.cta.subheading}
//         </p>
//         <button
//           onMouseEnter={() => setHovered(true)}
//           onMouseLeave={() => setHovered(false)}
//           style={{
//             background: "#fff", color: "#e05a2b",
//             border: "none", borderRadius: "6px",
//             padding: "11px 28px",
//             fontWeight: 700, fontSize: "13px",
//             cursor: "pointer",
//             transform: hovered ? "translateY(-2px)" : "none",
//             boxShadow: hovered ? "0 6px 20px rgba(0,0,0,0.22)" : "0 2px 10px rgba(0,0,0,0.15)",
//             transition: "transform 0.2s, box-shadow 0.2s",
//           }}
//         >
//           {data.cta.button_text}
//         </button>
//       </div>
//     </section>
//   );
// }

// // ========== ROOT ==========
// export default function AboutPage() {
//   return (
//     <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", minHeight: "100vh" }}>
//       <Hero />
//       <Mission />
//       <WhyChoose />
//       <CTA />
//     </div>
//   );
// }


// pages/about.jsx
import { motion } from "framer-motion";
import { 
  HiOutlineShieldCheck, 
  HiOutlineBadgeCheck, 
  HiOutlineTruck, 
  HiOutlineCurrencyDollar,
  HiOutlineSparkles,
  HiOutlineHeart
} from "react-icons/hi";
import { FiAward, FiCpu, FiSmartphone } from "react-icons/fi";
import { BsLaptop, BsPhone, BsWatch, BsHeadphones } from "react-icons/bs";
import data from "../../data//about.data.json";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  // Icon mapping for why choose cards
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'certified':
        return <HiOutlineShieldCheck className="w-8 h-8 text-[#e8591a]" />;
      case 'price':
        return <HiOutlineCurrencyDollar className="w-8 h-8 text-[#e8591a]" />;
      case 'shipping':
        return <HiOutlineTruck className="w-8 h-8 text-[#e8591a]" />;
      case 'quality':
        return <HiOutlineBadgeCheck className="w-8 h-8 text-[#e8591a]" />;
      case 'warranty':
        return <FiAward className="w-8 h-8 text-[#e8591a]" />;
      default:
        return <HiOutlineSparkles className="w-8 h-8 text-[#e8591a]" />;
    }
  };

  return (
    <main className="font-sans overflow-x-hidden">

      {/* HERO SECTION - with background image overlay - FULLY RESPONSIVE NOW */}
      <section className="relative bg-gradient-to-br from-[#1a332c] to-[#0f241e] py-16 md:py-20 lg:py-28 overflow-hidden">
        {/* Abstract tech pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-white/20 text-6xl md:text-8xl">⌘</div>
          <div className="absolute bottom-10 right-10 text-white/20 text-6xl md:text-8xl">⚡</div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/10 text-7xl md:text-9xl">⎔</div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-white/10 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-[#e8591a] font-semibold text-xs sm:text-sm flex items-center gap-1 sm:gap-2">
                <HiOutlineSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="truncate">{data.hero.trust_badge || "TRUSTED BY 100K+ USERS"}</span>
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-extrabold text-white leading-tight px-2 sm:px-4"
            >
              {data.hero.heading_line1}
              <br className="hidden xs:block" />
              <span className="text-[#e8591a] italic bg-gradient-to-r from-[#e8591a] to-[#ff7e3a] bg-clip-text text-transparent break-words">
                {data.hero.heading_line2}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              className="w-full max-w-xs sm:max-w-sm md:max-w-2xl mx-auto mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4 sm:px-6"
            >
              {data.hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center px-4"
            >
              {data.hero.stats?.map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-lg min-w-[80px] sm:min-w-[100px]">
                  <div className="text-lg sm:text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-300 whitespace-nowrap">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* MISSION SECTION - with proper image */}
      <section className="bg-white py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="px-2 sm:px-4"
            >
              <div className="inline-block bg-[#e8591a]/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4">
                <p className="text-[#e8591a] text-xs sm:text-sm font-bold tracking-widest flex items-center gap-1 sm:gap-2">
                  <HiOutlineHeart className="w-3 h-3 sm:w-4 sm:h-4" />
                  {data.mission.label}
                </p>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-900 leading-tight">
                {data.mission.heading}
              </h2>

              <div className="w-16 sm:w-20 h-1 bg-[#e8591a] mt-4 mb-4 sm:mb-6"></div>

              <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">
                {data.mission.description}
              </p>

              <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4">
                {data.mission.key_points?.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#e8591a]/20 flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#e8591a]"></div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{point}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 sm:gap-3 mt-6 sm:mt-8 bg-gray-50 p-3 sm:p-4 rounded-lg border-l-4 border-[#e8591a]">
                <HiOutlineBadgeCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#e8591a] flex-shrink-0" />
                <span className="text-sm sm:text-base font-semibold text-gray-800">{data.mission.badge_text}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative px-2 sm:px-4"
            >
              {/* Main image with tech devices overlay */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={data.mission.image_url} 
                  alt={data.mission.image_alt}
                  className="w-full h-auto object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Floating tech icons - responsive sizing */}
                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between gap-1 sm:gap-2">
                  <div className="bg-white/90 backdrop-blur p-2 sm:p-3 rounded-lg shadow-lg">
                    <BsLaptop className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#e8591a]" />
                  </div>
                  <div className="bg-white/90 backdrop-blur p-2 sm:p-3 rounded-lg shadow-lg">
                    <BsPhone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#e8591a]" />
                  </div>
                  <div className="bg-white/90 backdrop-blur p-2 sm:p-3 rounded-lg shadow-lg">
                    <BsWatch className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#e8591a]" />
                  </div>
                  <div className="bg-white/90 backdrop-blur p-2 sm:p-3 rounded-lg shadow-lg">
                    <BsHeadphones className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#e8591a]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US - with icons and proper cards */}
      <section className="bg-gray-50 py-16 md:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16 px-4"
          >
            <span className="text-[#e8591a] font-semibold text-xs sm:text-sm tracking-wider uppercase">
              {data.why_choose.label || "WHY US"}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 text-gray-900">
              {data.why_choose.heading}
            </h2>
            <p className="max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-gray-600">
              {data.why_choose.subheading}
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {data.why_choose.cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Icon container with gradient background */}
                <div className="relative mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-[#e8591a]/20 to-[#ff7e3a]/10 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-white rounded-lg sm:rounded-xl shadow-md flex items-center justify-center">
                      {getIcon(card.icon)}
                    </div>
                  </div>
                  
                  {/* Decorative dot */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-[#e8591a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 sm:mb-3">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                  {card.description}
                </p>

                {/* Feature list if available */}
                {card.features && (
                  <ul className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
                    {card.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600">
                        <HiOutlineBadgeCheck className="w-3 h-3 sm:w-4 sm:h-4 text-[#e8591a] flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Hover effect line */}
                <div className="w-8 sm:w-12 h-1 bg-[#e8591a]/30 rounded-full mt-4 sm:mt-6 group-hover:w-12 sm:group-hover:w-20 transition-all duration-300"></div>
              </motion.div>
            ))}
          </div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 items-center px-4"
          >
            {data.why_choose.trust_badges?.map((badge, idx) => (
              <div key={idx} className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base text-gray-600">
                <FiAward className="w-4 h-4 sm:w-5 sm:h-5 text-[#e8591a] flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-r from-[#1a332c] to-[#0f241e]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#e8591a] to-[#ff7e3a] rounded-2xl sm:rounded-3xl text-center py-10 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -mr-16 sm:-mr-20 -mt-16 sm:-mt-20"></div>
            <div className="absolute bottom-0 left-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/10 rounded-full -ml-16 sm:-ml-20 -mb-16 sm:-mb-20"></div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white relative z-10 px-2">
              {data.cta.heading}
            </h2>
            
            <p className="text-orange-100 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg max-w-2xl mx-auto relative z-10 px-4">
              {data.cta.subheading}
            </p>

            {/* User avatars */}
            <div className="flex justify-center -space-x-2 sm:-space-x-3 mt-6 sm:mt-8 relative z-10">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-bold overflow-hidden">
                  <img src={`https://i.pravatar.cc/40?img=${i}`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full border-2 border-white bg-white/20 backdrop-blur flex items-center justify-center text-white text-[10px] sm:text-xs font-bold">
                +100k
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 sm:mt-8 bg-white text-[#e8591a] font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-3xl sm:rounded-3xl hover:shadow-xl transition-all duration-300 relative z-10 text-sm sm:text-base md:text-lg group"
            >
              <span className="flex items-center gap-1 sm:gap-2">
                {data.cta.button_text}
                <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </motion.button>

            {/* Trust text */}
            <p className="text-orange-100 text-xs sm:text-sm mt-3 sm:mt-4 relative z-10">
              ⚡ Free shipping on orders over $99 • 30-day returns
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}