// components/sections/LatestBlogs.jsx
import { motion } from 'framer-motion'
import { staggerContainer, viewportOnce } from '../../utils/animations.js'
import SectionWrapper, { SectionHeader } from '../layout/SectionWrapper.jsx'
import BlogCard from '../cards/BlogCard.jsx'
import { SectionSkeleton, BlogCardSkeleton } from '../common/SkeletonLoader.jsx'
import { useFetch } from '../../hooks/useFetch.js'
import { cmsService } from '../../services/cms.service.js'

export default function LatestBlogs() {
  const { data: blogs, loading } = useFetch(() => cmsService.getLatestBlogs(), [])

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-start justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-700 text-black uppercase tracking-wide font-bold">
            Latest Blogs
          </h2>
          <a href="/blogs" className="text-primary text-sm font-body font-500 hover:text-primary-light transition-colors mt-1">
            VIEW ALL →
          </a>
        </div>

        {loading ? (
          <SectionSkeleton cards={4} CardSkeleton={BlogCardSkeleton} />
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
    </section>
  )
}
