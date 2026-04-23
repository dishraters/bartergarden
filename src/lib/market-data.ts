export type Town = 'Somerville' | 'Medfield'
export type TransactionType = 'sell' | 'trade' | 'free'

export type Listing = {
  id: string
  town: Town
  neighborhood: string
  produceType: string
  title: string
  description: string
  photos: string[]
  quantity: string
  unit: string
  transactionType: TransactionType
  price?: string
  tradeInterest?: string
  harvestDate: string
  freshness: string
  availabilityText: string
  sellerName: string
  sellerJoinDate: string
  sellerPhoto: string
  postedTime: string
  savedCount: number
  freshnessBadge: string
}

export const towns: Town[] = ['Somerville', 'Medfield']

export const listings: Listing[] = [
  {
    id: '1',
    town: 'Somerville',
    neighborhood: 'Union Square',
    produceType: 'Tomatoes',
    title: 'Cherry tomatoes',
    description: 'Sweet cherry tomatoes from raised beds, harvested this morning. Great for salads or snacking.',
    photos: ['🍅'],
    quantity: '2',
    unit: 'pints',
    transactionType: 'sell',
    price: '$4',
    harvestDate: 'Today',
    freshness: 'Harvested today',
    availabilityText: 'Pickup after 5pm',
    sellerName: 'Maya',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '🧑‍🌾',
    postedTime: '2h ago',
    savedCount: 8,
    freshnessBadge: 'Picked today',
  },
  {
    id: '2',
    town: 'Somerville',
    neighborhood: 'Davis Square',
    produceType: 'Cucumbers',
    title: 'Backyard cucumbers',
    description: 'Overflow from this week. Looking to trade for basil, mint, or hot peppers.',
    photos: ['🥒'],
    quantity: '5',
    unit: 'cucumbers',
    transactionType: 'trade',
    tradeInterest: 'Basil, mint, peppers',
    harvestDate: 'Today',
    freshness: 'Picked this afternoon',
    availabilityText: 'Porch pickup tonight',
    sellerName: 'Owen',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '👨‍🌾',
    postedTime: '1h ago',
    savedCount: 3,
    freshnessBadge: 'Posted recently',
  },
  {
    id: '3',
    town: 'Somerville',
    neighborhood: 'Powder House',
    produceType: 'Kale',
    title: 'Curly kale bunches',
    description: 'Tender leaves from a backyard patch. Good for soups, sautés, or smoothies.',
    photos: ['🥬'],
    quantity: '3',
    unit: 'bunches',
    transactionType: 'free',
    harvestDate: 'Today',
    freshness: 'Best tonight',
    availabilityText: 'Front porch pickup before 8pm',
    sellerName: 'Sara',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '👩‍🌾',
    postedTime: '38m ago',
    savedCount: 4,
    freshnessBadge: 'Free tonight',
  },
  {
    id: '4',
    town: 'Medfield',
    neighborhood: 'Green Street area',
    produceType: 'Basil',
    title: 'Fresh basil bunches',
    description: 'Cut fresh tonight. Very fragrant, no spray used.',
    photos: ['🌿'],
    quantity: '3',
    unit: 'bundles',
    transactionType: 'sell',
    price: '$3',
    harvestDate: 'Today',
    freshness: 'No spray, cut today',
    availabilityText: 'Pickup tomorrow morning',
    sellerName: 'Priya',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '👩‍🌾',
    postedTime: '45m ago',
    savedCount: 5,
    freshnessBadge: 'Cut today',
  },
  {
    id: '5',
    town: 'Medfield',
    neighborhood: 'North Meadows',
    produceType: 'Chard',
    title: 'Rainbow chard free pickup',
    description: 'Extra bunch from tonight’s harvest. Free if you can use it today.',
    photos: ['🥬'],
    quantity: '1',
    unit: 'bundle',
    transactionType: 'free',
    harvestDate: 'Today',
    freshness: 'Best tonight',
    availabilityText: 'First come, porch pickup',
    sellerName: 'Lena',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '🧑‍🌾',
    postedTime: '20m ago',
    savedCount: 2,
    freshnessBadge: 'Posted recently',
  },
  {
    id: '6',
    town: 'Medfield',
    neighborhood: 'Causeway Street area',
    produceType: 'Zucchini',
    title: 'Zucchini overflow',
    description: 'Looking to trade extra zucchini for herbs or cherry tomatoes.',
    photos: ['🥒'],
    quantity: '4',
    unit: 'zucchini',
    transactionType: 'trade',
    tradeInterest: 'Herbs or tomatoes',
    harvestDate: 'Yesterday',
    freshness: 'Still very fresh',
    availabilityText: 'Pickup tomorrow after school hours',
    sellerName: 'Ben',
    sellerJoinDate: 'April 2026',
    sellerPhoto: '👨‍🌾',
    postedTime: '3h ago',
    savedCount: 6,
    freshnessBadge: 'Trade available',
  },
]

export function getListing(id: string) {
  return listings.find((listing) => listing.id === id)
}

export function getListingsByTown(town: Town) {
  return listings.filter((listing) => listing.town === town)
}
