import React from 'react';
import { Card } from "@/components/ui/card";
import MealPlanForm from '@/components/meal-plan/MealPlanForm';

const MealPlanGenerator = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meal Plan Generator</h1>
      <Card className="max-w-2xl mx-auto p-6">
        <MealPlanForm />
      </Card>
    </div>
  );
};

export default MealPlanGenerator;