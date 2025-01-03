import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Target,
  Leaf,
  ChartBar,
  Dumbbell,
  Activity,
  Zap,
  Apple,
  Search,
  Brain,
  Scale,
  HeartPulse,
  Droplets,
  Gauge,
  ArrowRight,
  Bot
} from "lucide-react";

export const DashboardFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'AI Fitness Assistant',
      description: 'Get personalized fitness advice from our AI assistant',
      icon: <Bot className="w-6 h-6 text-primary" />,
      path: '/ai-fitness-assistant',
      color: 'from-primary/10 to-accent/10'
    },
    {
      title: 'CalorieBhai',
      description: 'Get instant nutrition information for any food',
      icon: <Search className="w-6 h-6 text-primary" />,
      path: '/calorie-bhai',
      color: 'from-primary/10 to-accent/10'
    },
    {
      title: 'NutriPlanPro',
      description: 'Advanced nutrition planning and tracking',
      icon: <Apple className="w-6 h-6 text-green-500" />,
      path: '/nutri-plan-pro',
      color: 'from-green-500/10 to-green-600/10'
    },
    {
      title: 'TotalFit Calculator',
      description: 'Comprehensive fitness calculations',
      icon: <Calculator className="w-6 h-6 text-blue-500" />,
      path: '/total-fit-calculator',
      color: 'from-blue-500/10 to-blue-600/10'
    },
    {
      title: 'Workout Planner',
      description: 'Create and schedule your workout routines',
      icon: <Dumbbell className="w-6 h-6 text-orange-500" />,
      path: '/workout-routine-planner',
      color: 'from-orange-500/10 to-orange-600/10'
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed insights into your progress',
      icon: <ChartBar className="w-6 h-6 text-purple-500" />,
      path: '/performance-analytics',
      color: 'from-purple-500/10 to-purple-600/10'
    },
    {
      title: 'BMI Calculator',
      description: 'Calculate and track your Body Mass Index',
      icon: <Scale className="w-6 h-6 text-pink-500" />,
      path: '/bmi-calculator',
      color: 'from-pink-500/10 to-pink-600/10'
    },
    {
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage',
      icon: <Gauge className="w-6 h-6 text-yellow-500" />,
      path: '/body-fat-calculator',
      color: 'from-yellow-500/10 to-yellow-600/10'
    },
    {
      title: 'Heart Rate Zones',
      description: 'Calculate your optimal heart rate zones',
      icon: <HeartPulse className="w-6 h-6 text-red-500" />,
      path: '/heart-rate-zone-calculator',
      color: 'from-red-500/10 to-red-600/10'
    },
    {
      title: 'Water Intake',
      description: 'Calculate your daily water needs',
      icon: <Droplets className="w-6 h-6 text-cyan-500" />,
      path: '/water-intake-calculator',
      color: 'from-cyan-500/10 to-cyan-600/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group animate-fade-in"
          onClick={() => navigate(feature.path)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`} />
          <div className="relative p-6">
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-200 text-sm mb-4">{feature.description}</p>
            <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
              <span className="text-sm">Explore</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
