import type { User, Chat, ChatMessage, Product } from './types';
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'User A' },
  { id: 'u2', name: 'User B' }
];
export const MOCK_CHATS: Chat[] = [
  { id: 'c1', title: 'General' },
];
export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  { id: 'm1', chatId: 'c1', userId: 'u1', text: 'Hello', ts: Date.now() },
];
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Satin Evening Gown',
    description: 'A luxurious floor-length satin gown for formal occasions.',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=800&auto=format&fit=crop',
    category: 'Dresses',
    brand: 'ChicAtelier',
    colors: ['#000000', '#800000', '#FFD700']
  },
  {
    id: 'p2',
    name: 'Tailored Wool Blazer',
    description: 'Sophisticated slim-fit blazer made from premium Italian wool.',
    price: 189.00,
    imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
    category: 'Outerwear',
    brand: 'UrbanEdge',
    colors: ['#2F4F4F', '#000000']
  },
  {
    id: 'p3',
    name: 'Silk Wrap Blouse',
    description: 'Elegant 100% pure silk blouse with a graceful wrap design.',
    price: 120.00,
    imageUrl: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?q=80&w=800&auto=format&fit=crop',
    category: 'Tops',
    brand: 'SilkRoad',
    colors: ['#FFFFFF', '#F5F5DC', '#FFC0CB']
  },
  {
    id: 'p4',
    name: 'Classic Leather Tote',
    description: 'Spacious everyday tote bag crafted from vegetable-tanned leather.',
    price: 210.00,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    brand: 'Heritage',
    colors: ['#8B4513', '#000000']
  },
  {
    id: 'p5',
    name: 'Cashmere Turtleneck',
    description: 'Ultra-soft turtleneck sweater made from Mongolian cashmere.',
    price: 155.00,
    imageUrl: 'https://images.unsplash.com/photo-1574180563860-007bc9d87340?q=80&w=800&auto=format&fit=crop',
    category: 'Knitwear',
    brand: 'ChicAtelier',
    colors: ['#D3D3D3', '#A52A2A', '#000080']
  },
  {
    id: 'p6',
    name: 'High-Waisted Trouser',
    description: 'Modern wide-leg trousers with a flattering high-rise fit.',
    price: 95.00,
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop',
    category: 'Bottoms',
    brand: 'UrbanEdge',
    colors: ['#000000', '#F5F5DC']
  },
  {
    id: 'p7',
    name: 'Velvet Mini Dress',
    description: 'Chic crushed velvet dress perfect for cocktail parties.',
    price: 140.00,
    imageUrl: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=800&auto=format&fit=crop',
    category: 'Dresses',
    brand: 'SilkRoad',
    colors: ['#4B0082', '#006400']
  },
  {
    id: 'p8',
    name: 'Merino Wool Scarf',
    description: 'Extra long merino wool scarf with fringed edges.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop',
    category: 'Accessories',
    brand: 'Heritage',
    colors: ['#C0C0C0', '#800000', '#DEB887']
  }
];