import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/components/common/UserButton";

interface HeaderProps {
  isLanding?: boolean;
  children?: React.ReactNode;
}

const Header = ({ isLanding, children }: HeaderProps) => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          {children}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/165f3aff-06b0-4b7f-84cb-c3257ac7b5ae.png" 
              alt="Healthy Thako Logo" 
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!isLanding && isAuthenticated ? (
            <UserButton />
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;