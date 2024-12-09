import { Activity, Brain, Calculator, Dumbbell, Heart, Scale } from "lucide-react";

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

export const FeaturesSection = () => {
  return (
    <div className="bg-black relative z-10 py-24 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
  );
};