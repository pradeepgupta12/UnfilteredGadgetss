// /data/site.data.js
// Structured like API response → swap with GET /api/site later

export const couponsData = [
  { id: 'coup-001', code: 'UNFIL50', label: '₹50 off on Accessories', icon: '🏷️' },
  { id: 'coup-002', code: 'UNFIL500', label: '₹500 off on Headphones', icon: '🎧' },
  { id: 'coup-003', code: 'UNFIL1000', label: '₹1000 off on Mobiles', icon: '📱' },
  { id: 'coup-004', code: 'UNFIL3000', label: '₹3000 off on Cameras', icon: '📷' },
  { id: 'coup-005', code: 'UNFIL2000', label: '₹2000 off on Laptops', icon: '💻' },
]

export const offerBarMessages = [
  '• Offers 20% discount on Mobiles',
  '• Offers 30% discount on Mobiles',
  '• Offers 20% discount on Mobiles',
  '• Offers 25% discount on Mobiles',
  '• Offers 30% discount on Mobiles',
  '• Offers 20%',
]

export const navCategories = [
  { label: 'Mobiles', slug: 'mobiles' },
  { label: 'Laptops', slug: 'laptops' },
  { label: 'Audio', slug: 'audio' },
  { label: 'Smartwatches', slug: 'smartwatches' },
  { label: 'Camera', slug: 'camera' },
]

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'About Us', href: '/aboutus' },
]

export const featuresData = [
  {
    id: 'feat-001',
    icon: '📦',
    title: 'Curated Inventory',
    description: "We don't sell everything. We only sell what we've personally tested and would recommend to our family.",
  },
  {
    id: 'feat-002',
    icon: '🔬',
    title: 'Tested by Experts',
    description: "Our reviews aren't bought. We spend weeks with every device before it hits our shop shelves.",
  },
  {
    id: 'feat-003',
    icon: '🛡️',
    title: 'Genuine Warranty',
    description: "Direct brand warranty plus our internal 'no hassle' support for the first 12 months of your purchase.",
  },
]

export const footerLinks = {
  shop: [
    { label: 'All Products', href: '/shop' },
    { label: 'New Arrivals', href: '/new' },
    { label: 'Hot Deals', href: '/deals' },
    { label: 'Pre-owned', href: '/pre-owned' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'Testing Policies', href: '/testing' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Returns', href: '/returns' },
    { label: 'Shipping', href: '/shipping' },
  ],
}
