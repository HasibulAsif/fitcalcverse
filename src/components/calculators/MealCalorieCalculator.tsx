import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const MealCalorieCalculator = () => {
  const [totalCalories, setTotalCalories] = useState('');
  const [mealCount, setMealCount] = useState('');
  const [mealDistribution, setMealDistribution] = useState<{ meal: string; calories: number }[] | null>(null);

  const calculateMealCalories = () => {
    if (!totalCalories || !mealCount) {
      toast.error("Please fill in all fields");
      return;
    }

    const total = parseFloat(totalCalories);
    const meals = parseInt(mealCount);
    
    let distribution: { meal: string; calories: number }[] = [];
    
    switch(meals) {
      case 3:
        distribution = [
          { meal: "Breakfast", calories: Math.round(total * 0.3) },
          { meal: "Lunch", calories: Math.round(total * 0.4) },
          { meal: "Dinner", calories: Math.round(total * 0.3) }
        ];
        break;
      case 4:
        distribution = [
          { meal: "Breakfast", calories: Math.round(total * 0.25) },
          { meal: "Lunch", calories: Math.round(total * 0.35) },
          { meal: "Snack", calories: Math.round(total * 0.15) },
          { meal: "Dinner", calories: Math.round(total * 0.25) }
        ];
        break;
      case 5:
        distribution = [
          { meal: "Breakfast", calories: Math.round(total * 0.25) },
          { meal: "Morning Snack", calories: Math.round(total * 0.1) },
          { meal: "Lunch", calories: Math.round(total * 0.3) },
          { meal: "Afternoon Snack", calories: Math.round(total * 0.1) },
          { meal: "Dinner", calories: Math.round(total * 0.25) }
        ];
        break;
      default:
        distribution = Array(meals).fill(0).map((_, i) => ({
          meal: `Meal ${i + 1}`,
          calories: Math.round(total / meals)
        }));
    }
    
    setMealDistribution(distribution);
    toast.success("Meal calories calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Meal Calorie Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Total Daily Calories</label>
          <Input
            type="number"
            value={totalCalories}
            onChange={(e) => setTotalCalories(e.target.value)}
            placeholder="Enter total daily calories"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Number of Meals</label>
          <Select onValueChange={setMealCount}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of meals" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3 Meals</SelectItem>
              <SelectItem value="4">4 Meals</SelectItem>
              <SelectItem value="5">5 Meals</SelectItem>
              <SelectItem value="6">6 Meals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateMealCalories}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Meal Distribution
        </Button>
        
        {mealDistribution && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {mealDistribution.map((meal, index) => (
              <div 
                key={index}
                className="p-4 bg-secondary rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <h3 className="font-semibold text-center">{meal.meal}</h3>
                <p className="text-2xl font-bold text-center mt-1">{meal.calories} calories</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default MealCalorieCalculator;