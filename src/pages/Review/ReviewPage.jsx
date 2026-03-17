// pages/Review/ReviewPage.jsx
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { fadeUp } from '../../utils/animations.js'
import { buildSEO } from '../../seo/seoConfig.js'

export default function ReviewPage() {
  const { slug } = useParams()
  const title = slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Review'
  const seo = buildSEO({ title: `${title} Review`, url: `/review/${slug}` })

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={`Unfiltered, honest review of ${title} by our expert team.`} />
        <link rel="canonical" href={seo.canonical} />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A]">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mx-auto px-4 sm:px-6 py-16"
        >
          {/* Breadcrumb */}
          <nav className="text-xs text-[#555] font-body mb-6">
            <a href="/" className="hover:text-white">Home</a>
            <span className="mx-2">/</span>
            <a href="/blogs" className="hover:text-white">Reviews</a>
            <span className="mx-2">/</span>
            <span className="text-white">{title}</span>
          </nav>

          <span className="inline-block bg-primary text-white text-xs font-mono font-500 px-3 py-1 rounded mb-4">
            IN-DEPTH REVIEW
          </span>

          <h1 className="font-heading font-800 text-3xl md:text-4xl text-white mb-4 leading-tight">{title}</h1>

          <p className="text-[#888] font-body text-base leading-relaxed mb-8">
            Our team spent 2 weeks with this product before writing a single word. Here's our honest, unsponsored verdict.
          </p>

          {/* Review Score Card */}
          <div className="bg-[#111] border border-[rgba(255,255,255,0.06)] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-700 text-white text-lg">Overall Score</h2>
              <div className="flex items-end gap-1">
                <span className="font-heading font-800 text-5xl text-primary">8.4</span>
                <span className="text-[#555] font-body text-sm mb-1">/10</span>
              </div>
            </div>
            {['Performance', 'Value for Money', 'Build Quality', 'Software'].map((cat, i) => (
              <div key={cat} className="mb-3">
                <div className="flex justify-between text-xs font-body text-[#888] mb-1">
                  <span>{cat}</span>
                  <span className="text-white font-500">{[8.5, 8.0, 9.0, 7.5][i]}</span>
                </div>
                <div className="h-1.5 bg-[#1A1A1A] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${[85, 80, 90, 75][i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {['What We Love', "What We Don't", 'Should You Buy?'].map((section) => (
              <div key={section}>
                <h2 className="font-heading font-700 text-white text-xl mb-3 border-l-2 border-primary pl-4">{section}</h2>
                <p className="text-[#777] font-body text-sm leading-relaxed">
                  Full review content will be populated from the CMS. This section demonstrates the review page layout with proper heading hierarchy for SEO.
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}
