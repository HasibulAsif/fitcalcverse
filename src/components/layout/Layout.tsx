import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import AIAssistant from '../chat/AIAssistant';
import HireTrainerButton from '../common/HireTrainerButton';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Layout = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Desktop Sidebar */}
      {!isLandingPage && (
        <div className="hidden lg:block">
          <Sidebar />
        </div>
      )}
      
      {/* Mobile Sidebar */}
      {!isLandingPage && (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar mobile onClose={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-col flex-1">
        <Header isLanding={isLandingPage}>
          {!isLandingPage && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          )}
        </Header>
        
        <main className={`flex-1 overflow-auto ${isLandingPage ? 'w-full' : ''} mt-16`}>
          <div className={`${isLandingPage ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
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