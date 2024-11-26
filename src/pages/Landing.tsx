import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-pink-500/20 via-gray-900 to-gray-900 opacity-70"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
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
                <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-500/10">
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
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-600">
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={plan.title}
              className="p-6 rounded-lg bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 animate-fade-in border border-gray-700"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{plan.title}</h3>
              <p className="text-4xl font-bold text-pink-500 mb-6">${plan.price}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-pink-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    title: "Body Metrics",
    icon: <div className="h-12 w-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">📊</div>,
    description: "Track your BMI, body fat, and other vital metrics with precision."
  },
  {
    title: "Smart Analytics",
    icon: <div className="h-12 w-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">📈</div>,
    description: "Get detailed insights and visualizations of your fitness progress."
  },
  {
    title: "Personalized Plans",
    icon: <div className="h-12 w-12 rounded-lg bg-pink-500/10 text-pink-500 flex items-center justify-center mb-4">🎯</div>,
    description: "Receive customized recommendations based on your fitness data."
  }
];

const pricingPlans = [
  {
    title: "Basic",
    price: "0",
    features: [
      "Basic calculators",
      "Progress tracking",
      "Community support"
    ]
  },
  {
    title: "Pro",
    price: "9.99",
    features: [
      "All Basic features",
      "Advanced analytics",
      "Custom workout plans",
      "Priority support"
    ]
  },
  {
    title: "Enterprise",
    price: "29.99",
    features: [
      "All Pro features",
      "API access",
      "Custom branding",
      "Dedicated support",
      "Team management"
    ]
  }
];

export default Landing;