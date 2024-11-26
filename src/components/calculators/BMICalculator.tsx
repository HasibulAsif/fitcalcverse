import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = () => {
    if (!height || !weight) {
      toast.error("Please enter both height and weight");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    
    setBmi(parseFloat(calculatedBMI.toFixed(1)));
    toast.success("BMI calculated successfully!");
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>
      <div className="space-y-4">
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
          <label className="block text-sm font-medium mb-1">Weight (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight in kg"
          />
        </div>
        <Button 
          onClick={calculateBMI}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate BMI
        </Button>
        
        {bmi !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-center font-semibold">Your BMI: {bmi}</p>
            <p className="text-center text-sm mt-1">Category: {getBMICategory(bmi)}</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default BMICalculator;