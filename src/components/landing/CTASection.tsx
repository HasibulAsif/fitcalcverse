import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <div className="relative z-10 py-24 w-full">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Transform Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500"> Fitness Journey?</span>
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Join thousands of fitness enthusiasts who are achieving their goals with HT Workout
        </p>
        <Link to="/register">
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
            Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};