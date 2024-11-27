import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

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

  const weightGoalGuidelines = [
    {
      category: "Safe Weight Loss Rate",
      value: "0.5-1 kg per week",
      source: "Centers for Disease Control and Prevention"
    },
    {
      category: "Safe Weight Gain Rate",
      value: "0.25-0.5 kg per week",
      source: "American College of Sports Medicine"
    },
    {
      category: "Caloric Deficit for Loss",
      value: "500-750 calories/day",
      source: "National Institutes of Health"
    },
    {
      category: "Caloric Surplus for Gain",
      value: "300-500 calories/day",
      source: "International Sports Sciences Association"
    }
  ];

  return (
    <div className="space-y-8">
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

      <GuidelinesTable 
        title="Weight Management Guidelines"
        guidelines={weightGoalGuidelines}
      />
    </div>
  );
};

export default WeightGoalCalculator;
