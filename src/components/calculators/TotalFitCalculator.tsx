import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "sonner";
import { UnitToggle } from './total-fit/UnitToggle';
import { ResultsDisplay } from './total-fit/ResultsDisplay';
import { CalculatorForm } from './total-fit/CalculatorForm';

const TotalFitCalculator = () => {
  const [useMetric, setUseMetric] = useState(true);
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
  const [results, setResults] = useState<any>(null);

  const activityMultipliers = {
    sedentary: 1.2,
    lightlyActive: 1.375,
    moderatelyActive: 1.55,
    veryActive: 1.725,
    extremelyActive: 1.9
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const convertToMetric = (value: number, type: 'weight' | 'height'): number => {
    if (useMetric) return value;
    return type === 'weight' ? value * 0.453592 : value * 2.54;
  };

  const calculateResults = () => {
    if (!formData.age || !formData.weight || !formData.height || !formData.gender || !formData.activityLevel) {
      toast.error("Please fill in all required fields");
      return;
    }

    const weightKg = convertToMetric(parseFloat(formData.weight), 'weight');
    const heightCm = convertToMetric(parseFloat(formData.height), 'height');

    // Calculate BMI
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);

    // Determine BMI category
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Underweight';
    else if (bmi < 25) bmiCategory = 'Normal weight';
    else if (bmi < 30) bmiCategory = 'Overweight';
    else bmiCategory = 'Obese';

    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (formData.gender === 'male') {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(formData.age)) + 5;
    } else {
      bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * parseInt(formData.age)) - 161;
    }

    // Calculate TDEE
    const tdee = bmr * activityMultipliers[formData.activityLevel as keyof typeof activityMultipliers];

    // Calculate macros based on fitness goal
    let macros = { protein: 0, carbs: 0, fats: 0 };
    switch (formData.fitnessGoal) {
      case 'muscleGain':
        macros = {
          protein: weightKg * 2.2, // 2.2g per kg
          fats: weightKg * 0.8, // 0.8g per kg
          carbs: (tdee - ((weightKg * 2.2 * 4) + (weightKg * 0.8 * 9))) / 4 // Remaining calories from carbs
        };
        break;
      case 'weightLoss':
        macros = {
          protein: weightKg * 2, // 2g per kg
          fats: weightKg * 0.6, // 0.6g per kg
          carbs: (tdee * 0.8 - ((weightKg * 2 * 4) + (weightKg * 0.6 * 9))) / 4 // 20% deficit
        };
        break;
      default: // maintenance
        macros = {
          protein: weightKg * 1.8, // 1.8g per kg
          fats: weightKg * 0.7, // 0.7g per kg
          carbs: (tdee - ((weightKg * 1.8 * 4) + (weightKg * 0.7 * 9))) / 4
        };
    }

    // Calculate water intake (in liters)
    const waterIntake = weightKg * 0.033;

    // Generate workout suggestions
    const workoutSuggestions = generateWorkoutSuggestions(formData.fitnessGoal);

    setResults({
      bmi,
      bmiCategory,
      bmr,
      tdee,
      macros,
      waterIntake,
      sleepRecommendation: '7-9 hours per night',
      walkingGoal: '10,000 steps (approximately 8 kilometers)',
      workoutSuggestions
    });

    toast.success("Calculations completed!");
  };

  const generateWorkoutSuggestions = (goal: string): string[] => {
    switch (goal) {
      case 'muscleGain':
        return [
          'Progressive overload strength training 4-5 times per week',
          'Focus on compound exercises (squats, deadlifts, bench press)',
          'Rest 1-2 minutes between sets',
          'Aim for 8-12 reps per set'
        ];
      case 'weightLoss':
        return [
          'High-intensity interval training (HIIT) 3-4 times per week',
          'Strength training 2-3 times per week',
          'Cardio sessions 30-45 minutes',
          'Active recovery days with light walking'
        ];
      default:
        return [
          'Mixed cardio and strength training 3-4 times per week',
          'Bodyweight exercises',
          'Flexibility and mobility work',
          'Regular walking or light cardio'
        ];
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in p-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            <h2 className="text-2xl font-bold">TotalFit Calculator</h2>
          </div>
          <UnitToggle useMetric={useMetric} onToggle={setUseMetric} />
        </div>

        <CalculatorForm 
          formData={formData}
          useMetric={useMetric}
          onInputChange={handleInputChange}
          onCalculate={calculateResults}
        />
      </Card>

      <Card className="p-6">
        {results ? (
          <ResultsDisplay results={results} />
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            <p>Enter your details and calculate to see your fitness metrics</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TotalFitCalculator;
