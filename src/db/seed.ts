import { db } from '../server/db/client';
import * as schema from './schema';
import {
  SEED_PRODUCTS,
  SEED_PROMOTIONS,
  SEED_REVIEWS,
  SEED_LOCATIONS,
  SEED_USERS,
  INITIAL_CMS_SECTIONS,
} from './seed-data';

export async function seedDatabase() {
  console.log('Seeding Burger Craft database on Turso...');

  try {
    // 1. Seed Users
    for (const u of SEED_USERS) {
      await db.insert(schema.users).values({
        id: u.id,
        name: u.name,
        email: u.email,
        emailVerified: true,
        image: u.avatarUrl,
        role: u.role,
        createdAt: u.createdAt,
        updatedAt: u.createdAt,
      }).onConflictDoNothing();
    }
    console.log(`Seeded ${SEED_USERS.length} users.`);

    // 2. Seed Products
    for (const p of SEED_PRODUCTS) {
      await db.insert(schema.products).values({
        id: p.id,
        name: p.name,
        slug: p.slug,
        description: p.description,
        fullDescription: p.fullDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        imageUrl: p.imageUrl,
        calories: p.calories,
        isAvailable: p.isAvailable,
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        salesCount: p.salesCount,
        rating: Math.round(p.rating * 10),
        reviewCount: p.reviewCount,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }).onConflictDoNothing();
    }
    console.log(`Seeded ${SEED_PRODUCTS.length} products.`);

    // 3. Seed Promotions
    for (const promo of SEED_PROMOTIONS) {
      await db.insert(schema.promotions).values({
        id: promo.id,
        code: promo.code,
        title: promo.title,
        description: promo.description,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        minOrderAmount: promo.minOrderAmount,
        startDate: promo.startDate,
        endDate: promo.endDate,
        usageLimit: promo.usageLimit,
        timesUsed: promo.timesUsed,
        isActive: promo.isActive,
        bannerText: promo.bannerText,
      }).onConflictDoNothing();
    }
    console.log(`Seeded ${SEED_PROMOTIONS.length} promotions.`);

    // 4. Seed Reviews
    for (const rev of SEED_REVIEWS) {
      await db.insert(schema.reviews).values({
        id: rev.id,
        customerName: rev.customerName,
        rating: rev.rating,
        comment: rev.comment,
        productName: rev.productName,
        isApproved: rev.isApproved,
        isFeatured: rev.isFeatured,
        avatarUrl: rev.avatarUrl,
        date: rev.date,
      }).onConflictDoNothing();
    }
    console.log(`Seeded ${SEED_REVIEWS.length} reviews.`);

    console.log('Database seeding successfully finished!');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

// Auto-run if executed directly
if (process.argv[1]?.includes('seed.ts')) {
  seedDatabase().then(() => process.exit(0));
}
