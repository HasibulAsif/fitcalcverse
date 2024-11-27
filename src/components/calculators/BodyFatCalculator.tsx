import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const BodyFatCalculator = () => {
  const [gender, setGender] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [hip, setHip] = useState('');
  const [bodyFat, setBodyFat] = useState<number | null>(null);

  const calculateBodyFat = () => {
    if (!gender || !waist || !neck || !height) {
      toast.error("Please fill in all required fields");
      return;
    }

    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);
    
    let bodyFatPercentage: number;
    
    if (gender === 'male') {
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      const hipValue = parseFloat(hip || '0');
      if (!hip) {
        toast.error("Hip measurement required for females");
        return;
      }
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(w + hipValue - n) + 0.22100 * Math.log10(h)) - 450;
    }
    
    setBodyFat(parseFloat(bodyFatPercentage.toFixed(1)));
    toast.success("Body fat percentage calculated successfully!");
  };

  const bodyFatGuidelines = [
    {
      category: "Essential Fat (Men)",
      value: "2-5%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Essential Fat (Women)",
      value: "10-13%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Athletes (Men)",
      value: "6-13%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Athletes (Women)",
      value: "14-20%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Fitness (Men)",
      value: "14-17%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Fitness (Women)",
      value: "21-24%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Average (Men)",
      value: "18-24%",
      source: "American Council on Exercise (ACE)"
    },
    {
      category: "Average (Women)",
      value: "25-31%",
      source: "American Council on Exercise (ACE)"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Body Fat Calculator</h2>
        <div className="space-y-4">
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
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Neck (cm)</label>
            <Input
              type="number"
              value={neck}
              onChange={(e) => setNeck(e.target.value)}
              placeholder="Enter neck circumference"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Waist (cm)</label>
            <Input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Enter waist circumference"
            />
          </div>
          
          {gender === 'female' && (
            <div>
              <label className="block text-sm font-medium mb-1">Hip (cm)</label>
              <Input
                type="number"
                value={hip}
                onChange={(e) => setHip(e.target.value)}
                placeholder="Enter hip circumference"
              />
            </div>
          )}
          
          <Button 
            onClick={calculateBodyFat}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate Body Fat
          </Button>
          
          {bodyFat !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-center font-semibold">Body Fat: {bodyFat}%</p>
            </div>
          )}
        </div>
      </Card>

      <GuidelinesTable 
        title="Body Fat Percentage Guidelines"
        guidelines={bodyFatGuidelines}
      />
    </div>
  );
};

export default BodyFatCalculator;