import React from 'react';
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      title: 'BMI Calculator',
      description: 'Calculate your Body Mass Index',
      path: '/bmi-calculator',
      icon: '⚖️'
    },
    {
      title: 'Body Fat Calculator',
      description: 'Estimate your body fat percentage',
      path: '/body-fat-calculator',
      icon: '📊'
    },
    {
      title: 'Calorie Calculator',
      description: 'Calculate your daily calorie needs',
      path: '/calorie-calculator',
      icon: '🍎'
    },
    {
      title: 'Calories Burned Calculator',
      description: 'Track calories burned during activities',
      path: '/calories-burned-calculator',
      icon: '🔥'
    },
    {
      title: 'Macronutrient Calculator',
      description: 'Plan your macro intake',
      path: '/macronutrient-calculator',
      icon: '🥗'
    },
    {
      title: 'Lean Body Mass Calculator',
      description: 'Calculate your lean body mass',
      path: '/lean-body-mass-calculator',
      icon: '💪'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-600">
          Welcome to FitCalcVerse
        </h1>
        <p className="text-gray-400 mt-2">Choose a calculator to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <Card 
            key={calculator.path}
            className="p-6 cursor-pointer hover:scale-105 transition-transform duration-300 bg-gray-800/50 border-gray-700 hover:border-pink-500"
            onClick={() => navigate(calculator.path)}
          >
            <div className="text-4xl mb-4">{calculator.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{calculator.title}</h3>
            <p className="text-gray-400 text-sm">{calculator.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Index;