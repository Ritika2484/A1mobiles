import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

import { runCatalogImport } from '../src/lib/catalogSync';
import mongoose from 'mongoose';

async function main() {
  console.log('===========================================================');
  console.log('🚀 A1 Mobile Shop — Official Catalog Cloudinary & DB Import');
  console.log('===========================================================\n');

  try {
    const summary = await runCatalogImport();
    console.log('\n===========================================================');
    console.log('📊 IMPORT SUMMARY REPORT');
    console.log('===========================================================');
    console.log(`• Total Models Researched: ${summary.totalProcessed}`);
    console.log(`• New Products Created:    ${summary.createdCount}`);
    console.log(`• Existing Products Updated: ${summary.updatedCount}`);
    console.log(`• Duplicates Skipped:       ${summary.skippedCount}`);
    console.log(`• Cloudinary Images Uploaded: ${summary.imagesUploaded}`);
    console.log(`• Cloudinary Images Reused:   ${summary.imagesReused}`);
    console.log(`• Failed Uploads:             ${summary.failedUploads.length}`);
    if (summary.failedUploads.length > 0) {
      summary.failedUploads.forEach((f) => console.log(`   - ${f.model}: ${f.reason}`));
    }
    console.log(`• Database Errors:            ${summary.errors.length}`);
    if (summary.errors.length > 0) {
      summary.errors.forEach((e) => console.log(`   - ${e.model}: ${e.error}`));
    }
    console.log('===========================================================\n');
  } catch (err: any) {
    console.error('Fatal execution error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB.');
  }
}

if (require.main === module) {
  main();
}
