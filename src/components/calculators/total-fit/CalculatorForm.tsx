import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface CalculatorFormProps {
  formData: {
    age: string;
    weight: string;
    height: string;
    gender: string;
    activityLevel: string;
    fitnessGoal: string;
    timeframe: string;
    weightGoal: string;
  };
  useMetric: boolean;
  onInputChange: (field: string, value: string) => void;
  onCalculate: () => void;
}

export const CalculatorForm = ({ formData, useMetric, onInputChange, onCalculate }: CalculatorFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Age</Label>
          <Input
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => onInputChange('age', e.target.value)}
          />
        </div>

        <div>
          <Label>Gender</Label>
          <Select onValueChange={(value) => onInputChange('gender', value)}>
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
          <Label>Weight ({useMetric ? 'kg' : 'lbs'})</Label>
          <Input
            type="number"
            placeholder={`Enter weight in ${useMetric ? 'kg' : 'lbs'}`}
            value={formData.weight}
            onChange={(e) => onInputChange('weight', e.target.value)}
          />
        </div>

        <div>
          <Label>Height ({useMetric ? 'cm' : 'inches'})</Label>
          <Input
            type="number"
            placeholder={`Enter height in ${useMetric ? 'cm' : 'inches'}`}
            value={formData.height}
            onChange={(e) => onInputChange('height', e.target.value)}
          />
        </div>

        <div>
          <Label>Activity Level</Label>
          <Select onValueChange={(value) => onInputChange('activityLevel', value)}>
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
            onValueChange={(value) => onInputChange('fitnessGoal', value)}
            className="flex flex-wrap gap-4 mt-2"
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
              onChange={(e) => onInputChange('timeframe', e.target.value)}
            />
          </div>
          <div>
            <Label>Target Weight ({useMetric ? 'kg' : 'lbs'})</Label>
            <Input
              type="number"
              placeholder="Enter target weight"
              value={formData.weightGoal}
              onChange={(e) => onInputChange('weightGoal', e.target.value)}
            />
          </div>
        </div>
      )}

      <Button 
        onClick={onCalculate}
        className="w-full bg-primary hover:bg-primary/90"
      >
        Calculate Fitness Metrics
      </Button>
    </div>
  );
};