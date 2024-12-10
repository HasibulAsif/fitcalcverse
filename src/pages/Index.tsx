import React from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { DashboardFeatures } from "@/components/dashboard/DashboardFeatures";
import { DashboardStats } from "@/components/dashboard/DashboardStats";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in px-4 sm:px-6 lg:px-8">
      {/* Welcome Section with Animated Mesh Gradient */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 via-accent/80 to-primary/90 bg-[length:200%_200%] animate-gradient">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_#FF1A7533_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_#FF4D8D33_0%,_transparent_50%)]"></div>
        <div className="relative p-6 sm:p-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Welcome back, {user?.email?.split('@')[0]}!
            </h1>
            <p className="text-white/90 text-sm sm:text-base">
              Track your fitness journey and achieve your goals with our comprehensive tools
            </p>
          </div>
        </div>
      </section>

      {/* Stats Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Overview</h2>
        <DashboardStats />
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Features</h2>
        <DashboardFeatures />
      </section>
    </div>
  );
};

export default Index;