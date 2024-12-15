import React from 'react';
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from 'lucide-react';

export const WeeklyPlanView = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <Card className="p-6 glass-morphism">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-5 h-5" />
        <h2 className="text-2xl font-semibold">Weekly Meal Plan</h2>
      </div>
      
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-6">
          {days.map((day, index) => (
            <DayPlan key={index} day={day} />
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};

interface DayPlanProps {
  day: string;
}

const DayPlan = ({ day }: DayPlanProps) => {
  return (
    <div className="border border-gray-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">{day}</h3>
      <div className="space-y-4">
        <MealSummary
          meal="Breakfast"
          calories={610}
          protein={31}
          carbs={59}
          fat={27}
        />
        <MealSummary
          meal="Lunch"
          calories={370}
          protein={38.9}
          carbs={38}
          fat={6}
        />
        <MealSummary
          meal="Dinner"
          calories={638}
          protein={42.7}
          carbs={55}
          fat={24.4}
        />
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-700">
        <div className="flex justify-between text-sm font-semibold">
          <span>Daily Total</span>
          <div className="flex gap-4">
            <span>1,618 cal</span>
            <span>112.6g protein</span>
            <span>152g carbs</span>
            <span>57.4g fat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MealSummaryProps {
  meal: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

const MealSummary = ({ meal, calories, protein, carbs, fat }: MealSummaryProps) => {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-gray-400">{meal}</span>
      <div className="flex gap-4">
        <span>{calories} cal</span>
        <span>{protein}g protein</span>
        <span>{carbs}g carbs</span>
        <span>{fat}g fat</span>
      </div>
    </div>
  );
};