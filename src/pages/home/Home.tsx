import React from 'react';
import { HeroSection } from '@/components/HeroSection';
import { FlashSales } from '@/components/FlashSales';
import { BrowseCategories } from '@/components/BrowseCategories';
import { BestSelling } from '@/components/BestSelling';
import { PromoBanner } from '@/components/BromoBaner';
import { ExploreProducts } from '@/components/ExploreBroducts';
import { NewArrival } from '@/components/NewArrival';
import { ServicesSection } from '@/components/ServicesSection';

export const Home: React.FC = () => {
  return (
    <div className="container bg-white font-sans text-black overflow-x-hidden">
      <main className="space-y-12 sm:space-y-16 lg:space-y-20">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Flash Sales */}
        <FlashSales />

        {/* 3. Browse By Category */}
        <BrowseCategories />

        {/* 4. Best Selling Products */}
        <BestSelling />

        {/* 5. Promotional Banner */}
        <PromoBanner />

        {/* 6. Explore Our Products */}
        <ExploreProducts />

        {/* 7. New Arrival */}
        <NewArrival />

        {/* 8. Services / Benefits */}
        <ServicesSection />
      </main>
    </div>
  );
};

export default Home;