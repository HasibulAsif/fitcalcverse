import { useAuth } from "@/contexts/AuthContext";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardFeatures } from "@/components/dashboard/DashboardFeatures";

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative p-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Welcome back, {user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-white/90 text-lg">
              Track your fitness journey and achieve your goals with our comprehensive tools
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Features</h2>
        <DashboardFeatures />
      </section>
    </div>
  );
};

export default Index;