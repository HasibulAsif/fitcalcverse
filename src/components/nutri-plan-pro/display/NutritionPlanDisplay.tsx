import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Apple, Coffee, Sun } from 'lucide-react';

export const NutritionPlanDisplay = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6 glass-morphism">
        <h2 className="text-2xl font-semibold mb-4">Today's Nutrition Plan</h2>
        <ScrollArea className="h-[600px] pr-4">
          <div className="space-y-6">
            <MealSection
              title="Breakfast"
              icon={<Coffee className="w-5 h-5" />}
              time="7:00 AM"
              items={[
                { name: "Oatmeal with Berries", calories: 300, protein: 10, carbs: 45, fat: 8 },
                { name: "Greek Yogurt", calories: 150, protein: 15, carbs: 8, fat: 5 },
                { name: "Almonds", calories: 160, protein: 6, carbs: 6, fat: 14 }
              ]}
            />
            
            <MealSection
              title="Lunch"
              icon={<Sun className="w-5 h-5" />}
              time="12:30 PM"
              items={[
                { name: "Grilled Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
                { name: "Quinoa", calories: 120, protein: 4.4, carbs: 21, fat: 1.9 },
                { name: "Mixed Vegetables", calories: 85, protein: 3.5, carbs: 17, fat: 0.5 }
              ]}
            />
            
            <MealSection
              title="Dinner"
              icon={<Apple className="w-5 h-5" />}
              time="7:00 PM"
              items={[
                { name: "Salmon Fillet", calories: 367, protein: 34, carbs: 0, fat: 22 },
                { name: "Brown Rice", calories: 216, protein: 5, carbs: 44, fat: 1.8 },
                { name: "Steamed Broccoli", calories: 55, protein: 3.7, carbs: 11, fat: 0.6 }
              ]}
            />
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

interface MealItem {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

interface MealSectionProps {
  title: string;
  icon: React.ReactNode;
  time: string;
  items: MealItem[];
}

const MealSection = ({ title, icon, time, items }: MealSectionProps) => {
  const totalCalories = items.reduce((sum, item) => sum + item.calories, 0);
  const totalProtein = items.reduce((sum, item) => sum + item.protein, 0);
  const totalCarbs = items.reduce((sum, item) => sum + item.carbs, 0);
  const totalFat = items.reduce((sum, item) => sum + item.fat, 0);

  return (
    <div className="border border-gray-700 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <span className="text-sm text-gray-400">{time}</span>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between items-center text-sm">
            <span>{item.name}</span>
            <div className="flex gap-4">
              <span>{item.calories} cal</span>
              <span>{item.protein}g protein</span>
              <span>{item.carbs}g carbs</span>
              <span>{item.fat}g fat</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm font-semibold">
          <span>Total</span>
          <div className="flex gap-4">
            <span>{totalCalories} cal</span>
            <span>{totalProtein}g protein</span>
            <span>{totalCarbs}g carbs</span>
            <span>{totalFat}g fat</span>
          </div>
        </div>
      </div>
    </div>
  );
};