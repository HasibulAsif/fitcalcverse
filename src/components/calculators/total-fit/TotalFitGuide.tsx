import React from 'react';
import CalculatorGuide from '../CalculatorGuide';

export const TotalFitGuide = () => {
  const guideContent = {
    title: "TotalFit Calculator Guide",
    description: "A comprehensive fitness calculator that provides personalized insights into your health metrics, including BMR, TDEE, macronutrient ratios, and more.",
    features: [
      "Calculate Basal Metabolic Rate (BMR)",
      "Determine Total Daily Energy Expenditure (TDEE)",
      "Get personalized macronutrient recommendations",
      "Calculate optimal water intake",
      "Receive workout suggestions based on your goals",
      "Track progress over time"
    ],
    howTo: [
      {
        title: "Basic Information",
        content: [
          "Enter your age, gender, weight, and height",
          "Select your activity level",
          "Choose your fitness goal",
          "Set your target timeframe"
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
      },
      {
        title: "Setting Goals",
        content: [
          "Choose between weight loss, maintenance, or muscle gain",
          "Set realistic timeframes for your goals",
          "Adjust based on progress and results"
        ]
      }
    ],
    interpretation: [
      {
        title: "BMR & TDEE",
        content: "Your BMR represents calories burned at rest, while TDEE includes activity. Use these as baselines for your nutrition plan."
      },
      {
        title: "Macronutrient Ratios",
        content: [
          "Protein: Essential for muscle maintenance and growth",
          "Carbohydrates: Primary energy source",
          "Fats: Important for hormone production"
        ]
      },
      {
        title: "Workout Suggestions",
        content: "Follow the recommended workout plan based on your goals, adjusting intensity and volume as needed."
      }
    ]
  };

  return <CalculatorGuide {...guideContent} />;
};