import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Calculator, Brain, Dumbbell, Heart, Scale } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Hero Section with Full-width Image */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
            alt="Fitness Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
                  Transform Your Body
                </span>
                <br />
                <span className="text-white">Calculate Your Success</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in opacity-90">
                Unlock your fitness potential with our precision calculators. Track, measure, and achieve your goals with scientific accuracy.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in">
                <Link to="/register">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                    Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-black relative z-10 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
              Professional Fitness Tools
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to make informed decisions about your fitness journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="group p-8 rounded-xl backdrop-blur-md bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300 animate-fade-in hover:scale-105 hover:shadow-xl hover:shadow-primary/10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-pink-500/20 text-primary mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500"> Fitness Journey?</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Join thousands of fitness enthusiasts who are achieving their goals with HT Workout
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
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