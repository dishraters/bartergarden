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
  },
  {
    id: '2',
    town: 'Somerville',
    neighborhood: 'Davis Square',
    produceType: 'Cucumbers',
    title: 'Backyard cucumbers',
    description: 'Overflow from this week. Looking to trade for basil, mint, or peppers.',
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
  },
  {
    id: '3',
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
  },
  {
    id: '4',
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
  },
]

export function getListing(id: string) {
  return listings.find((listing) => listing.id === id)
}

export function getListingsByTown(town: Town) {
  return listings.filter((listing) => listing.town === town)
}
