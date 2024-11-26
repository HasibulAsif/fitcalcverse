import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BMICalculator from "@/components/calculators/BMICalculator";
import BodyFatCalculator from "@/components/calculators/BodyFatCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";

const Index = () => {
  const [activeCalculator, setActiveCalculator] = useState<string>("bmi");

  const calculators = {
    bmi: <BMICalculator />,
    bodyFat: <BodyFatCalculator />,
    calories: <CalorieCalculator />,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary">Fitness Calculator Hub</h1>
        <p className="text-center text-gray-600 mb-8">Your all-in-one fitness calculation toolkit</p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <Button
            onClick={() => setActiveCalculator("bmi")}
            variant={activeCalculator === "bmi" ? "default" : "outline"}
            className={activeCalculator === "bmi" ? "bg-primary" : ""}
          >
            BMI Calculator
          </Button>
          <Button
            onClick={() => setActiveCalculator("bodyFat")}
            variant={activeCalculator === "bodyFat" ? "default" : "outline"}
            className={activeCalculator === "bodyFat" ? "bg-primary" : ""}
          >
            Body Fat Calculator
          </Button>
          <Button
            onClick={() => setActiveCalculator("calories")}
            variant={activeCalculator === "calories" ? "default" : "outline"}
            className={activeCalculator === "calories" ? "bg-primary" : ""}
          >
            Calorie Calculator
          </Button>
        </div>

        <div className="transition-all duration-300 ease-in-out">
          {calculators[activeCalculator as keyof typeof calculators]}
        </div>
      </div>
    </div>
  );
};

export default Index;