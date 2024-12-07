import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface TooltipInfoProps {
  term: string;
  description: string;
}

const tooltipDescriptions: Record<string, string> = {
  BMR: "Basal Metabolic Rate - The number of calories your body burns at rest to maintain basic life functions.",
  TDEE: "Total Daily Energy Expenditure - The total number of calories you burn in a day, including activity.",
  "Body Fat": "The percentage of your total body mass that is fat.",
  Macronutrients: "The three main nutrients your body needs in large quantities: proteins, carbohydrates, and fats.",
};

export const TooltipInfo = ({ term, description }: TooltipInfoProps) => {
  const tooltipText = description || tooltipDescriptions[term] || "No description available";
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="inline-flex items-center gap-1">
          {term} <HelpCircle className="h-4 w-4 text-muted-foreground" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};