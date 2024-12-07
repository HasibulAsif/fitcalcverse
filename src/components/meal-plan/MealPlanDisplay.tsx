import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

interface Meal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions?: string;
}

interface MealPlan {
  id: string;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

interface MealPlanDisplayProps {
  mealPlan: MealPlan;
}

const MealPlanDisplay = ({ mealPlan }: MealPlanDisplayProps) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Your Personalized Meal Plan', 20, 20);
    
    let yPos = 40;
    
    Object.entries(mealPlan.meals).forEach(([mealType, meals]) => {
      doc.setFontSize(16);
      doc.text(mealType.charAt(0).toUpperCase() + mealType.slice(1), 20, yPos);
      yPos += 10;
      
      meals.forEach(meal => {
        doc.setFontSize(12);
        doc.text(`${meal.name} (${meal.calories} kcal)`, 30, yPos);
        yPos += 10;
      });
      
      yPos += 10;
    });
    
    doc.save('meal-plan.pdf');
  };

  const shareMealPlan = async () => {
    try {
      await navigator.share({
        title: 'My Meal Plan',
        text: 'Check out my personalized meal plan!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Personalized Meal Plan</h2>
        <div className="space-x-2">
          <Button onClick={exportToPDF} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={shareMealPlan} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(mealPlan.meals).map(([mealType, meals]) => (
          <Card key={mealType} className="p-4">
            <h3 className="text-xl font-semibold mb-4 capitalize">{mealType}</h3>
            <div className="space-y-4">
              {meals.map(meal => (
                <div key={meal.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                  <h4 className="font-medium">{meal.name}</h4>
                  <p className="text-sm text-gray-500">
                    {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                  </p>
                  {meal.ingredients && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Ingredients:</p>
                      <ul className="text-sm list-disc list-inside">
                        {meal.ingredients.map((ingredient, idx) => (
                          <li key={idx}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {meal.instructions && (
                    <div className="mt-2">
                      <p className="text-sm font-medium">Instructions:</p>
                      <p className="text-sm">{meal.instructions}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <h3 className="text-xl font-semibold mb-4">Daily Nutrition Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-gray-500">Total Calories</p>
            <p className="text-lg font-medium">{mealPlan.totalCalories} kcal</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Protein</p>
            <p className="text-lg font-medium">{mealPlan.totalProtein}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="text-lg font-medium">{mealPlan.totalCarbs}g</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Fat</p>
            <p className="text-lg font-medium">{mealPlan.totalFat}g</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MealPlanDisplay;