export const collectionsData = [
  {
    id: 'col-001',
    slug: 'wfh-heroes',                          // URL: /category/wfh-heroes
    title: 'WFH Heroes',
    subtitle: 'Productivity beasts for your home office.',
    description: 'Everything you need to build the perfect work-from-home setup.',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&q=80',
    tag: 'Home Office',
    ctaLabel: 'Explore Kit',
    // ✅ Add/remove product slugs here to control what shows on /category/wfh-heroes
    productIds: [
      'apple-macbook-air-m4',
      'dell-xps-15-9530',
      'lenovo-thinkpad-x1-carbon',
      'sony-wh-1000xm6',
      'samsung-galaxy-watch-7',
    ],
  },
  {
    id: 'col-002',
    slug: 'music-aficionados',                   // URL: /category/music-aficionados
    title: 'Music Aficionados',
    subtitle: 'High-fidelity gear for pure audio bliss.',
    description: 'Audiophile-grade equipment for those who live for sound.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    tag: 'Audio',
    ctaLabel: 'Explore Kit',
    // ✅ Add/remove product slugs here
    productIds: [
      'sony-wh-1000xm6',
    ],
  },
  {
    id: 'col-003',
    slug: 'marathon-runners',                    // URL: /category/marathon-runners
    title: 'Marathon Runners',
    subtitle: 'Reliable fitness tech that keeps the pace.',
    description: 'Performance tracking gear for serious athletes.',
    image: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
    tag: 'Fitness',
    ctaLabel: 'Explore Kit',
    // ✅ Add/remove product slugs here
    productIds: [
      'samsung-galaxy-watch-7',
      'oneplus-watch-2r',
      'noise-halo-2',
    ],
  },
]

export default collectionsData