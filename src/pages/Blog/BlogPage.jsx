// pages/Blog/BlogPage.jsx
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, viewportOnce } from '../../utils/animations.js'
import BlogCard from '../../components/cards/BlogCard.jsx'
import { BlogCardSkeleton } from '../../components/common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'
import { buildSEO } from '../../seo/seoConfig.js'

export default function BlogPage() {
  const { data: blogs, loading } = useFetch(() => cmsService.getLatestBlogs(), [])
  const seo = buildSEO({ title: 'Tech Blogs & Reviews', url: '/blogs' })

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content="In-depth gadget reviews, buying guides, and tech explainers from the Unfiltered Gadgets lab." />
        <link rel="canonical" href={seo.canonical} />
      </Helmet>

      <div className="min-h-screen bg-[#0A0A0A]">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="bg-[#0D0D0D] border-b border-[rgba(255,255,255,0.05)] py-14"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-primary text-xs font-mono font-500 uppercase tracking-widest mb-3 block">The Lab</span>
            <h1 className="font-heading font-800 text-4xl md:text-5xl text-white mb-4">Tech Blogs & Reviews</h1>
            <p className="text-[#666] font-body text-base max-w-lg">
              No sponsored content. No PR fluff. Just honest, research-backed tech journalism.
            </p>
          </div>
        </motion.div>

        {/* Blog Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => <BlogCardSkeleton key={i} />)}
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
            >
              {blogs?.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </>
  )
}
