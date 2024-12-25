import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Search,
  Apple,
  ChartBar,
  Dumbbell,
  ArrowRight,
  Info,
  HelpCircle
} from "lucide-react";

export const DashboardFeatures = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'CalorieBhai',
      description: 'Get instant nutrition information for any food',
      icon: <Search className="w-6 h-6 text-primary" />,
      path: '/calorie-bhai',
      color: 'from-primary/10 to-accent/10',
      guide: [
        { title: 'Search Foods', content: 'Enter any food item to get detailed nutritional information' },
        { title: 'Image Upload', content: 'Upload food images for automatic recognition' },
        { title: 'Natural Language', content: 'Describe your meals in plain text' }
      ]
    },
    {
      title: 'NutriPlanPro',
      description: 'Advanced nutrition planning and tracking',
      icon: <Apple className="w-6 h-6 text-green-500" />,
      path: '/nutri-plan-pro',
      color: 'from-green-500/10 to-green-600/10',
      guide: [
        { title: 'Set Goals', content: 'Define your nutrition and fitness objectives' },
        { title: 'Track Progress', content: 'Monitor your daily nutrition intake' },
        { title: 'Get Insights', content: 'Receive personalized recommendations' }
      ]
    },
    {
      title: 'TotalFit Calculator',
      description: 'Comprehensive fitness calculations',
      icon: <Calculator className="w-6 h-6 text-blue-500" />,
      path: '/total-fit-calculator',
      color: 'from-blue-500/10 to-blue-600/10',
      guide: [
        { title: 'Body Metrics', content: 'Calculate BMI, BMR, and other key metrics' },
        { title: 'Nutrition Goals', content: 'Get personalized macro and calorie targets' },
        { title: 'Workout Planning', content: 'Receive exercise recommendations' }
      ]
    },
    {
      title: 'Performance Analytics',
      description: 'Detailed insights into your progress',
      icon: <ChartBar className="w-6 h-6 text-purple-500" />,
      path: '/performance-analytics',
      color: 'from-purple-500/10 to-purple-600/10',
      guide: [
        { title: 'Track Progress', content: 'Monitor your fitness journey' },
        { title: 'Analyze Trends', content: 'View detailed performance graphs' },
        { title: 'Set Benchmarks', content: 'Compare against your goals' }
      ]
    },
    {
      title: 'Workout Plan',
      description: 'Get AI-powered workout recommendations',
      icon: <Dumbbell className="w-6 h-6 text-orange-500" />,
      path: '/workout-suggestion',
      color: 'from-orange-500/10 to-orange-600/10',
      guide: [
        { title: 'Personalized Plans', content: 'Get workouts tailored to your goals' },
        { title: 'Exercise Library', content: 'Access detailed exercise instructions' },
        { title: 'Progress Tracking', content: 'Log and monitor your workouts' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="space-y-4">
            <Card 
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
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

            <Card className="p-4 bg-secondary/50 backdrop-blur-sm animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Info className="w-4 h-4 text-primary" />
                <h4 className="font-semibold">How to Use</h4>
              </div>
              <div className="space-y-3">
                {feature.guide.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 text-sm transition-all duration-300 hover:translate-x-1"
                  >
                    <HelpCircle className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <span className="font-medium">{item.title}:</span>
                      <span className="text-muted-foreground ml-1">{item.content}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};