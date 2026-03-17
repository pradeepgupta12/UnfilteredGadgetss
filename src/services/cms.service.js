// services/cms.service.js
import { dealsData, topDealsData, brandDealsData } from '../data/deals.data.js'
import { productsData } from '../data/products.data.js'
import { blogsData } from '../data/blogs.data.js'
import { collectionsData } from '../data/collections.data.js'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms))

export const cmsService = {
  async getLimitedDeals()     { await delay(); return dealsData },
  async getTopDeals()         { await delay(); return topDealsData },
  async getBrandDeals()       { await delay(); return brandDealsData },
  async getFeaturedProducts() { await delay(); return productsData },
  async getLatestBlogs()      { await delay(); return blogsData },
  async getCollections()      { await delay(); return collectionsData },
  async getCoupons() {
    await delay()
    return [
      { id: 1, code: 'UNFIL50',   label: '₹50 off on Accessories',  icon: '🎁' },
      { id: 2, code: 'UNFIL500',  label: '₹500 off on Headphones',  icon: '🎧' },
      { id: 3, code: 'UNFIL1000', label: '₹1000 off on Mobiles',    icon: '📱' },
      { id: 4, code: 'UNFIL3000', label: '₹3000 off on Cameras',    icon: '📷' },
      { id: 5, code: 'UNFIL2000', label: '₹2000 off on Laptops',    icon: '💻' },
    ]
  },
}
