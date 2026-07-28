import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Neckband Earbuds',
    price: 320,
    category: 'Neckband / Earbuds',
    image: 'https://i.ibb.co/zWZnbS80/file-0000000005c47207981e02b75be5a5cf.png',
    description: 'Stylish wireless neckband earbuds with deep bass, long battery life and comfortable fit. Perfect for music and calls on the go.'
  },
  {
    id: 2,
    name: 'Mobile Stand Bluetooth Selfie Stick Tripod',
    price: 399,
    category: 'Mobile Stand / Selfie Stick',
    image: 'https://i.ibb.co/hxX8d3tp/file-00000000b34472078f852d67e2acdda2.png',
    description: 'Versatile 3-in-1 mobile stand, Bluetooth selfie stick and tripod. Ideal for vlogging, video calls and stable photography.'
  },
  {
    id: 3,
    name: 'Ergonomic Wired Mouse',
    price: 219,
    category: 'Mouse',
    image: 'https://i.ibb.co/bgv3VMbN/file-00000000ad3072098fd19a1ef0a95091.png',
    description: 'Comfortable ergonomic wired mouse with smooth tracking and responsive buttons. Great for work, study and everyday use.'
  },
  {
    id: 4,
    name: 'Adjustable Camera Tripod',
    price: 369,
    category: 'Tripod',
    image: 'https://i.ibb.co/tpbZDkdt/Picsart-26-06-13-09-31-41-765.png',
    description: 'Lightweight adjustable tripod for mobile phones and cameras. Stable support for shooting videos, photos and live streams.'
  },
  {
    id: 5,
    name: 'Premium Wireless Neckband',
    price: 399,
    category: 'Neckband / Earbuds',
    image: 'https://i.ibb.co/PpDH0k8/IMG-20260613-093218.png',
    description: 'Premium wireless neckband with crystal clear sound, powerful bass and long standby time. Best companion for workouts and travel.'
  },
  {
    id: 6,
    name: 'True Wireless Earbuds',
    price: 399,
    category: 'Earbuds',
    image: 'https://i.ibb.co/k64g14Z8/IMG-20260613-121307.jpg',
    description: 'True wireless earbuds with touch controls, stereo sound and portable charging case. Compact and trendy design.'
  },
  {
    id: 7,
    name: 'Over-Ear Wireless Headphone',
    price: 584,
    category: 'Headphone',
    image: 'https://i.ibb.co/DHVMww2J/file-000000004d50720bade1745954590b0e.png',
    description: 'Over-ear wireless headphone with immersive sound, cushioned ear cups and long battery life. Perfect for gaming and music.'
  },
  {
    id: 8,
    name: 'Women Full Set Jewellery',
    price: 399,
    category: 'Women Jewellery',
    image: 'https://i.ibb.co/3YYZrkcQ/file-0000000054f4720ba1a2cfb76bc35ef5.png',
    description: 'Elegant women full jewellery set including necklace, earrings and matching accessories. Perfect for weddings and festive occasions.'
  },
  {
    id: 9,
    name: 'Designer Women Jewellery Set',
    price: 399,
    category: 'Women Jewellery',
    image: 'https://i.ibb.co/yMGP2DL/file-00000000e25c720b844218670c18bc58.png',
    description: 'Beautiful designer jewellery set for women. Adds glamour to ethnic and party wear at an affordable price.'
  },
  {
    id: 10,
    name: 'Stylish Men Pendant Jewellery',
    price: 199,
    category: 'Men Jewellery',
    image: 'https://i.ibb.co/W42WmyQ9/file-00000000565071f88c511f6e22d1cf0c.png',
    description: 'Trendy men pendant jewellery with a bold and stylish look. Great for daily wear and gifting.'
  }
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
