import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, BarChart2, Brain } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              FitCalcVerse
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl">
              Your comprehensive fitness calculation toolkit. Make data-driven decisions for your fitness journey.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 animate-fade-in">
            <Activity className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Fitness Tracking</h3>
            <p className="text-gray-400">Track your BMI, body fat, and other vital metrics with precision.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 animate-fade-in delay-100">
            <BarChart2 className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Data Analysis</h3>
            <p className="text-gray-400">Get detailed insights and visualizations of your fitness progress.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 animate-fade-in delay-200">
            <Brain className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Smart Recommendations</h3>
            <p className="text-gray-400">Receive personalized suggestions based on your fitness data.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;