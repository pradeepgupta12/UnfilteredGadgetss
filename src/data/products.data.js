// data/products.data.js

// ─── FILTER CONFIGS per category ──────────────────────────────────────────────
export const CATEGORY_FILTERS = {
  mobiles: {
    brands:   ['Samsung', 'Apple', 'Motorola', 'OnePlus', 'Xiaomi', 'Realme'],
    ram:      ['4GB', '6GB', '8GB', '12GB', '16GB'],
    storage:  ['64GB', '128GB', '256GB', '512GB'],
    battery:  ['Under 4000mAh', '4000–5000mAh', 'Above 5000mAh'],
    display:  ['Under 6.5"', '6.5"–6.8"', 'Above 6.8"'],
    price:    [
      { label: 'Under ₹15,000',        min: 0,      max: 15000  },
      { label: '₹15,000 – ₹30,000',    min: 15000,  max: 30000  },
      { label: '₹30,000 – ₹60,000',    min: 30000,  max: 60000  },
      { label: '₹60,000 – ₹1,00,000',  min: 60000,  max: 100000 },
      { label: 'Above ₹1,00,000',       min: 100000, max: Infinity },
    ],
  },
  laptops: {
    brands:   ['Apple', 'Dell', 'HP', 'Lenovo', 'Asus', 'MSI'],
    ram:      ['8GB', '16GB', '32GB', '64GB'],
    storage:  ['256GB SSD', '512GB SSD', '1TB SSD', '2TB SSD'],
    processor:['Intel i5', 'Intel i7', 'Intel i9', 'AMD Ryzen 5', 'AMD Ryzen 7', 'Apple M3', 'Apple M4'],
    display:  ['13"–14"', '15"–16"', 'Above 16"'],
    price:    [
      { label: 'Under ₹50,000',         min: 0,      max: 50000  },
      { label: '₹50,000 – ₹80,000',     min: 50000,  max: 80000  },
      { label: '₹80,000 – ₹1,20,000',   min: 80000,  max: 120000 },
      { label: 'Above ₹1,20,000',        min: 120000, max: Infinity },
    ],
  },
  audio: {
    brands:   ['Sony', 'Bose', 'Apple', 'Samsung', 'JBL', 'Sennheiser'],
    type:     ['Over-Ear', 'In-Ear', 'True Wireless', 'Neckband'],
    anc:      ['With ANC', 'Without ANC'],
    battery:  ['Under 20hrs', '20–30hrs', 'Above 30hrs'],
    price:    [
      { label: 'Under ₹5,000',   min: 0,     max: 5000  },
      { label: '₹5,000–₹15,000', min: 5000,  max: 15000 },
      { label: '₹15,000–₹30,000',min: 15000, max: 30000 },
      { label: 'Above ₹30,000',  min: 30000, max: Infinity },
    ],
  },
  camera: {
    brands:   ['Canon', 'Nikon', 'Sony', 'Fujifilm', 'Panasonic'],
    type:     ['DSLR', 'Mirrorless', 'Point & Shoot', 'Action Camera'],
    sensor:   ['APS-C', 'Full Frame', 'Micro 4/3'],
    price:    [
      { label: 'Under ₹50,000',        min: 0,      max: 50000  },
      { label: '₹50,000 – ₹1,00,000',  min: 50000,  max: 100000 },
      { label: 'Above ₹1,00,000',       min: 100000, max: Infinity },
    ],
  },
smartwatches: {
  brands: ['Apple', 'Samsung', 'OnePlus', 'Noise', 'Realme', 'Fire-Boltt', 'boAt'],

  type: [
    'Premium Smartwatch',
    'Fitness Smartwatch',
    'Bluetooth Calling Watch',
    'Rugged Smartwatch'
  ],

  display: [
    'AMOLED',
    'OLED',
    'LCD',
    'HD Display'
  ],

  features: [
    'Bluetooth Calling',
    'GPS',
    'Heart Rate Monitor',
    'SpO2 Monitor',
    'Sleep Tracking',
    'Sports Modes',
    'Water Resistant'
  ],

  battery: [
    '1–3 Days',
    '3–7 Days',
    '7–14 Days',
    '14+ Days'
  ],

  price: [
    { label: 'Under ₹3,000',        min: 0,     max: 3000 },
    { label: '₹3,000 – ₹7,000',     min: 3000,  max: 7000 },
    { label: '₹7,000 – ₹15,000',    min: 7000,  max: 15000 },
    { label: 'Above ₹15,000',       min: 15000, max: Infinity },
  ],
}
}

// Default filters for All Products page
export const DEFAULT_FILTERS = {
  brands:  ['Samsung', 'Apple', 'Motorola', 'Sony', 'Canon', 'OnePlus', 'Dell', 'Bose'],
  price: [
    { label: 'Under ₹20,000',       min: 0,      max: 20000  },
    { label: '₹20,000 – ₹60,000',   min: 20000,  max: 60000  },
    { label: '₹60,000 – ₹1,00,000', min: 60000,  max: 100000 },
    { label: 'Above ₹1,00,000',      min: 100000, max: Infinity },
  ],
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
export const productsData = [

  // ══════════════════ MOBILES ══════════════════
  {
    id: 'samsung-galaxy-s26-ultra',
    slug: 'samsung-galaxy-s26-ultra',
    name: 'Samsung Galaxy S26 Ultra',
    shortName: 'Galaxy S26 Ultra',
    tagline: 'Titanium Black | 12GB RAM | 512GB',
    badge: 'UNFILTERED FLAGSHIP 2024',
    category: 'mobiles', brand: 'Samsung',
    displaySize: 'Above 6.8"', battery: '5000mAh', ram: '12GB', storage: '512GB',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=85',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=85',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=85',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=85',
    ],
    currentPrice: 79999, originalPrice: 89999, discount: 11,
    emiText: 'No Cost EMI from ₹6,666/mo', dealLink: 'https://amazon.in',
    expertScore: 9.4,
    scores: [{ label:'Display',value:9.2},{ label:'Camera',value:8.8},{ label:'Battery',value:9.5},{ label:'Power',value:9.8}],
    verdictPreview: '"The Galaxy S26 Ultra isn\'t just a phone; it\'s a statement. Raw, unadulterated performance when it actually matters."',
    verdict: 'After 30 days of testing: the most honest flagship of the year. Pushes the envelope in display tech and processing.',
    pros: ['Sustained 120fps gaming without throttling','Zero bloatware—cleanest Android skin','True 2-day battery life','Fastest fingerprint sensor in market'],
    cons: ['Industrial boxy design is polarising','Low-light video autofocus hunts occasionally','No charger in box'],
    reviews: [
      { id:1, user:'Rahul M', tag:'Verified Buyer', date:'2 days ago', rating:5, text:'Best phone I have ever used. Camera is absolutely insane.' },
      { id:2, user:'Priya S', tag:'Verified Buyer', date:'1 week ago', rating:4, text:'Battery life is exceptional. Easily 2 days on a single charge.' },
    ],
    ratingAvg: 4.6, ratingCount: 1200,
    ratingBreakdown: [{star:5,count:700},{star:4,count:300},{star:3,count:120},{star:2,count:50},{star:1,count:30}],
    specifications: {
      Display: { 'Size': '6.9" Dynamic AMOLED 2X', 'Resolution': '3120×1440 (QHD+)', 'Refresh Rate': '120Hz adaptive', 'S Pen': 'Yes' },
      Processor: { 'Chip': 'Exynos 2400 / Snapdragon 8 Gen 3', 'CPU': 'Octa-core 4.74GHz' },
      Camera: { 'Main': '200MP F1.4', 'Ultrawide': '50MP', 'Telephoto': '10MP 10× optical' },
      Storage: { 'RAM': '12GB', 'Storage': '256GB / 512GB', 'microSD': 'No' },
      Battery: { 'Capacity': '5000mAh', 'Fast Charge': '45W', 'Wireless': '15W', 'Removable': 'No' },
    },
  },
  {
    id: 'apple-iphone-16-pro-max',
    slug: 'apple-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    shortName: 'iPhone 16 Pro Max',
    tagline: 'Desert Titanium | 8GB RAM | 256GB',
    badge: 'EDITORS CHOICE 2024',
    category: 'mobiles', brand: 'Apple',
    displaySize: 'Above 6.8"', battery: '4685mAh', ram: '8GB', storage: '256GB',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=85',
    images: [
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=85',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=85',
    ],
    currentPrice: 134999, originalPrice: 159999, discount: 16,
    emiText: 'No Cost EMI from ₹11,249/mo', dealLink: 'https://flipkart.com',
    expertScore: 9.1,
    scores: [{ label:'Display',value:9.5},{ label:'Camera',value:9.6},{ label:'Battery',value:8.5},{ label:'Power',value:9.8}],
    verdictPreview: '"The iPhone 16 Pro Max is Apple\'s most complete device yet. Camera is in a league of its own."',
    verdict: 'A18 Pro is essentially a desktop processor in your pocket. Camera quality — especially video — remains unmatched.',
    pros: ['Best-in-class video — cinema grade','A18 Pro future-proof for 4+ years','Titanium build premium and lightweight','Apple Intelligence genuinely useful'],
    cons: ['No fast charging above 27W','Very steep price','iOS limiting for power users','Heats under sustained load'],
    reviews: [{ id:1, user:'Ananya K', tag:'Verified Buyer', date:'3 days ago', rating:5, text:'Shot an entire wedding on this. Everyone thought it was a DSLR.' }],
    ratingAvg: 4.8, ratingCount: 2400,
    ratingBreakdown: [{star:5,count:1600},{star:4,count:500},{star:3,count:200},{star:2,count:60},{star:1,count:40}],
    specifications: {
      Display: { 'Size': '6.9" Super Retina XDR', 'Resolution': '2868×1320', 'Refresh Rate': '120Hz ProMotion', 'Always-On': 'Yes' },
      Processor: { 'Chip': 'A18 Pro', 'CPU': '6-core', 'GPU': '6-core' },
      Camera: { 'Main': '48MP Fusion', 'Telephoto': '5× optical', 'Front': '12MP TrueDepth' },
      Storage: { 'RAM': '8GB', 'Options': '256GB / 512GB / 1TB' },
      Battery: { 'Capacity': '4685mAh', 'Fast Charge': '27W', 'MagSafe': '25W', 'Wireless': '15W Qi' },
    },
  },
  {
    id: 'motorola-edge-60-pro',
    slug: 'motorola-edge-60-pro',
    name: 'Motorola Edge 60 Pro',
    shortName: 'Edge 60 Pro',
    tagline: 'Midnight Blue | 12GB RAM | 256GB',
    badge: 'BEST VALUE 2024',
    category: 'mobiles', brand: 'Motorola',
    displaySize: '6.5"–6.8"', battery: '5000mAh', ram: '12GB', storage: '256GB',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=85'],
    currentPrice: 34999, originalPrice: 44999, discount: 22,
    emiText: 'No Cost EMI from ₹2,916/mo', dealLink: 'https://amazon.in',
    expertScore: 8.2,
    scores: [{ label:'Display',value:8.5},{ label:'Camera',value:7.8},{ label:'Battery',value:9.0},{ label:'Power',value:8.0}],
    verdictPreview: '"Motorola nails the mid-range sweet spot. Clean software, reliable performance, camera punches above price."',
    verdict: 'Best mid-range Android right now. Clean software, solid hardware, aggressively priced.',
    pros: ['Cleanest Android outside Pixel','2-day battery easily','68W fast charging','pOLED gorgeous at this price'],
    cons: ['Struggles in very low light','Slightly plasticky back','Software updates slow'],
    reviews: [],
    ratingAvg: 4.2, ratingCount: 380,
    ratingBreakdown: [{star:5,count:180},{star:4,count:120},{star:3,count:50},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Display: { 'Size': '6.7" pOLED', 'Resolution': '2712×1220', 'Refresh Rate': '144Hz' },
      Processor: { 'Chip': 'Snapdragon 8s Gen 3', 'CPU': 'Octa-Core' },
      Camera: { 'Main': '50MP OIS', 'Ultrawide': '50MP', 'Front': '50MP' },
      Storage: { 'RAM': '12GB', 'Storage': '256GB' },
      Battery: { 'Capacity': '5000mAh', 'Charging': '68W TurboPower' },
    },
  },
  {
    id: 'oneplus-13',
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    shortName: 'OnePlus 13',
    tagline: 'Midnight Ocean | 16GB RAM | 512GB',
    badge: 'SPEED KING 2024',
    category: 'mobiles', brand: 'OnePlus',
    displaySize: 'Above 6.8"', battery: '6000mAh', ram: '16GB', storage: '512GB',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85'],
    currentPrice: 69999, originalPrice: 84999, discount: 18,
    emiText: 'No Cost EMI from ₹5,833/mo', dealLink: 'https://amazon.in',
    expertScore: 8.9,
    scores: [{ label:'Display',value:9.0},{ label:'Camera',value:8.5},{ label:'Battery',value:9.6},{ label:'Power',value:9.2}],
    verdictPreview: '"OnePlus 13 is a beast. 6000mAh + 100W charging means you\'re always powered, always fast."',
    verdict: 'The OnePlus 13 proves you don\'t need to spend lakh-plus for flagship performance. Snapdragon 8 Elite delivers.',
    pros: ['6000mAh battery — 2 full days easily','100W SuperVOOC insanely fast','Snapdragon 8 Elite top-tier performance','OxygenOS smooth and clean'],
    cons: ['Hasselblad cameras overprocessed sometimes','Alert slider removed','Bulky and heavy'],
    reviews: [{ id:1, user:'Vikram R', tag:'Verified Buyer', date:'5 days ago', rating:5, text:'Charges 0 to 100 in under 30 minutes. Never been more impressed.' }],
    ratingAvg: 4.5, ratingCount: 650,
    ratingBreakdown: [{star:5,count:400},{star:4,count:160},{star:3,count:60},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Display: { 'Size': '6.82" LTPO AMOLED', 'Resolution': '3168×1440 (QHD+)', 'Refresh Rate': '1–120Hz adaptive', 'Peak Brightness': '4500 nits' },
      Processor: { 'Chip': 'Snapdragon 8 Elite', 'CPU': 'Octa-Core 4.47GHz' },
      Camera: { 'Main': '50MP Hasselblad', 'Telephoto': '50MP 3× optical', 'Ultrawide': '50MP' },
      Storage: { 'RAM': '16GB LPDDR5X', 'Storage': '512GB UFS 4.0' },
      Battery: { 'Capacity': '6000mAh', 'Wired': '100W SuperVOOC', 'Wireless': '50W AirVOOC' },
    },
  },
  {
    id: 'samsung-galaxy-s26-ultra',
    slug: 'samsung-galaxy-s26-ultra',
    name: 'Samsung Galaxy S26 Ultra',
    shortName: 'Galaxy S26 Ultra',
    tagline: 'Titanium Black | 12GB RAM | 512GB',
    badge: 'UNFILTERED FLAGSHIP 2024',
    category: 'mobiles', brand: 'Samsung',
    displaySize: 'Above 6.8"', battery: '5000mAh', ram: '12GB', storage: '512GB',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=85',
    images: [
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&q=85',
      'https://images.unsplash.com/photo-1512054502232-10a0a035d672?w=600&q=85',
      'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=85',
    ],
    currentPrice: 79999, originalPrice: 89999, discount: 11,
    emiText: 'No Cost EMI from ₹6,666/mo', dealLink: 'https://amazon.in',
    expertScore: 9.4,
    scores: [{ label:'Display',value:9.2},{ label:'Camera',value:8.8},{ label:'Battery',value:9.5},{ label:'Power',value:9.8}],
    verdictPreview: '"The Galaxy S26 Ultra isn\'t just a phone; it\'s a statement. Raw, unadulterated performance when it actually matters."',
    verdict: 'After 30 days of testing: the most honest flagship of the year. Pushes the envelope in display tech and processing.',
    pros: ['Sustained 120fps gaming without throttling','Zero bloatware—cleanest Android skin','True 2-day battery life','Fastest fingerprint sensor in market'],
    cons: ['Industrial boxy design is polarising','Low-light video autofocus hunts occasionally','No charger in box'],
    reviews: [
      { id:1, user:'Rahul M', tag:'Verified Buyer', date:'2 days ago', rating:5, text:'Best phone I have ever used. Camera is absolutely insane.' },
      { id:2, user:'Priya S', tag:'Verified Buyer', date:'1 week ago', rating:4, text:'Battery life is exceptional. Easily 2 days on a single charge.' },
    ],
    ratingAvg: 4.6, ratingCount: 1200,
    ratingBreakdown: [{star:5,count:700},{star:4,count:300},{star:3,count:120},{star:2,count:50},{star:1,count:30}],
    specifications: {
      Display: { 'Size': '6.9" Dynamic AMOLED 2X', 'Resolution': '3120×1440 (QHD+)', 'Refresh Rate': '120Hz adaptive', 'S Pen': 'Yes' },
      Processor: { 'Chip': 'Exynos 2400 / Snapdragon 8 Gen 3', 'CPU': 'Octa-core 4.74GHz' },
      Camera: { 'Main': '200MP F1.4', 'Ultrawide': '50MP', 'Telephoto': '10MP 10× optical' },
      Storage: { 'RAM': '12GB', 'Storage': '256GB / 512GB', 'microSD': 'No' },
      Battery: { 'Capacity': '5000mAh', 'Fast Charge': '45W', 'Wireless': '15W', 'Removable': 'No' },
    },
  },
  {
    id: 'apple-iphone-16-pro-max',
    slug: 'apple-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    shortName: 'iPhone 16 Pro Max',
    tagline: 'Desert Titanium | 8GB RAM | 256GB',
    badge: 'EDITORS CHOICE 2024',
    category: 'mobiles', brand: 'Apple',
    displaySize: 'Above 6.8"', battery: '4685mAh', ram: '8GB', storage: '256GB',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=85',
    images: [
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=600&q=85',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&q=85',
    ],
    currentPrice: 134999, originalPrice: 159999, discount: 16,
    emiText: 'No Cost EMI from ₹11,249/mo', dealLink: 'https://flipkart.com',
    expertScore: 9.1,
    scores: [{ label:'Display',value:9.5},{ label:'Camera',value:9.6},{ label:'Battery',value:8.5},{ label:'Power',value:9.8}],
    verdictPreview: '"The iPhone 16 Pro Max is Apple\'s most complete device yet. Camera is in a league of its own."',
    verdict: 'A18 Pro is essentially a desktop processor in your pocket. Camera quality — especially video — remains unmatched.',
    pros: ['Best-in-class video — cinema grade','A18 Pro future-proof for 4+ years','Titanium build premium and lightweight','Apple Intelligence genuinely useful'],
    cons: ['No fast charging above 27W','Very steep price','iOS limiting for power users','Heats under sustained load'],
    reviews: [{ id:1, user:'Ananya K', tag:'Verified Buyer', date:'3 days ago', rating:5, text:'Shot an entire wedding on this. Everyone thought it was a DSLR.' }],
    ratingAvg: 4.8, ratingCount: 2400,
    ratingBreakdown: [{star:5,count:1600},{star:4,count:500},{star:3,count:200},{star:2,count:60},{star:1,count:40}],
    specifications: {
      Display: { 'Size': '6.9" Super Retina XDR', 'Resolution': '2868×1320', 'Refresh Rate': '120Hz ProMotion', 'Always-On': 'Yes' },
      Processor: { 'Chip': 'A18 Pro', 'CPU': '6-core', 'GPU': '6-core' },
      Camera: { 'Main': '48MP Fusion', 'Telephoto': '5× optical', 'Front': '12MP TrueDepth' },
      Storage: { 'RAM': '8GB', 'Options': '256GB / 512GB / 1TB' },
      Battery: { 'Capacity': '4685mAh', 'Fast Charge': '27W', 'MagSafe': '25W', 'Wireless': '15W Qi' },
    },
  },
  {
    id: 'motorola-edge-60-pro',
    slug: 'motorola-edge-60-pro',
    name: 'Motorola Edge 60 Pro',
    shortName: 'Edge 60 Pro',
    tagline: 'Midnight Blue | 12GB RAM | 256GB',
    badge: 'BEST VALUE 2024',
    category: 'mobiles', brand: 'Motorola',
    displaySize: '6.5"–6.8"', battery: '5000mAh', ram: '12GB', storage: '256GB',
    image: 'https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/x/7/t/-original-imahgqnz4hjyk6fh.jpeg?q=70',
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&q=85'],
    currentPrice: 34999, originalPrice: 44999, discount: 22,
    emiText: 'No Cost EMI from ₹2,916/mo', dealLink: 'https://amazon.in',
    expertScore: 8.2,
    scores: [{ label:'Display',value:8.5},{ label:'Camera',value:7.8},{ label:'Battery',value:9.0},{ label:'Power',value:8.0}],
    verdictPreview: '"Motorola nails the mid-range sweet spot. Clean software, reliable performance, camera punches above price."',
    verdict: 'Best mid-range Android right now. Clean software, solid hardware, aggressively priced.',
    pros: ['Cleanest Android outside Pixel','2-day battery easily','68W fast charging','pOLED gorgeous at this price'],
    cons: ['Struggles in very low light','Slightly plasticky back','Software updates slow'],
    reviews: [],
    ratingAvg: 4.2, ratingCount: 380,
    ratingBreakdown: [{star:5,count:180},{star:4,count:120},{star:3,count:50},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Display: { 'Size': '6.7" pOLED', 'Resolution': '2712×1220', 'Refresh Rate': '144Hz' },
      Processor: { 'Chip': 'Snapdragon 8s Gen 3', 'CPU': 'Octa-Core' },
      Camera: { 'Main': '50MP OIS', 'Ultrawide': '50MP', 'Front': '50MP' },
      Storage: { 'RAM': '12GB', 'Storage': '256GB' },
      Battery: { 'Capacity': '5000mAh', 'Charging': '68W TurboPower' },
    },
  },
  {
    id: 'oneplus-13',
    slug: 'oneplus-13',
    name: 'OnePlus 13',
    shortName: 'OnePlus 13',
    tagline: 'Midnight Ocean | 16GB RAM | 512GB',
    badge: 'SPEED KING 2024',
    category: 'mobiles', brand: 'OnePlus',
    displaySize: 'Above 6.8"', battery: '6000mAh', ram: '16GB', storage: '512GB',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&q=85'],
    currentPrice: 69999, originalPrice: 84999, discount: 18,
    emiText: 'No Cost EMI from ₹5,833/mo', dealLink: 'https://amazon.in',
    expertScore: 8.9,
    scores: [{ label:'Display',value:9.0},{ label:'Camera',value:8.5},{ label:'Battery',value:9.6},{ label:'Power',value:9.2}],
    verdictPreview: '"OnePlus 13 is a beast. 6000mAh + 100W charging means you\'re always powered, always fast."',
    verdict: 'The OnePlus 13 proves you don\'t need to spend lakh-plus for flagship performance. Snapdragon 8 Elite delivers.',
    pros: ['6000mAh battery — 2 full days easily','100W SuperVOOC insanely fast','Snapdragon 8 Elite top-tier performance','OxygenOS smooth and clean'],
    cons: ['Hasselblad cameras overprocessed sometimes','Alert slider removed','Bulky and heavy'],
    reviews: [{ id:1, user:'Vikram R', tag:'Verified Buyer', date:'5 days ago', rating:5, text:'Charges 0 to 100 in under 30 minutes. Never been more impressed.' }],
    ratingAvg: 4.5, ratingCount: 650,
    ratingBreakdown: [{star:5,count:400},{star:4,count:160},{star:3,count:60},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Display: { 'Size': '6.82" LTPO AMOLED', 'Resolution': '3168×1440 (QHD+)', 'Refresh Rate': '1–120Hz adaptive', 'Peak Brightness': '4500 nits' },
      Processor: { 'Chip': 'Snapdragon 8 Elite', 'CPU': 'Octa-Core 4.47GHz' },
      Camera: { 'Main': '50MP Hasselblad', 'Telephoto': '50MP 3× optical', 'Ultrawide': '50MP' },
      Storage: { 'RAM': '16GB LPDDR5X', 'Storage': '512GB UFS 4.0' },
      Battery: { 'Capacity': '6000mAh', 'Wired': '100W SuperVOOC', 'Wireless': '50W AirVOOC' },
    },
  },
  // ══════════════════ LAPTOPS ══════════════════
  {
    id: 'apple-macbook-air-m4',
    slug: 'apple-macbook-air-m4',
    name: 'Apple MacBook Air M4',
    shortName: 'MacBook Air M4',
    tagline: 'Space Grey | 16GB RAM | 512GB SSD',
    badge: 'BEST LAPTOP 2024',
    category: 'laptops', brand: 'Apple',
    displaySize: '13"–14"', ram: '16GB', storage: '512GB SSD', processor: 'Apple M4',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=85',
    images: [
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=85',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=85',
    ],
    currentPrice: 99999, originalPrice: 124999, discount: 20,
    emiText: 'No Cost EMI from ₹8,333/mo', dealLink: 'https://amazon.in',
    expertScore: 9.3,
    scores: [{ label:'Display',value:9.4},{ label:'Performance',value:9.5},{ label:'Battery',value:9.6},{ label:'Build',value:9.0}],
    verdictPreview: '"The MacBook Air M4 is the laptop we\'d buy with our own money. Fanless, featherlight, and fast enough for everything."',
    verdict: 'M4 chip is a leap in every benchmark. Best all-round laptop at any price.',
    pros: ['Completely fanless — silent always','M4 destroys Intel equivalents','18hr real-world battery','Liquid Retina reference-grade display'],
    cons: ['No dedicated GPU for heavy gaming','RAM and storage not upgradeable','Only 2 Thunderbolt ports'],
    reviews: [{ id:1, user:'Deepa N', tag:'Verified Buyer', date:'1 week ago', rating:5, text:'Battery lasts my entire workday and then some. No charger needed.' }],
    ratingAvg: 4.7, ratingCount: 890,
    ratingBreakdown: [{star:5,count:600},{star:4,count:200},{star:3,count:60},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Display: { 'Size': '13.6" Liquid Retina', 'Resolution': '2560×1664', 'Brightness': '500 nits', 'True Tone': 'Yes' },
      Processor: { 'Chip': 'Apple M4', 'CPU': '10-core', 'GPU': '10-core', 'Neural Engine': '16-core' },
      Storage: { 'Unified RAM': '16GB', 'SSD': '512GB', 'Expandable': 'No' },
      Battery: { 'Capacity': '52.6Wh', 'Life': 'Up to 18 hours', 'Charging': '30W USB-C' },
      Connectivity: { 'Ports': '2× Thunderbolt 4, MagSafe 3, 3.5mm', 'Wi-Fi': 'Wi-Fi 6E', 'Bluetooth': '5.3' },
    },
  },
  {
    id: 'dell-xps-15-9530',
    slug: 'dell-xps-15-9530',
    name: 'Dell XPS 15 (2024)',
    shortName: 'Dell XPS 15',
    tagline: 'Platinum Silver | 32GB RAM | 1TB SSD',
    badge: 'POWER USER PICK',
    category: 'laptops', brand: 'Dell',
    displaySize: '15"–16"', ram: '32GB', storage: '1TB SSD', processor: 'Intel i9',
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=85'],
    currentPrice: 189999, originalPrice: 219999, discount: 14,
    emiText: 'No Cost EMI from ₹15,833/mo', dealLink: 'https://dell.com',
    expertScore: 9.0,
    scores: [{ label:'Display',value:9.5},{ label:'Performance',value:9.2},{ label:'Battery',value:7.8},{ label:'Build',value:9.5}],
    verdictPreview: '"The XPS 15 is the pinnacle of Windows laptops. OLED display alone justifies the price."',
    verdict: 'Dell\'s masterpiece. 3.5K OLED display combined with Intel\'s best makes this the definitive Windows workstation.',
    pros: ['3.5K OLED is breathtaking','Thunderbolt 4 × 2 plus full-size ports','RTX 4060 handles creative workloads','Premium machined aluminium chassis'],
    cons: ['Battery life disappoints at 5–6 hours','Runs hot under sustained load','Very expensive','Fan noise audible under load'],
    reviews: [],
    ratingAvg: 4.3, ratingCount: 240,
    ratingBreakdown: [{star:5,count:130},{star:4,count:70},{star:3,count:25},{star:2,count:10},{star:1,count:5}],
    specifications: {
      Display: { 'Size': '15.6" OLED', 'Resolution': '3456×2160 (3.5K)', 'Refresh Rate': '60Hz', 'Touch': 'Yes' },
      Processor: { 'CPU': 'Intel Core i9-13900H', 'Cores': '14-core', 'Max Turbo': '5.4GHz' },
      Graphics: { 'GPU': 'NVIDIA RTX 4060 8GB', 'VRAM': '8GB GDDR6' },
      Storage: { 'RAM': '32GB DDR5', 'SSD': '1TB NVMe PCIe Gen 4' },
      Battery: { 'Capacity': '86Wh', 'Life': '5–6 hours typical', 'Charging': '130W USB-C' },
    },
  },
  {
    id: 'asus-rog-zephyrus-g16',
    slug: 'asus-rog-zephyrus-g16',
    name: 'ASUS ROG Zephyrus G16',
    shortName: 'ROG Zephyrus G16',
    tagline: 'Eclipse Grey | 32GB RAM | 1TB SSD | RTX 4080',
    badge: 'GAMING BEAST 2024',
    category: 'laptops', brand: 'Asus',
    displaySize: '15"–16"', ram: '32GB', storage: '1TB SSD', processor: 'AMD Ryzen 7',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=85'],
    currentPrice: 249999, originalPrice: 279999, discount: 11,
    emiText: 'No Cost EMI from ₹20,833/mo', dealLink: 'https://amazon.in',
    expertScore: 9.2,
    scores: [{ label:'Display',value:9.6},{ label:'Performance',value:9.7},{ label:'Battery',value:7.5},{ label:'Build',value:9.3}],
    verdictPreview: '"The Zephyrus G16 is the gaming laptop we\'ve always wanted — premium looks, nuclear performance, surprisingly quiet."',
    verdict: 'ASUS has somehow made a gaming laptop that doesn\'t look like one. RTX 4080 with AMD Ryzen 9 is an unstoppable combination.',
    pros: ['RTX 4080 handles everything at max settings','240Hz OLED is jaw-dropping','Quiet for a gaming laptop','Surprisingly thin and light'],
    cons: ['Battery is around 3 hours gaming','Gets warm at the top keyboard area','Pricey even by gaming standards'],
    reviews: [{ id:1, user:'Arjun P', tag:'Verified Buyer', date:'4 days ago', rating:5, text:'Running Cyberpunk 2077 at ultra 1440p, stable 140fps. Incredible.' }],
    ratingAvg: 4.6, ratingCount: 310,
    ratingBreakdown: [{star:5,count:210},{star:4,count:70},{star:3,count:20},{star:2,count:7},{star:1,count:3}],
    specifications: {
      Display: { 'Size': '16" OLED', 'Resolution': '2560×1600 (QHD+)', 'Refresh Rate': '240Hz', 'Response Time': '0.2ms' },
      Processor: { 'CPU': 'AMD Ryzen 9 8945HS', 'Cores': '8-core', 'Max Boost': '5.2GHz' },
      Graphics: { 'GPU': 'NVIDIA RTX 4080 12GB', 'VRAM': '12GB GDDR6X' },
      Storage: { 'RAM': '32GB DDR5', 'SSD': '1TB NVMe PCIe Gen 4' },
      Battery: { 'Capacity': '90Wh', 'Gaming Life': '~3 hours', 'Charging': '240W' },
    },
  },
  {
    id: 'lenovo-thinkpad-x1-carbon',
    slug: 'lenovo-thinkpad-x1-carbon',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    shortName: 'ThinkPad X1 Carbon',
    tagline: 'Deep Black | 16GB RAM | 512GB SSD | Intel i7',
    badge: 'BUSINESS ELITE 2024',
    category: 'laptops', brand: 'Lenovo',
    displaySize: '13"–14"', ram: '16GB', storage: '512GB SSD', processor: 'Intel i7',
    image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=85'],
    currentPrice: 149999, originalPrice: 174999, discount: 14,
    emiText: 'No Cost EMI from ₹12,499/mo', dealLink: 'https://lenovo.com',
    expertScore: 8.8,
    scores: [{ label:'Display',value:8.8},{ label:'Performance',value:8.9},{ label:'Battery',value:9.2},{ label:'Build',value:9.5}],
    verdictPreview: '"The ThinkPad X1 Carbon is the most reliable business laptop money can buy. It\'s not the flashiest — it doesn\'t need to be."',
    verdict: 'Lenovo\'s ThinkPad legacy continues. MIL-SPEC certified, ultralight, with the keyboard that all others are benchmarked against.',
    pros: ['Best keyboard on any laptop, period','MIL-SPEC certified durability','14 hours real-world battery','Under 1.12 kg — barely noticeable'],
    cons: ['Display not class-leading','Integrated graphics only','Premium pricing for business segment'],
    reviews: [],
    ratingAvg: 4.4, ratingCount: 180,
    ratingBreakdown: [{star:5,count:100},{star:4,count:55},{star:3,count:15},{star:2,count:6},{star:1,count:4}],
    specifications: {
      Display: { 'Size': '14" IPS', 'Resolution': '1920×1200 (WUXGA)', 'Brightness': '400 nits', 'Anti-glare': 'Yes' },
      Processor: { 'CPU': 'Intel Core Ultra 7 165U', 'Cores': '12-core', 'Max Turbo': '4.9GHz' },
      Storage: { 'RAM': '16GB LPDDR5', 'SSD': '512GB NVMe' },
      Battery: { 'Capacity': '57Wh', 'Life': 'Up to 14 hours', 'Charging': '65W USB-C' },
      Build: { 'Weight': '1.12 kg', 'MIL-SPEC': 'MIL-STD-810H', 'Material': 'Carbon fibre + magnesium' },
    },
  },

  // ══════════════════ AUDIO ══════════════════
  {
    id: 'sony-wh-1000xm6',
    slug: 'sony-wh-1000xm6',
    name: 'Sony WH-1000XM6',
    shortName: 'WH-1000XM6',
    tagline: 'Midnight Black | Best ANC 2024',
    badge: 'AUDIO KING 2024',
    category: 'audio', brand: 'Sony',
    type: 'Over-Ear', anc: 'With ANC',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85','https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=85'],
    currentPrice: 24999, originalPrice: 34990, discount: 28,
    emiText: 'No Cost EMI from ₹2,083/mo', dealLink: 'https://amazon.in',
    expertScore: 9.0,
    scores: [{ label:'Sound',value:9.5},{ label:'ANC',value:9.8},{ label:'Battery',value:9.0},{ label:'Comfort',value:8.5}],
    verdictPreview: '"XM6 tightens every gap the XM5 left open. ANC class-leading, sound balanced, battery stupid good."',
    verdict: 'Sony keeps refining the best-selling ANC headphone in the world and somehow makes it better each time.',
    pros: ['Best ANC in any consumer headphone','30+ hours battery with ANC on','Multipoint Bluetooth works flawlessly','Balanced and detailed sound signature'],
    cons: ['Touch controls take time to learn','Ear cups warm on long sessions'],
    reviews: [],
    ratingAvg: 4.5, ratingCount: 560,
    ratingBreakdown: [{star:5,count:320},{star:4,count:160},{star:3,count:50},{star:2,count:20},{star:1,count:10}],
    specifications: {
      Audio: { 'Driver': '30mm', 'Frequency': '4Hz–40kHz', 'Codec': 'LDAC, AAC, SBC' },
      Battery: { 'Life (ANC)': '30 hrs', 'Quick Charge': '3 min = 3 hrs', 'Charging': 'USB-C' },
      Connectivity: { 'Bluetooth': '5.3', 'Multipoint': 'Yes (2 devices)', 'NFC': 'Yes' },
    },
  },

  // ══════════════════ CAMERA ══════════════════
  {
    id: 'canon-eos-r8',
    slug: 'canon-eos-r8',
    name: 'Canon EOS R8',
    shortName: 'EOS R8',
    tagline: 'Full-Frame Mirrorless | 24.2MP | 4K60',
    badge: 'CAMERA PICK 2024',
    category: 'camera', brand: 'Canon',
    type: 'Mirrorless', sensor: 'Full Frame',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=85',
    images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=85'],
    currentPrice: 89999, originalPrice: 109999, discount: 18,
    emiText: 'No Cost EMI from ₹7,499/mo', dealLink: 'https://amazon.in',
    expertScore: 8.9,
    scores: [{ label:'Image Quality',value:9.2},{ label:'Video',value:9.0},{ label:'AF',value:9.4},{ label:'Build',value:8.0}],
    verdictPreview: '"Full-frame quality at a price that makes sense. EOS R8 democratises cinema-grade imagery."',
    verdict: 'Canon finally made a full-frame camera that doesn\'t cost a mortgage. Best autofocus in its class.',
    pros: ['Full-frame at this price is unheard of','Dual Pixel AF class-leading','4K60 no crop','Lightweight — all-day carry'],
    cons: ['No in-body stabilisation','Battery ~200 shots','Single card slot'],
    reviews: [],
    ratingAvg: 4.4, ratingCount: 210,
    ratingBreakdown: [{star:5,count:120},{star:4,count:60},{star:3,count:20},{star:2,count:6},{star:1,count:4}],
    specifications: {
      Sensor: { 'Type': 'Full-Frame CMOS', 'Resolution': '24.2MP', 'ISO': '100–102400' },
      Video: { 'Max': '4K 60fps', 'Log': 'Canon Log 3', 'HDR': 'Yes' },
      AF: { 'System': 'Dual Pixel CMOS AF II', 'Coverage': '100%', 'Detection': 'People, Animals, Vehicles' },
      Battery: { 'Type': 'LP-E17', 'Shots': '~220', 'USB Charge': 'Yes' },
    },
  },

  // ══════════════════ SMARTWATCHES ══════════════════
 
{
  id: 'samsung-galaxy-watch-7',
  slug: 'samsung-galaxy-watch-7',
  name: 'Samsung Galaxy Watch 7',
  shortName: 'Galaxy Watch 7',
  tagline: 'AMOLED | WearOS | Advanced Health Tracking',
  badge: 'SMARTWATCH PICK 2024',
  category: 'smartwatches',
  brand: 'Samsung',

  type: 'Premium Smartwatch',
  display: 'AMOLED',

  battery: '1–3 Days',
  features: ['GPS','Heart Rate Monitor','SpO2 Monitor','Sleep Tracking','Sports Modes','Water Resistant'],

  image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=85',
  images: ['https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=600&q=85'],

  currentPrice: 17999,
  originalPrice: 21999,
  discount: 18,

  emiText: 'No Cost EMI from ₹1,499/mo',
  dealLink: 'https://amazon.in',

  expertScore: 8.6,

  scores: [
    { label: 'Display', value: 9.0 },
    { label: 'Health Tracking', value: 8.8 },
    { label: 'Battery', value: 7.8 },
    { label: 'Performance', value: 8.5 }
  ],

  verdictPreview: '"One of the best Android smartwatches with powerful health tracking and smooth performance."',

  verdict:
    'Galaxy Watch 7 delivers excellent AMOLED display quality, accurate health sensors and smooth WearOS experience.',

  pros: [
    'Premium AMOLED display',
    'Accurate health sensors',
    'WearOS with Play Store',
    'Premium build quality'
  ],

  cons: [
    'Battery life average',
    'Works best with Samsung phones'
  ],

  reviews: [],

  ratingAvg: 4.5,
  ratingCount: 64000,

  ratingBreakdown: [
    { star: 5, count: 42000 },
    { star: 4, count: 15000 },
    { star: 3, count: 4000 },
    { star: 2, count: 2000 },
    { star: 1, count: 1000 }
  ],

  specifications: {
    Display: { Type: 'AMOLED', Size: '1.47 inch', AlwaysOn: 'Yes' },
    Battery: { Life: 'Up to 40 hours', Charging: 'Fast Charging' },
    Connectivity: { Modes: 'Bluetooth, WiFi', GPS: 'Yes' },
    Health: { Sensors: 'Heart Rate, SpO2, Sleep Tracking', SportsModes: '100+' }
  }
},

{
  id: 'oneplus-watch-2r',
  slug: 'oneplus-watch-2r',
  name: 'OnePlus Watch 2R',
  shortName: 'Watch 2R',
  tagline: 'AMOLED | 100H Battery | WearOS',
  badge: 'BEST BATTERY',

  category: 'smartwatches',
  brand: 'OnePlus',

  type: 'Premium Smartwatch',
  display: 'AMOLED',

  battery: '3–7 Days',
  features: ['GPS','Heart Rate Monitor','SpO2 Monitor','Sleep Tracking','Sports Modes','Water Resistant'],

  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85',
  images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85'],

  currentPrice: 14999,
  originalPrice: 17999,
  discount: 17,

  emiText: 'No Cost EMI from ₹1,249/mo',
  dealLink: 'https://amazon.in',

  expertScore: 8.7,

  scores: [
    { label: 'Display', value: 8.8 },
    { label: 'Battery', value: 9.4 },
    { label: 'Performance', value: 8.6 },
    { label: 'Health Tracking', value: 8.3 }
  ],

  verdictPreview: '"Battery king among WearOS watches with solid performance."',

  verdict:
    'OnePlus Watch 2R stands out for its impressive battery life while still offering smooth WearOS experience.',

  pros: [
    'Excellent battery life',
    'Premium design',
    'Fast performance',
    'Bright AMOLED display'
  ],

  cons: [
    'Limited strap options',
    'Health tracking slightly less accurate'
  ],

  reviews: [],

  ratingAvg: 4.4,
  ratingCount: 8500,

  ratingBreakdown: [
    { star: 5, count: 5000 },
    { star: 4, count: 2300 },
    { star: 3, count: 700 },
    { star: 2, count: 300 },
    { star: 1, count: 200 }
  ],

  specifications: {
    Display: { Type: 'AMOLED', Size: '1.43 inch', AlwaysOn: 'Yes' },
    Battery: { Life: 'Up to 100 hours', Charging: 'Fast Charging' },
    Connectivity: { Modes: 'Bluetooth, WiFi', GPS: 'Yes' },
    Health: { Sensors: 'Heart Rate, SpO2, Sleep Tracking', SportsModes: '100+' }
  }
},

{
  id: 'noise-halo-2',

  slug: 'noise-halo-2',
  name: 'NoiseFit Halo 2',

  shortName: 'Halo 2',
  tagline: 'Budget AMOLED | Bluetooth Calling',

  badge: 'BUDGET PICK',

  category: 'smartwatches',
  brand: 'Noise',

  type: 'Bluetooth Calling Watch',
  display: 'AMOLED',

  battery: '7–14 Days',

  features: [
    'Bluetooth Calling',
    'Heart Rate Monitor',
    'SpO2 Monitor',
    'Sleep Tracking',
    'Sports Modes',
    'Water Resistant'
  ],

  image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=85',
  images: ['https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&q=85'],

  currentPrice: 3999,
  originalPrice: 5999,

  discount: 33,

  emiText: 'No Cost EMI from ₹333/mo',
  dealLink: 'https://amazon.in',

  expertScore: 7.8,

  scores: [
    { label: 'Display', value: 8.2 },
    { label: 'Battery', value: 8.0 },
    { label: 'Features', value: 7.6 },
    { label: 'Build', value: 7.4 }
  ],

  verdictPreview: '"Best value smartwatch with AMOLED and calling under ₹5k."',

  verdict:
    'NoiseFit Halo 2 offers impressive features like AMOLED display and Bluetooth calling at a very affordable price.',

  pros: [
    'AMOLED display at this price',
    'Bluetooth calling',
    'Affordable',
    'Good battery life'
  ],

  cons: [
    'Average app experience',
    'Plastic build'
  ],

  reviews: [],

  ratingAvg: 4.3,
  ratingCount: 12000,

  ratingBreakdown: [
    { star: 5, count: 7000 },
    { star: 4, count: 3000 },
    { star: 3, count: 1200 },
    { star: 2, count: 500 },
    { star: 1, count: 300 }
  ],

  specifications: {
    Display: { Type: 'AMOLED', Size: '1.43 inch', AlwaysOn: 'Yes' },
    Battery: { Life: 'Up to 7 days', Charging: 'Magnetic Charging' },
    Connectivity: { Modes: 'Bluetooth Calling', GPS: 'No' },
    Health: { Sensors: 'Heart Rate, SpO2, Sleep Tracking', SportsModes: '100+' }
  }
}

]

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const getProductBySlug = (slug) => productsData.find(p => p.slug === slug) || null
export const getProductsByCategory = (cat) => !cat || cat === 'all' ? productsData : productsData.filter(p => p.category === cat)
