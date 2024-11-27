import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const WeightGoalCalculator = () => {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [timeFrame, setTimeFrame] = useState('');
  const [result, setResult] = useState<{ calories: number; weeks: number } | null>(null);

  const calculateWeightGoal = () => {
    if (!currentWeight || !goalWeight || !timeFrame) {
      toast.error("Please fill in all fields");
      return;
    }

    const weightDiff = parseFloat(goalWeight) - parseFloat(currentWeight);
    const weeks = parseFloat(timeFrame);
    
    // 1 pound of fat = 3500 calories
    // Safe weight loss/gain rate is 1-2 pounds per week
    const totalCalories = weightDiff * 3500;
    const dailyCalorieChange = Math.round((totalCalories / weeks) / 7);

    setResult({ calories: dailyCalorieChange, weeks });
    toast.success("Weight goal calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Weight Goal Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Current Weight (kg)</label>
          <Input
            type="number"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            placeholder="Enter current weight"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Goal Weight (kg)</label>
          <Input
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
            placeholder="Enter goal weight"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time Frame (weeks)</label>
          <Input
            type="number"
            value={timeFrame}
            onChange={(e) => setTimeFrame(e.target.value)}
            placeholder="Enter time frame in weeks"
          />
        </div>

        <Button 
          onClick={calculateWeightGoal}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Weight Goal
        </Button>
        
        {result && (
          <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2 animate-fade-in">
            <p className="text-center font-semibold">
              Daily Calorie {result.calories > 0 ? "Surplus" : "Deficit"}: {Math.abs(result.calories)} calories
            </p>
            <p className="text-center text-sm">
              To reach your goal in {result.weeks} weeks, you need to {result.calories > 0 ? "add" : "reduce"} your daily calorie intake by {Math.abs(result.calories)} calories.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WeightGoalCalculator;