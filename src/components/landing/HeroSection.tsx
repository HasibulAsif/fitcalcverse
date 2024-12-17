import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Dumbbell } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full -mt-16">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#FF4D8D33_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_#FF1A7533_0%,_transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_#2A2A2A33_0%,_transparent_40%)]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 lg:px-8 w-full pt-16">
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
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in delay-100 opacity-90 leading-relaxed">
          Unlock your fitness potential with our precision calculators. 
          Track, measure, and achieve your goals with scientific accuracy.
        </p>

        {/* CTA Buttons with Hover Effects */}
        <div className="flex flex-wrap justify-center gap-6 animate-fade-in delay-200">
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
  );
};