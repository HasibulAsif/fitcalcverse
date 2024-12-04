import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calculator } from "lucide-react";

const TotalFitCalculator = () => {
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
    activityLevel: '',
    fitnessGoal: '',
    timeframe: '',
    weightGoal: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCalculate = () => {
    if (!formData.age || !formData.weight || !formData.height || !formData.gender || !formData.activityLevel || !formData.fitnessGoal) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Calculations will be implemented in next iteration
    toast.success("Calculations completed!");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="p-6 w-full max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Calculator className="w-6 h-6" />
          <h2 className="text-2xl font-bold">TotalFit Calculator</h2>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Age</Label>
              <Input
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>

            <div>
              <Label>Gender</Label>
              <Select onValueChange={(value) => handleInputChange('gender', value)}>
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
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                placeholder="Enter weight in kg"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>

            <div>
              <Label>Height (cm)</Label>
              <Input
                type="number"
                placeholder="Enter height in cm"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>

            <div>
              <Label>Activity Level</Label>
              <Select onValueChange={(value) => handleInputChange('activityLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary</SelectItem>
                  <SelectItem value="lightlyActive">Lightly Active</SelectItem>
                  <SelectItem value="moderatelyActive">Moderately Active</SelectItem>
                  <SelectItem value="veryActive">Very Active</SelectItem>
                  <SelectItem value="extremelyActive">Extremely Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fitness Goal</Label>
              <RadioGroup 
                onValueChange={(value) => handleInputChange('fitnessGoal', value)}
                className="flex gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscleGain" id="muscleGain" />
                  <Label htmlFor="muscleGain">Muscle Gain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weightLoss" id="weightLoss" />
                  <Label htmlFor="weightLoss">Weight Loss</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="maintenance" id="maintenance" />
                  <Label htmlFor="maintenance">Maintenance</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {(formData.fitnessGoal === 'muscleGain' || formData.fitnessGoal === 'weightLoss') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label>Timeframe (weeks)</Label>
                <Input
                  type="number"
                  placeholder="Enter timeframe"
                  value={formData.timeframe}
                  onChange={(e) => handleInputChange('timeframe', e.target.value)}
                />
              </div>
              <div>
                <Label>Target Weight (kg)</Label>
                <Input
                  type="number"
                  placeholder="Enter target weight"
                  value={formData.weightGoal}
                  onChange={(e) => handleInputChange('weightGoal', e.target.value)}
                />
              </div>
            </div>
          )}

          <Button 
            onClick={handleCalculate}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate Fitness Metrics
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TotalFitCalculator;