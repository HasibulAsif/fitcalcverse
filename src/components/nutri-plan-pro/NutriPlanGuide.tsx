import React from 'react';
import CalculatorGuide from '../calculators/CalculatorGuide';

export const NutriPlanGuide = () => {
  const guideContent = {
    title: "NutriPlanPro Guide",
    description: "Advanced nutrition planning and tracking system tailored to your personal goals and preferences.",
    features: [
      "Personalized meal planning",
      "Dietary preference customization",
      "Macro and micronutrient tracking",
      "Weekly and monthly plan generation",
      "Progress analytics and insights",
      "Recipe suggestions and alternatives"
    ],
    howTo: [
      {
        title: "Setting Up Your Profile",
        content: [
          "Enter your basic information (age, weight, height)",
          "Specify dietary preferences and restrictions",
          "Set your nutrition and fitness goals",
          "Choose your meal frequency"
        ]
      },
      {
        title: "Using Your Meal Plan",
        content: [
          "Review your daily meal suggestions",
          "Track your meals and progress",
          "Adjust portions as needed",
          "Log completed meals"
        ]
      },
      {
        title: "Analyzing Progress",
        content: [
          "Review weekly and monthly trends",
          "Check adherence to nutrition goals",
          "Track body composition changes",
          "Adjust plans based on results"
        ]
      }
    ],
    interpretation: [
      {
        title: "Understanding Your Plan",
        content: "Your meal plan is designed to meet your caloric needs while respecting your dietary preferences and restrictions."
      },
      {
        title: "Progress Metrics",
        content: [
          "Weight trends indicate progress toward goals",
          "Nutrient balance shows diet quality",
          "Adherence rate helps optimize the plan"
        ]
      },
      {
        title: "Making Adjustments",
        content: "Plans can be adjusted based on progress, preferences, and lifestyle changes to ensure sustainable results."
      }
    ]
  };

  return <CalculatorGuide {...guideContent} />;
};