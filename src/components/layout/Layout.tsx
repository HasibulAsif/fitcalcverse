import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import AIAssistant from '../chat/AIAssistant';
import HireTrainerButton from '../common/HireTrainerButton';

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {!isLandingPage && <Sidebar />}
      <div className="flex flex-col flex-1">
        <Header isLanding={isLandingPage} />
        <main className={`flex-1 overflow-auto ${isLandingPage ? 'w-full' : ''} mt-16`}>
          <div className={`${isLandingPage ? 'w-full' : 'max-w-7xl mx-auto px-8'}`}>
            <Outlet />
          </div>
        </main>
        {isLandingPage && <Footer />}
      </div>
      <HireTrainerButton />
      {!isLandingPage && <AIAssistant />}
    </div>
  );
};

export default Layout;