import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const HireTrainerButton = () => {
  return (
    <div className="fixed bottom-20 right-4 z-50">
      <a
        href="https://www.healthythako.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button
          className="group relative overflow-hidden rounded-full px-8 py-6 shadow-lg transition-all duration-500
            before:absolute before:inset-0 
            before:bg-gradient-to-r before:from-primary/40 before:via-accent/40 before:to-primary/40 
            before:bg-[length:200%_100%] before:animate-gradient
            after:absolute after:inset-0 after:bg-gradient-to-r after:from-primary after:via-accent after:to-primary 
            after:bg-[length:200%_100%] after:animate-gradient after:mix-blend-overlay
            hover:scale-105 hover:shadow-primary/25"
        >
          <span className="relative flex items-center gap-2 text-lg font-semibold text-white">
            Hire Trainer
            <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Button>
      </a>
    </div>
  );
};

export default HireTrainerButton;