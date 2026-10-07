import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { TrustFeatures } from '@/components/home/TrustFeatures';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { SellDeviceHero } from '@/components/home/SellDeviceHero';
import { SellDeviceSteps } from '@/components/home/SellDeviceSteps';
import { SellDeviceCategories } from '@/components/home/SellDeviceCategories';
import { DeviceValuationTool } from '@/components/home/DeviceValuationTool';
import { TradeInBanner } from '@/components/home/TradeInBanner';
import { BestDeals } from '@/components/home/BestDeals';
import { BrandsSection } from '@/components/home/BrandsSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { BuyProcess } from '@/components/home/BuyProcess';
import { PromoBannerWide } from '@/components/home/PromoBannerWide';
import { Testimonials } from '@/components/home/Testimonials';
import { StoreLocationSection } from '@/components/home/StoreLocationSection';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      {/* 4. Hero / Featured Smartphone */}
      <HeroSection />

      {/* 5. Trust Features */}
      <TrustFeatures />

      {/* 6. Explore Categories */}
      <CategorySection />

      {/* 7. Popular Smartphones */}
      <FeaturedProducts />

      {/* 8. Sell Your Old Device CTA */}
      <SellDeviceHero />

      {/* 9. "Sell Your Old Device in 3 Simple Steps" */}
      <SellDeviceSteps />

      {/* Device Categories for Selling */}
      <SellDeviceCategories />

      {/* 10. Device Valuation / Check Price */}
      <DeviceValuationTool />

      {/* 11. Trade-In / Exchange */}
      <TradeInBanner />

      {/* 12. Best Deals */}
      <BestDeals />

      {/* 13. Shop by Brand */}
      <BrandsSection />

      {/* 14. Why Choose A1 */}
      <WhyChooseUs />

      {/* 15. How to Buy */}
      <BuyProcess />

      {/* 16. Promotional Banner */}
      <PromoBannerWide />

      {/* 17. Customer Reviews */}
      <Testimonials />

      {/* 18. Visit A1 Mobile Shop (Gorakhpur Physical Store) */}
      <StoreLocationSection />

      {/* 19. Newsletter / CTA */}
      <Newsletter />
    </>
  );
}
