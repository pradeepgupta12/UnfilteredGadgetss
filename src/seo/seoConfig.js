export const siteConfig = {
  name: 'Unfiltered Gadgets',
  tagline: 'Gadgets Without Gimmicks',
  description:
    'Unfiltered Gadgets – No paid reviews. No inflated specs. Just real performance data, honest pros & cons, and gadgets that actually deserve your money.',
  url: 'https://www.unfilteredgadgets.com',
  logo: '/logo.png',
  twitterHandle: '@UnfilteredGadgets',
  themeColor: '#FF4500',
}

export const buildSEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
} = {}) => ({
  title: title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} – ${siteConfig.tagline}`,
  description: description || siteConfig.description,
  canonical: url ? `${siteConfig.url}${url}` : siteConfig.url,
  og: {
    title: title || siteConfig.name,
    description: description || siteConfig.description,
    image: image || `${siteConfig.url}/og-image.jpg`,
    url: url ? `${siteConfig.url}${url}` : siteConfig.url,
    type,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.twitterHandle,
    title: title || siteConfig.name,
    description: description || siteConfig.description,
    image: image || `${siteConfig.url}/og-image.jpg`,
  },
})

// Schema markup helpers
export const buildProductSchema = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  image: product.image,
  offers: {
    '@type': 'Offer',
    price: product.currentPrice,
    priceCurrency: 'INR',
    availability: 'https://schema.org/InStock',
  },
})

export const buildBlogSchema = (blog) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: blog.title,
  description: blog.excerpt,
  image: blog.image,
  author: { '@type': 'Person', name: blog.author },
  datePublished: blog.date,
})
