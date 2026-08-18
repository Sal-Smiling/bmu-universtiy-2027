import React from 'react';
import Hero from '../sections/Hero';
import PartnersSection from '../sections/PartnersSection';
import ManagementSection from '../sections/ManagementSection';
import NewsSection from '../sections/NewsSection';
import MapSection from '../sections/MapSection';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* 1. Immersive Antigravity Hero Section */}
      <Hero />

      {/* 2. Official Partners & Global Collaborations Section */}
      <PartnersSection />

      {/* 3. University Management & Executive Leadership Section */}
      <ManagementSection />

      {/* 4. University Chronicle & Latest News Section */}
      <NewsSection />

      {/* 5. 3D Interactive Campus Map Section */}
      <MapSection />
    </div>
  );
};

export default Home;
