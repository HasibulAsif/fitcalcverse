import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const CalorieCalculator = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activity, setActivity] = useState('');
  const [calories, setCalories] = useState<number | null>(null);

  const calculateCalories = () => {
    if (!age || !gender || !weight || !height || !activity) {
      toast.error("Please fill in all fields");
      return;
    }

    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * parseFloat(weight)) + (4.799 * parseFloat(height)) - (5.677 * parseFloat(age));
    } else {
      bmr = 447.593 + (9.247 * parseFloat(weight)) + (3.098 * parseFloat(height)) - (4.330 * parseFloat(age));
    }

    const activityMultipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const dailyCalories = bmr * activityMultipliers[activity];
    setCalories(Math.round(dailyCalories));
    toast.success("Daily caloric needs calculated successfully!");
  };

  const calorieGuidelines = [
    {
      category: "Sedentary Adults",
      value: "1,600-2,000 calories (women) / 2,000-2,600 calories (men)",
      source: "U.S. Department of Health"
    },
    {
      category: "Moderately Active Adults",
      value: "1,800-2,200 calories (women) / 2,200-2,800 calories (men)",
      source: "U.S. Department of Health"
    },
    {
      category: "Active Adults",
      value: "2,000-2,400 calories (women) / 2,400-3,000 calories (men)",
      source: "U.S. Department of Health"
    },
    {
      category: "Weight Loss",
      value: "500-750 calories deficit from maintenance",
      source: "American College of Sports Medicine"
    },
    {
      category: "Weight Gain",
      value: "300-500 calories surplus from maintenance",
      source: "International Sports Sciences Association"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Calorie Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <Select onValueChange={setGender}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </div>

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
          <label className="block text-sm font-medium mb-1">Height (cm)</label>
          <Input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height in cm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Activity Level</label>
          <Select onValueChange={setActivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
              <SelectItem value="light">Light (exercise 1-3 times/week)</SelectItem>
              <SelectItem value="moderate">Moderate (exercise 4-5 times/week)</SelectItem>
              <SelectItem value="active">Active (daily exercise)</SelectItem>
              <SelectItem value="veryActive">Very Active (intense daily exercise)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateCalories}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Daily Calories
        </Button>
        
        {calories !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-center font-semibold">Daily Caloric Needs: {calories} calories</p>
            <p className="text-center text-sm mt-2">
              To lose weight: {calories - 500} calories<br />
              To gain weight: {calories + 500} calories
            </p>
          </div>
        )}
      </div>
      </Card>

      <GuidelinesTable 
        title="Daily Caloric Needs Guidelines"
        guidelines={calorieGuidelines}
      />
    </div>
  );
};

export default CalorieCalculator;
