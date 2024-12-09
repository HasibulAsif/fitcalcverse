import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export const PricingSection = () => {
  return (
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
          <div className="relative p-8 rounded-xl backdrop-blur-md bg-primary/10 border border-primary/50 hover:bg-primary/20 transition-all duration-300 transform hover:scale-105">
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
  );
};