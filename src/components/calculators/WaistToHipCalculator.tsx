import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';

const WaistToHipCalculator = () => {
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [gender, setGender] = useState('');
  const [ratio, setRatio] = useState<number | null>(null);
  const [riskLevel, setRiskLevel] = useState<string | null>(null);

  const calculateWHR = () => {
    if (!waist || !hip || !gender) {
      toast.error("Please fill in all fields");
      return;
    }

    const waistMeasure = parseFloat(waist);
    const hipMeasure = parseFloat(hip);
    
    if (hipMeasure === 0) {
      toast.error("Hip measurement cannot be zero");
      return;
    }

    const whr = waistMeasure / hipMeasure;
    setRatio(parseFloat(whr.toFixed(2)));

    // Determine health risk based on WHO guidelines
    if (gender === 'male') {
      if (whr < 0.9) setRiskLevel('Low');
      else if (whr <= 0.99) setRiskLevel('Moderate');
      else setRiskLevel('High');
    } else {
      if (whr < 0.8) setRiskLevel('Low');
      else if (whr <= 0.84) setRiskLevel('Moderate');
      else setRiskLevel('High');
    }

    toast.success("Waist-to-hip ratio calculated successfully!");
  };

  const whrGuidelines = [
    {
      category: "Men - Low Risk",
      value: "Below 0.90",
      source: "World Health Organization"
    },
    {
      category: "Men - High Risk",
      value: "Above 0.90",
      source: "World Health Organization"
    },
    {
      category: "Women - Low Risk",
      value: "Below 0.80",
      source: "World Health Organization"
    },
    {
      category: "Women - High Risk",
      value: "Above 0.85",
      source: "World Health Organization"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Waist-to-Hip Ratio Calculator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Waist Circumference (cm)</label>
            <Input
              type="number"
              value={waist}
              onChange={(e) => setWaist(e.target.value)}
              placeholder="Enter waist measurement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hip Circumference (cm)</label>
            <Input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              placeholder="Enter hip measurement"
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
            onClick={calculateWHR}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate WHR
          </Button>
          
          {ratio !== null && riskLevel !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
              <p className="text-center font-semibold">Waist-to-Hip Ratio: {ratio}</p>
              <p className="text-center">Risk Level: {riskLevel}</p>
            </div>
          )}
        </div>
      </Card>

      <GuidelinesTable 
        title="Waist-to-Hip Ratio Guidelines"
        guidelines={whrGuidelines}
      />
    </div>
  );
};

export default WaistToHipCalculator;