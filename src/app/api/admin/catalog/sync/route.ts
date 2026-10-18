import { NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth';
import { runCatalogImport } from '@/lib/catalogSync';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow sufficient time for Cloudinary uploads

export async function POST(_req: NextRequest) {
  try {
    // 1. Enforce admin authentication
    await requireAdminSession();

    // 2. Run safe catalog synchronization
    const result = await runCatalogImport();

    return NextResponse.json({
      success: true,
      summary: result,
      message: `Catalog synchronized successfully. ${result.createdCount} created, ${result.updatedCount} updated, ${result.imagesUploaded} images uploaded.`,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
    }
    console.error('[POST /api/admin/catalog/sync] Error:', error);
    return NextResponse.json(
      { error: error.message || 'Catalog synchronization failed.' },
      { status: 500 }
    );
  }
}
