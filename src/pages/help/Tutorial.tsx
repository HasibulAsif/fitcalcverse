import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star, Target, Dumbbell } from 'lucide-react';

const Tutorial = () => {
  const tutorials = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Healthy Thako",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      steps: [
        "Create your account and complete your profile",
        "Set your fitness goals and preferences",
        "Explore workout plans and nutrition guides",
        "Track your progress regularly"
      ]
    },
    {
      title: "Setting Goals",
      description: "How to set and track your fitness goals",
      icon: <Target className="w-6 h-6 text-primary" />,
      steps: [
        "Define your primary fitness objective",
        "Set realistic timelines",
        "Choose appropriate workout plans",
        "Monitor your progress"
      ]
    },
    {
      title: "Workout Basics",
      description: "Understanding workout fundamentals",
      icon: <Dumbbell className="w-6 h-6 text-primary" />,
      steps: [
        "Learn proper form and technique",
        "Understand workout intensity levels",
        "Follow recommended rest periods",
        "Track your performance"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
          Getting Started with Healthy Thako
        </h1>
        
        <div className="space-y-6">
          {tutorials.map((tutorial, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  {tutorial.icon}
                  {tutorial.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{tutorial.description}</p>
                <ol className="list-decimal list-inside space-y-2">
                  {tutorial.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="text-gray-300">{step}</li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;