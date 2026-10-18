import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_SEED_EMAIL || 'Jaikishanhome1998@gmail.com';
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'Admin@123456';

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const admin = await prisma.adminUser.create({
      data: {
        email: adminEmail,
        passwordHash,
      },
    });
    console.log(`✅ Admin user created: ${admin.email}`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  // 2. Seed initial sample products
  const sampleProducts = [
    {
      slug: 'iphone-16-pro-max',
      name: 'iPhone 16 Pro Max 256GB Desert Titanium',
      brand: 'Apple',
      category: 'smartphones',
      price: 139900,
      originalPrice: 144900,
      discount: 3,
      description: 'The pinnacle of smartphone innovation featuring the A18 Pro chip, titanium design, 48MP Fusion camera system with 5x Telephoto, and extraordinary battery life.',
      imageUrl: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      inStock: true,
      isActive: true,
      featured: true,
      tag: 'Best Seller',
    },
    {
      slug: 'samsung-galaxy-s24-ultra',
      name: 'Samsung Galaxy S24 Ultra 5G 256GB Titanium Gray',
      brand: 'Samsung',
      category: 'smartphones',
      price: 129999,
      originalPrice: 134999,
      discount: 4,
      description: 'Galaxy AI is here. Epic titanium shield with built-in S Pen, 200MP camera with Quad Telephoto system, and the brightest flat display with Corning Gorilla Armor.',
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      inStock: true,
      isActive: true,
      featured: true,
      tag: 'Hot Deal',
    },
    {
      slug: 'oneplus-12',
      name: 'OnePlus 12 5G 16GB RAM 512GB Flowy Emerald',
      brand: 'OnePlus',
      category: 'smartphones',
      price: 69999,
      originalPrice: 74999,
      discount: 7,
      description: 'Powered by Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera System, 5400 mAh battery with 100W SUPERVOOC charging, and 2K 120 Hz ProXDR display.',
      imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80',
      inStock: true,
      isActive: true,
      featured: true,
      tag: 'Top Rated',
    },
    {
      slug: 'airpods-pro-2nd-gen',
      name: 'Apple AirPods Pro (2nd Generation) with USB-C MagSafe Case',
      brand: 'Apple',
      category: 'accessories',
      price: 24900,
      originalPrice: 26900,
      discount: 7,
      description: 'Active Noise Cancellation up to 2x more effective, Transparency mode, Adaptive Audio, and Personalized Spatial Audio with dynamic head tracking.',
      imageUrl: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=800&q=80',
      inStock: true,
      isActive: true,
      featured: true,
      tag: 'Trending',
    },
    {
      slug: 'samsung-galaxy-watch-6-classic',
      name: 'Samsung Galaxy Watch6 Classic 47mm LTE Black',
      brand: 'Samsung',
      category: 'accessories',
      price: 36999,
      originalPrice: 42999,
      discount: 14,
      description: 'Timeless style with a rotating bezel, advanced sleep coaching, ECG and blood pressure monitoring, and Sapphire Crystal glass.',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      inStock: true,
      isActive: true,
      featured: false,
      tag: 'Special Offer',
    },
  ];

  for (const item of sampleProducts) {
    const existing = await prisma.product.findUnique({
      where: { slug: item.slug },
    });
    if (!existing) {
      await prisma.product.create({ data: item });
      console.log(`✅ Seeded product: ${item.name}`);
    }
  }

  console.log('✨ Seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
