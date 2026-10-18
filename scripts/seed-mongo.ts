import { connectDB, AdminUser } from '../src/lib/db';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

async function main() {
  console.log('🌱 Starting MongoDB Atlas seed...');

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri || mongoUri.includes('your_mongodb_atlas_connection_string')) {
    console.error('❌ MONGODB_URI is not configured in .env.');
    console.error('👉 Please set MONGODB_URI=your_mongodb_atlas_connection_string in .env to run seed.');
    process.exit(1);
  }

  await connectDB();
  console.log('✅ Connected to MongoDB Atlas.');

  // 1. Seed Admin User
  const adminEmail = (process.env.ADMIN_SEED_EMAIL || 'Jaikishanhome1998@gmail.com').toLowerCase().trim();
  const adminPassword = process.env.ADMIN_SEED_PASSWORD || 'Admin@123456';

  const existingAdmin = await AdminUser.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(adminPassword, 12);
    const admin = await AdminUser.create({
      email: adminEmail,
      passwordHash,
    });
    console.log(`✅ Admin user created: ${admin.email}`);
  } else {
    console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
  }

  console.log('✨ Seed completed successfully (Admin user verified, no sample products seeded).');
  await mongoose.disconnect();
}

main().catch(async (e) => {
  console.error('❌ Error during seed:', e);
  await mongoose.disconnect().catch(() => {});
  process.exit(1);
});
