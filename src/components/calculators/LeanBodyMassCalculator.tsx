import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const LeanBodyMassCalculator = () => {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [leanMass, setLeanMass] = useState<number | null>(null);

  const calculateLeanMass = () => {
    if (!weight || !bodyFat) {
      toast.error("Please fill in all fields");
      return;
    }

    const totalWeight = parseFloat(weight);
    const bodyFatPercentage = parseFloat(bodyFat);
    
    const leanBodyMass = totalWeight * (1 - (bodyFatPercentage / 100));
    setLeanMass(parseFloat(leanBodyMass.toFixed(1)));
    toast.success("Lean body mass calculated successfully!");
  };

  const lbmGuidelines = [
    {
      category: "Average LBM (Men)",
      value: "75-85% of total body weight",
      source: "American Council on Exercise"
    },
    {
      category: "Average LBM (Women)",
      value: "65-75% of total body weight",
      source: "American Council on Exercise"
    },
    {
      category: "Athletes LBM (Men)",
      value: "80-90% of total body weight",
      source: "International Journal of Sport Nutrition"
    },
    {
      category: "Athletes LBM (Women)",
      value: "70-80% of total body weight",
      source: "International Journal of Sport Nutrition"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Lean Body Mass Calculator</h2>
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
          <label className="block text-sm font-medium mb-1">Body Fat Percentage (%)</label>
          <Input
            type="number"
            value={bodyFat}
            onChange={(e) => setBodyFat(e.target.value)}
            placeholder="Enter body fat percentage"
          />
        </div>

        <Button 
          onClick={calculateLeanMass}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Lean Mass
        </Button>
        
        {leanMass !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg">
            <p className="text-center font-semibold">Lean Body Mass: {leanMass} kg</p>
          </div>
        )}
      </div>
      </Card>

      <GuidelinesTable 
        title="Lean Body Mass Guidelines"
        guidelines={lbmGuidelines}
      />
    </div>
  );
};

export default LeanBodyMassCalculator;
