import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Calculator } from "lucide-react";
import { toast } from "sonner";
import { UnitToggle } from './total-fit/UnitToggle';
import { ResultsDisplay } from './total-fit/ResultsDisplay';
import { CalculatorForm } from './total-fit/CalculatorForm';
import CalculatorGuide from './CalculatorGuide';

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

  const guideContent = {
    title: "TotalFit Calculator",
    description: "A comprehensive fitness calculator that provides personalized insights into your health metrics, including BMR, TDEE, macronutrient ratios, and more.",
    features: [
      "Calculate Basal Metabolic Rate (BMR)",
      "Determine Total Daily Energy Expenditure (TDEE)",
      "Get personalized macronutrient recommendations",
      "Calculate optimal water intake",
      "Receive workout suggestions based on your goals"
    ],
    howTo: [
      {
        title: "Enter Your Basic Information",
        content: [
          "Input your age, gender, weight, and height accurately",
          "Select your activity level from the dropdown menu",
          "Choose your fitness goal (muscle gain, weight loss, or maintenance)",
          "Set your target timeframe and weight goal if applicable"
        ]
      },
      {
        title: "Understanding Activity Levels",
        content: [
          "Sedentary: Little to no exercise",
          "Lightly Active: Light exercise 1-3 times/week",
          "Moderately Active: Moderate exercise 3-5 times/week",
          "Very Active: Heavy exercise 6-7 times/week",
          "Extremely Active: Very heavy exercise, physical job, training 2x/day"
        ]
      }
    ],
    interpretation: [
      {
        title: "BMR (Basal Metabolic Rate)",
        content: "Your BMR represents the calories your body burns at rest. This is the minimum energy needed to maintain basic life functions like breathing and circulation."
      },
      {
        title: "TDEE (Total Daily Energy Expenditure)",
        content: "TDEE shows your total daily calorie burn including activity. Use this number as a baseline for weight management goals."
      },
      {
        title: "Macronutrient Ratios",
        content: [
          "Protein: Essential for muscle maintenance and growth",
          "Carbohydrates: Primary energy source for your body",
          "Fats: Important for hormone production and nutrient absorption"
        ]
      }
    ]
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

      <CalculatorGuide {...guideContent} />
    </div>
  );
};

export default TotalFitCalculator;
