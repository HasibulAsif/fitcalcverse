import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const activities = {
  walking: 3.8,
  running: 11.5,
  cycling: 7.5,
  swimming: 8.3,
  yoga: 2.5,
  weightLifting: 3.5,
};

const CaloriesBurnedCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState<number | null>(null);

  const calculateCaloriesBurned = () => {
    if (!weight || !activity || !duration) {
      toast.error("Please fill in all fields");
      return;
    }

    const MET = activities[activity as keyof typeof activities];
    const weightInKg = parseFloat(weight);
    const durationInHours = parseFloat(duration) / 60;
    
    const calories = MET * weightInKg * durationInHours;
    setCaloriesBurned(Math.round(calories));
    toast.success("Calories burned calculated successfully!");
  };

  const activityGuidelines = [
    {
      category: "Light Activity (Walking)",
      value: "2-5 METs, 100-200 calories/hour",
      source: "American Heart Association"
    },
    {
      category: "Moderate Activity (Cycling)",
      value: "5-8 METs, 250-400 calories/hour",
      source: "American Heart Association"
    },
    {
      category: "Vigorous Activity (Running)",
      value: "8+ METs, 400-600+ calories/hour",
      source: "American Heart Association"
    },
    {
      category: "Recommended Weekly Activity",
      value: "150 minutes moderate or 75 minutes vigorous",
      source: "World Health Organization"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Calories Burned Calculator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Activity</label>
            <Select onValueChange={setActivity}>
              <SelectTrigger>
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="walking">Walking</SelectItem>
                <SelectItem value="running">Running</SelectItem>
                <SelectItem value="cycling">Cycling</SelectItem>
                <SelectItem value="swimming">Swimming</SelectItem>
                <SelectItem value="yoga">Yoga</SelectItem>
                <SelectItem value="weightLifting">Weight Lifting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="Enter duration in minutes"
            />
          </div>

          <Button 
            onClick={calculateCaloriesBurned}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate Calories Burned
          </Button>
          
          {caloriesBurned !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-center font-semibold">Calories Burned: {caloriesBurned}</p>
            </div>
          )}
        </div>
      </Card>

      <GuidelinesTable 
        title="Physical Activity Guidelines"
        guidelines={activityGuidelines}
      />
    </div>
  );
};

export default CaloriesBurnedCalculator;
