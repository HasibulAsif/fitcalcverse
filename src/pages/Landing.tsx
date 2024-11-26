import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Calculator, Brain, Dumbbell, Heart, Scale } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Hero Section with Dynamic Background */}
      <div className="relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd')] bg-cover bg-center opacity-20"></div>
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-blue-500/30 animate-[pulse_8s_ease-in-out_infinite]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="relative z-10 space-y-8 text-center">
            <div className="space-y-4 animate-fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                  HT Workout
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Transform your fitness journey with precision. Calculate, track, and achieve your goals with our comprehensive fitness toolkit.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
              <Link to="/register">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8">
                  Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-pink-500/50 text-pink-500 hover:bg-pink-500/10 text-lg px-8"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-4">
            Comprehensive Fitness Tools
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to make informed decisions about your fitness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="group p-8 rounded-xl backdrop-blur-md bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl hover:shadow-pink-500/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-500/20 text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"> Fitness Journey?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of fitness enthusiasts who are achieving their goals with HT Workout
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-lg px-8">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Body Composition",
    icon: <Scale className="w-6 h-6" />,
    description: "Track your BMI, body fat percentage, and lean mass with professional-grade calculations."
  },
  {
    title: "Energy & Metabolism",
    icon: <Activity className="w-6 h-6" />,
    description: "Calculate your daily caloric needs and track calories burned during activities."
  },
  {
    title: "Smart Analytics",
    icon: <Brain className="w-6 h-6" />,
    description: "Get detailed insights and personalized recommendations based on your data."
  },
  {
    title: "Workout Planning",
    icon: <Dumbbell className="w-6 h-6" />,
    description: "Access tools to plan and optimize your training sessions effectively."
  },
  {
    title: "Health Monitoring",
    icon: <Heart className="w-6 h-6" />,
    description: "Keep track of vital health metrics and monitor your progress over time."
  },
  {
    title: "Precision Calculations",
    icon: <Calculator className="w-6 h-6" />,
    description: "Use industry-standard formulas and methods for accurate fitness calculations."
  }
];

export default Landing;