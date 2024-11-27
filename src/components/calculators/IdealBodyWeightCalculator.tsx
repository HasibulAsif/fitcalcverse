import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const IdealBodyWeightCalculator = () => {
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateIdealWeight = () => {
    if (!height || !gender) {
      toast.error("Please fill in all fields");
      return;
    }

    const heightInCm = parseFloat(height);
    let idealWeight;

    // Robinson formula (1983)
    if (gender === 'male') {
      idealWeight = 52 + (1.9 * ((heightInCm - 152.4) / 2.54));
    } else {
      idealWeight = 49 + (1.7 * ((heightInCm - 152.4) / 2.54));
    }

    setResult(parseFloat(idealWeight.toFixed(1)));
    toast.success("Ideal body weight calculated successfully!");
  };

  const ibwGuidelines = [
    {
      category: "Height Consideration",
      value: "Based on height and gender",
      source: "Robinson Formula (1983)"
    },
    {
      category: "Healthy Range",
      value: "±10% of calculated IBW",
      source: "Clinical Guidelines"
    },
    {
      category: "Frame Size",
      value: "May vary by body frame",
      source: "Metropolitan Life Tables"
    },
    {
      category: "Application",
      value: "Medical dosing reference",
      source: "Clinical Practice"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Ideal Body Weight Calculator</h2>
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

          <Button 
            onClick={calculateIdealWeight}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate Ideal Weight
          </Button>
          
          {result !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-center font-semibold">Ideal Body Weight: {result} kg</p>
            </div>
          )}
        </div>
      </Card>

      <GuidelinesTable 
        title="Ideal Body Weight Guidelines"
        guidelines={ibwGuidelines}
      />
    </div>
  );
};

export default IdealBodyWeightCalculator;