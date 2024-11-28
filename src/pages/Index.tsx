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
    },
    {
      title: 'Weight Goal Calculator',
      description: 'Plan your weight loss or gain journey',
      path: '/weight-goal-calculator',
      icon: '⚡'
    },
    {
      title: 'Water Intake Calculator',
      description: 'Calculate your daily water needs',
      path: '/water-intake-calculator',
      icon: '💧'
    },
    {
      title: 'One Rep Max Calculator',
      description: 'Calculate your maximum lifting capacity',
      path: '/one-rep-max-calculator',
      icon: '🏋️'
    },
    {
      title: 'Heart Rate Zone Calculator',
      description: 'Find your optimal training zones',
      path: '/heart-rate-zone-calculator',
      icon: '❤️'
    },
    {
      title: 'Glycemic Load Calculator',
      description: 'Calculate the glycemic load of foods',
      path: '/glycemic-load-calculator',
      icon: '🍎'
    },
    {
      title: 'Meal Calorie Calculator',
      description: 'Distribute daily calories into meals',
      path: '/meal-calorie-calculator',
      icon: '🍽️'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Section */}
      <section className="mb-12">
        {/* Animated Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient h-48 mb-8">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative h-full flex items-center justify-center p-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-2">Welcome to FitCalcVerse</h1>
              <p className="text-white/90">Your personal fitness calculation companion</p>
            </div>
          </div>
        </div>

        {/* Workout Suggestion Card */}
        <Card 
          className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer p-6"
          onClick={() => navigate('/workout-suggestion')}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-50" />
          <div className="relative">
            <h3 className="text-2xl font-semibold mb-2">Personalized Workout Suggestions</h3>
            <p className="text-gray-200">Get customized workout plans based on your fitness goals</p>
          </div>
        </Card>
      </section>

      {/* Calculators Grid */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Fitness Calculators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <Card 
              key={calculator.path}
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer p-6"
              onClick={() => navigate(calculator.path)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-50" />
              <div className="relative">
                <div className="text-4xl mb-4">{calculator.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{calculator.title}</h3>
                <p className="text-gray-200 text-sm">{calculator.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;