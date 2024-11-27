import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const MacronutrientCalculator = () => {
  const [calories, setCalories] = useState('');
  const [goal, setGoal] = useState('');
  const [macros, setMacros] = useState<{ protein: number; carbs: number; fat: number } | null>(null);

  const calculateMacros = () => {
    if (!calories || !goal) {
      toast.error("Please fill in all fields");
      return;
    }

    const totalCalories = parseFloat(calories);
    let proteinRatio, carbsRatio, fatRatio;

    switch (goal) {
      case 'loseFat':
        proteinRatio = 0.4;
        carbsRatio = 0.3;
        fatRatio = 0.3;
        break;
      case 'gainMuscle':
        proteinRatio = 0.3;
        carbsRatio = 0.5;
        fatRatio = 0.2;
        break;
      case 'maintain':
        proteinRatio = 0.3;
        carbsRatio = 0.4;
        fatRatio = 0.3;
        break;
      default:
        return;
    }

    const protein = Math.round((totalCalories * proteinRatio) / 4);
    const carbs = Math.round((totalCalories * carbsRatio) / 4);
    const fat = Math.round((totalCalories * fatRatio) / 9);

    setMacros({ protein, carbs, fat });
    toast.success("Macronutrients calculated successfully!");
  };

  const macroGuidelines = [
    {
      category: "Protein RDA",
      value: "0.8g per kg of body weight",
      source: "Institute of Medicine"
    },
    {
      category: "Athletes Protein Needs",
      value: "1.2-2.0g per kg of body weight",
      source: "International Society of Sports Nutrition"
    },
    {
      category: "Carbohydrates",
      value: "45-65% of total calories",
      source: "Dietary Guidelines for Americans"
    },
    {
      category: "Fats",
      value: "20-35% of total calories",
      source: "Dietary Guidelines for Americans"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Macronutrient Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Daily Calories</label>
          <Input
            type="number"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            placeholder="Enter daily calorie goal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fitness Goal</label>
          <Select onValueChange={setGoal}>
            <SelectTrigger>
              <SelectValue placeholder="Select goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loseFat">Lose Fat</SelectItem>
              <SelectItem value="gainMuscle">Gain Muscle</SelectItem>
              <SelectItem value="maintain">Maintain Weight</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateMacros}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Macros
        </Button>
        
        {macros && (
          <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
            <p className="text-center font-semibold">Daily Macronutrients:</p>
            <p className="text-center">Protein: {macros.protein}g</p>
            <p className="text-center">Carbs: {macros.carbs}g</p>
            <p className="text-center">Fat: {macros.fat}g</p>
          </div>
        )}
      </div>
      </Card>

      <GuidelinesTable 
        title="Macronutrient Guidelines"
        guidelines={macroGuidelines}
      />
    </div>
  );
};

export default MacronutrientCalculator;
