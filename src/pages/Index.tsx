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
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Welcome to FitCalcVerse
        </h1>
        <p className="text-gray-400 mt-2">
          Your comprehensive fitness calculation toolkit
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all">
          <h3 className="text-xl font-semibold text-white mb-2">Body Composition</h3>
          <p className="text-gray-400 text-sm">Calculate BMI, body fat percentage, and more</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all">
          <h3 className="text-xl font-semibold text-white mb-2">Energy & Metabolism</h3>
          <p className="text-gray-400 text-sm">Track calories, BMR, and daily energy needs</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-gray-600 transition-all">
          <h3 className="text-xl font-semibold text-white mb-2">Performance</h3>
          <p className="text-gray-400 text-sm">Monitor training volume and progress</p>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
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
  );
};

export default Index;