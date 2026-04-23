export type Town = 'Medfield'
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

export const towns: Town[] = ['Medfield']

export const listings: Listing[] = [
  {
    id: '1',
    town: 'Medfield',
    neighborhood: 'Green Street area',
    produceType: 'Cherry tomatoes',
    title: 'Cherry tomatoes from raised beds',
    description: 'Sweet cherry tomatoes picked this morning. Great for salads, snacking, or sharing at dinner.',
    photos: ['🍅'],
    quantity: '2',
    unit: 'pints',
    transactionType: 'sell',
    price: '$4',
    harvestDate: 'Today',
    freshness: 'Picked this morning',
    availabilityText: 'Pickup after 4pm',
    sellerName: 'Martha',
    sellerJoinDate: 'May 2026',
    sellerPhoto: '👩‍🌾',
    postedTime: '35m ago',
    savedCount: 8,
    freshnessBadge: 'Picked today',
  },
  {
    id: '2',
    town: 'Medfield',
    neighborhood: 'North Meadows',
    produceType: 'Basil',
    title: 'Fresh basil bunches',
    description: 'Cut fresh tonight, fragrant and tender. Happy to trade for cucumbers or greens.',
    photos: ['🌿'],
    quantity: '3',
    unit: 'bundles',
    transactionType: 'trade',
    tradeInterest: 'Cucumbers or salad greens',
    harvestDate: 'Today',
    freshness: 'Cut this evening',
    availabilityText: 'Pickup tomorrow morning',
    sellerName: 'Ellen',
    sellerJoinDate: 'May 2026',
    sellerPhoto: '🧑‍🌾',
    postedTime: '1h ago',
    savedCount: 5,
    freshnessBadge: 'Trade available',
  },
  {
    id: '3',
    town: 'Medfield',
    neighborhood: 'Causeway Street area',
    produceType: 'Zucchini',
    title: 'Extra zucchini, free tonight',
    description: 'A few extra zucchini from tonight’s harvest. Free if someone can use them right away.',
    photos: ['🥒'],
    quantity: '4',
    unit: 'zucchini',
    transactionType: 'free',
    harvestDate: 'Today',
    freshness: 'Best tonight',
    availabilityText: 'Porch pickup before 8pm',
    sellerName: 'Janet',
    sellerJoinDate: 'May 2026',
    sellerPhoto: '👩‍🌾',
    postedTime: '18m ago',
    savedCount: 3,
    freshnessBadge: 'Free tonight',
  },
  {
    id: '4',
    town: 'Medfield',
    neighborhood: 'Main Street side',
    produceType: 'Rainbow chard',
    title: 'Rainbow chard bunches',
    description: 'Tender rainbow chard from a backyard bed, good for sautés and soups.',
    photos: ['🥬'],
    quantity: '2',
    unit: 'bunches',
    transactionType: 'sell',
    price: '$3',
    harvestDate: 'Yesterday',
    freshness: 'Still very fresh',
    availabilityText: 'Pickup tomorrow afternoon',
    sellerName: 'Louise',
    sellerJoinDate: 'May 2026',
    sellerPhoto: '🧑‍🌾',
    postedTime: '2h ago',
    savedCount: 4,
    freshnessBadge: 'Posted recently',
  },
]

export function getListing(id: string) {
  return listings.find((listing) => listing.id === id)
}

export function getListingsByTown(town: Town) {
  return listings.filter((listing) => listing.town === town)
}
