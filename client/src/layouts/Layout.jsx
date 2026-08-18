import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PromoModal from '../components/PromoModal';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bmu-bg text-white selection:bg-bmu-red selection:text-white">
      <Navigation />
      <PromoModal />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
