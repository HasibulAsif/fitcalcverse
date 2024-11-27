import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const WaterIntakeCalculator = () => {
  const [weight, setWeight] = useState('');
  const [activity, setActivity] = useState('');
  const [climate, setClimate] = useState('');
  const [waterIntake, setWaterIntake] = useState<number | null>(null);

  const calculateWaterIntake = () => {
    if (!weight || !activity || !climate) {
      toast.error("Please fill in all fields");
      return;
    }

    const baseIntake = parseFloat(weight) * 0.033; // Base: 33ml per kg of body weight
    
    // Activity level multiplier
    const activityMultiplier = {
      sedentary: 1,
      light: 1.2,
      moderate: 1.4,
      intense: 1.6,
    }[activity] || 1;

    // Climate multiplier
    const climateMultiplier = {
      cold: 0.9,
      moderate: 1,
      hot: 1.2,
    }[climate] || 1;

    const totalIntake = baseIntake * activityMultiplier * climateMultiplier;
    setWaterIntake(Math.round(totalIntake * 10) / 10);
    toast.success("Water intake calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Water Intake Calculator</h2>
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
          <label className="block text-sm font-medium mb-1">Activity Level</label>
          <Select onValueChange={setActivity}>
            <SelectTrigger>
              <SelectValue placeholder="Select activity level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedentary">Sedentary</SelectItem>
              <SelectItem value="light">Light Activity</SelectItem>
              <SelectItem value="moderate">Moderate Activity</SelectItem>
              <SelectItem value="intense">Intense Activity</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Climate</label>
          <Select onValueChange={setClimate}>
            <SelectTrigger>
              <SelectValue placeholder="Select climate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cold">Cold</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={calculateWaterIntake}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Water Intake
        </Button>
        
        {waterIntake !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg animate-fade-in">
            <p className="text-center font-semibold">Recommended Daily Water Intake:</p>
            <p className="text-center text-2xl font-bold mt-2">{waterIntake} Liters</p>
            <p className="text-center text-sm mt-2">
              ≈ {Math.round(waterIntake * 33.814)} fl oz<br />
              ≈ {Math.round(waterIntake * 4.227)} cups
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default WaterIntakeCalculator;