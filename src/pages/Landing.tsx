import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Calculator, Brain, Dumbbell, Heart, Scale, Check } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden w-full">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full">
        {/* Mesh Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#FF4D8D33_0%,_transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#FF1A7533_0%,_transparent_40%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#2A2A2A33_0%,_transparent_40%)]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 w-full">
          {/* Animated Logo/Icon */}
          <div className="mb-8 animate-bounce">
            <Dumbbell className="w-16 h-16 text-primary" />
          </div>

          {/* Main Title with Animation */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-pink-500 to-primary bg-300% animate-gradient">
              Transform Your Body
            </span>
            <br />
            <span className="text-white mt-2 block">
              Calculate Your Success
            </span>
          </h1>

          {/* Subtitle with Fade Animation */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in opacity-90 leading-relaxed">
            Unlock your fitness potential with our precision calculators. 
            Track, measure, and achieve your goals with scientific accuracy.
          </p>

          {/* CTA Buttons with Hover Effects */}
          <div className="flex flex-wrap justify-center gap-6 animate-fade-in">
            <Link to="/register">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-primary/50"
              >
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary/50 text-primary hover:bg-primary/10 text-lg px-8 py-6 transform hover:scale-105 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </div>

          {/* Floating Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-1 h-16 bg-gradient-to-b from-primary to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Features section */}
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

      {/* New Pricing Section */}
      <div className="relative z-10 py-24 w-full bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Start for free and upgrade as you grow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="p-8 rounded-xl backdrop-blur-md bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Free</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="text-4xl font-bold text-white mb-6">
                10 <span className="text-lg font-normal text-gray-400">credits</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Access to all calculators
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Basic analytics
                </li>
              </ul>
              <Link to="/register">
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Premium Plan */}
            <div className="p-8 rounded-xl backdrop-blur-md bg-primary/10 border border-primary/50 hover:bg-primary/20 transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-white">Popular</Badge>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Premium</h3>
              <p className="text-gray-400 mb-6">For serious fitness enthusiasts</p>
              <div className="text-4xl font-bold text-white mb-6">
                $9.99 <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Unlimited calculations
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Priority support
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Coming Soon
              </Button>
            </div>

            {/* Pro Plan */}
            <div className="p-8 rounded-xl backdrop-blur-md bg-gray-800/30 border border-gray-700/50 hover:bg-gray-800/50 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-4">Pro</h3>
              <p className="text-gray-400 mb-6">For teams and professionals</p>
              <div className="text-4xl font-bold text-white mb-6">
                $24.99 <span className="text-lg font-normal text-gray-400">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Everything in Premium
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  API Access
                </li>
                <li className="flex items-center text-gray-300">
                  <Check className="w-5 h-5 text-primary mr-2" />
                  Custom branding
                </li>
              </ul>
              <Button className="w-full bg-primary hover:bg-primary/90">
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 py-24 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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

// Features array
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
