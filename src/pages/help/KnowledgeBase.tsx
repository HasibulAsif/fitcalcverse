import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

const KnowledgeBase = () => {
  const articles = [
    {
      category: "Workouts",
      items: [
        {
          title: "Understanding Different Workout Types",
          description: "Learn about cardio, strength training, HIIT, and more."
        },
        {
          title: "Proper Exercise Form",
          description: "Guide to maintaining correct form during exercises."
        }
      ]
    },
    {
      category: "Nutrition",
      items: [
        {
          title: "Macro and Micronutrients",
          description: "Understanding the basics of nutrition and balanced diet."
        },
        {
          title: "Meal Planning Basics",
          description: "How to create effective meal plans for your goals."
        }
      ]
    },
    {
      category: "Progress Tracking",
      items: [
        {
          title: "Measuring Fitness Progress",
          description: "Different methods to track your fitness journey."
        },
        {
          title: "Understanding Fitness Metrics",
          description: "Guide to various fitness measurements and their importance."
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500">
            Knowledge Base
          </h1>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              className="pl-8 bg-gray-800/50 border-gray-700"
            />
          </div>
        </div>

        <div className="space-y-8">
          {articles.map((category, index) => (
            <Card key={index} className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="w-5 h-5 text-primary" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-2 border-primary pl-4">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;