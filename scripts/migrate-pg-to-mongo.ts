import { connectDB, AdminUser, Product, OrderEnquiry } from '../src/lib/db';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';

// Load .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function migrateData() {
  console.log('====================================================');
  console.log('🔄 PostgreSQL to MongoDB Atlas Migration Script');
  console.log('====================================================');

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || mongoUri.includes('your_mongodb_atlas_connection_string')) {
    console.error('❌ MONGODB_URI is not set or contains the placeholder value.');
    console.error('👉 Please configure MONGODB_URI in your .env file with your MongoDB Atlas connection string.');
    process.exit(1);
  }

  console.log('1️⃣ Connecting to MongoDB Atlas...');
  await connectDB();
  console.log('✅ Connected to MongoDB Atlas successfully.\n');

  console.log('2️⃣ Checking PostgreSQL connection and data...');
  let pgAvailable = false;
  let pgAdmins: any[] = [];
  let pgProducts: any[] = [];
  let pgEnquiries: any[] = [];

  try {
    // Dynamic import to avoid hard crash if Prisma is removed or offline
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    try {
      pgAdmins = await prisma.adminUser.findMany();
      pgProducts = await prisma.product.findMany();
      pgEnquiries = await prisma.orderEnquiry.findMany();
      pgAvailable = true;
      console.log(`✅ PostgreSQL connection succeeded!`);
      console.log(`   - Found ${pgAdmins.length} admin user(s)`);
      console.log(`   - Found ${pgProducts.length} product(s)`);
      console.log(`   - Found ${pgEnquiries.length} order enquiry(ies)\n`);
    } catch (pgQueryError: any) {
      console.warn('⚠️ Could not fetch data from PostgreSQL:', pgQueryError.message || pgQueryError);
    } finally {
      await prisma.$disconnect();
    }
  } catch (err: any) {
    console.warn('⚠️ Prisma client not available or PostgreSQL unreachable:', err.message || err);
  }

  if (pgAvailable && (pgAdmins.length > 0 || pgProducts.length > 0 || pgEnquiries.length > 0)) {
    console.log('3️⃣ Migrating PostgreSQL records to MongoDB Atlas (Idempotent)...');

    // 1. Migrate Admin Users
    let migratedAdmins = 0;
    for (const admin of pgAdmins) {
      await AdminUser.findOneAndUpdate(
        { _id: admin.id },
        {
          _id: admin.id,
          email: admin.email.toLowerCase().trim(),
          passwordHash: admin.passwordHash,
          createdAt: admin.createdAt,
          updatedAt: admin.updatedAt,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      migratedAdmins++;
    }
    console.log(`   ✅ Migrated ${migratedAdmins} Admin Users.`);

    // 2. Migrate Products
    let migratedProducts = 0;
    for (const prod of pgProducts) {
      await Product.findOneAndUpdate(
        { _id: prod.id },
        {
          _id: prod.id,
          slug: prod.slug.toLowerCase().trim(),
          name: prod.name.trim(),
          brand: prod.brand.trim(),
          category: prod.category.toLowerCase().trim(),
          price: prod.price,
          originalPrice: prod.originalPrice,
          discount: prod.discount,
          description: prod.description,
          imageUrl: prod.imageUrl || null,
          imagePublicId: prod.imagePublicId || null,
          inStock: prod.inStock,
          isActive: prod.isActive,
          featured: prod.featured,
          tag: prod.tag || null,
          createdAt: prod.createdAt,
          updatedAt: prod.updatedAt,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      migratedProducts++;
    }
    console.log(`   ✅ Migrated ${migratedProducts} Products.`);

    // 3. Migrate Order Enquiries
    let migratedEnquiries = 0;
    for (const enq of pgEnquiries) {
      await OrderEnquiry.findOneAndUpdate(
        { _id: enq.id },
        {
          _id: enq.id,
          productId: enq.productId,
          quantity: enq.quantity,
          priceSnapshot: enq.priceSnapshot,
          status: enq.status,
          whatsappUrl: enq.whatsappUrl || null,
          customerNote: enq.customerNote || null,
          createdAt: enq.createdAt,
          updatedAt: enq.updatedAt,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      migratedEnquiries++;
    }
    console.log(`   ✅ Migrated ${migratedEnquiries} Order Enquiries.`);

    // Validation
    const mongoAdminCount = await AdminUser.countDocuments();
    const mongoProductCount = await Product.countDocuments();
    const mongoEnquiryCount = await OrderEnquiry.countDocuments();

    console.log('\n4️⃣ Migration Verification:');
    console.log(`   - PostgreSQL Admins: ${pgAdmins.length} | MongoDB Admins: ${mongoAdminCount}`);
    console.log(`   - PostgreSQL Products: ${pgProducts.length} | MongoDB Products: ${mongoProductCount}`);
    console.log(`   - PostgreSQL Enquiries: ${pgEnquiries.length} | MongoDB Enquiries: ${mongoEnquiryCount}`);

    console.log('\n✨ Database migration completed successfully.');
  } else {
    console.log('\nℹ️ No active data found in PostgreSQL or PostgreSQL is unreachable.');
    console.log('👉 To seed initial products and admin user into MongoDB, run:');
    console.log('   npm run seed\n');
  }

  await mongoose.disconnect();
}

migrateData().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
