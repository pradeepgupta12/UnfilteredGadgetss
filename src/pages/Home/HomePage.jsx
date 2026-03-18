


// // pages/Home/HomePage.jsx
// import { Helmet } from 'react-helmet-async'
// import { buildSEO } from '../../seo/seoConfig.js'

// import HeroSection from '../../components/sections/HeroSection.jsx'
// import LimitedDeals from '../../components/sections/LimitedDeals.jsx'
// import CuratedCollections from '../../components/sections/CuratedCollections.jsx'
// import BrandDeals from '../../components/sections/BrandDeals.jsx'
// import PromoBanner from '../../components/sections/PromoBanner.jsx'
// import FeaturedProducts from '../../components/sections/FeaturedProducts.jsx'
// import CouponVault from '../../components/sections/CouponVault.jsx'
// import TopDeals from '../../components/sections/TopDeals.jsx'
// import FeaturesSection from '../../components/sections/FeaturesSection.jsx'
// import LatestBlogs from '../../components/sections/LatestBlogs.jsx'

// export default function HomePage() {
//   const seo = buildSEO({})

//   return (
//     <div className=" min-h-screen">
//       <Helmet>
//         <title>{seo.title}</title>
//         <meta name="description" content={seo.description} />
//         <link rel="canonical" href={seo.canonical} />

//         {/* OpenGraph */}
//         <meta property="og:title" content={seo.og.title} />
//         <meta property="og:description" content={seo.og.description} />
//         <meta property="og:image" content={seo.og.image} />
//         <meta property="og:url" content={seo.og.url} />
//         <meta property="og:type" content={seo.og.type} />
//         <meta property="og:site_name" content={seo.og.siteName} />

//         {/* Twitter */}
//         <meta name="twitter:card" content={seo.twitter.card} />
//         <meta name="twitter:site" content={seo.twitter.site} />
//         <meta name="twitter:title" content={seo.twitter.title} />
//         <meta name="twitter:description" content={seo.twitter.description} />
//         <meta name="twitter:image" content={seo.twitter.image} />

//         {/* Schema */}
//         <script type="application/ld+json">
//           {JSON.stringify({
//             '@context': 'https://schema.org',
//             '@type': 'WebSite',
//             name: 'Unfiltered Gadgets',
//             url: 'https://www.unfilteredgadgets.com',
//             description: seo.description,
//           })}
//         </script>
//       </Helmet>

//       <HeroSection />
//       <LimitedDeals />
//       <CuratedCollections />
//       <BrandDeals />
//       <PromoBanner />
//       <FeaturedProducts />
//       <CouponVault />
//       <TopDeals />
//       <FeaturesSection />
//       <LatestBlogs />
//     </div>
//   )
// }

// pages/Home/HomePage.jsx
import { Helmet } from 'react-helmet-async'
import { buildSEO } from '../../seo/seoConfig.js'

import HeroSection from '../../components/sections/HeroSection.jsx'
import LimitedDeals from '../../components/sections/LimitedDeals.jsx'
import CuratedCollections from '../../components/sections/CuratedCollections.jsx'
import BrandDeals from '../../components/sections/BrandDeals.jsx'
import PromoBanner from '../../components/sections/PromoBanner.jsx'
import FeaturedProducts from '../../components/sections/FeaturedProducts.jsx'
import CouponVault from '../../components/sections/CouponVault.jsx'
import TopDeals from '../../components/sections/TopDeals.jsx'
import FeaturesSection from '../../components/sections/FeaturesSection.jsx'
import LatestBlogs from '../../components/sections/LatestBlogs.jsx'
import SpinWheelCoupon from '../../components/SpinWheelCoupon.jsx'

export default function HomePage() {
  const seo = buildSEO({})

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <link rel="canonical" href={seo.canonical} />

        {/* OpenGraph */}
        <meta property="og:title" content={seo.og.title} />
        <meta property="og:description" content={seo.og.description} />
        <meta property="og:image" content={seo.og.image} />
        <meta property="og:url" content={seo.og.url} />
        <meta property="og:type" content={seo.og.type} />
        <meta property="og:site_name" content={seo.og.siteName} />

        {/* Twitter */}
        <meta name="twitter:card" content={seo.twitter.card} />
        <meta name="twitter:site" content={seo.twitter.site} />
        <meta name="twitter:title" content={seo.twitter.title} />
        <meta name="twitter:description" content={seo.twitter.description} />
        <meta name="twitter:image" content={seo.twitter.image} />

        {/* Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Unfiltered Gadgets',
            url: 'https://www.unfilteredgadgets.com',
            description: seo.description,
          })}
        </script>
      </Helmet>

      <HeroSection />
      <LimitedDeals />
      <CuratedCollections />
      <BrandDeals />
      <PromoBanner />
      <FeaturedProducts />
      <CouponVault />
      <TopDeals />
      <FeaturesSection />
      <LatestBlogs />

      {/* Spin Wheel - fixed bottom right, shows on every page load */}
      <SpinWheelCoupon />
    </div>
  )
}