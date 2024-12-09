import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { MacronutrientChart } from '../calculators/total-fit/MacronutrientChart';

interface WeeklyMealPlanProps {
  weeklyPlan: {
    days: Array<{
      date: string;
      meals: {
        breakfast: Array<{ name: string; servings: number; calories: number; protein: number; carbs: number; fat: number }>;
        lunch: Array<{ name: string; servings: number; calories: number; protein: number; carbs: number; fat: number }>;
        dinner: Array<{ name: string; servings: number; calories: number; protein: number; carbs: number; fat: number }>;
        snacks: Array<{ name: string; servings: number; calories: number; protein: number; carbs: number; fat: number }>;
      };
      totalCalories: number;
      totalProtein: number;
      totalCarbs: number;
      totalFat: number;
    }>;
    groceryList: {
      proteins: string[];
      vegetables: string[];
      carbs: string[];
      fats: string[];
    };
    weeklyTotals: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
  };
}

const WeeklyMealPlan: React.FC<WeeklyMealPlanProps> = ({ weeklyPlan }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Weekly Meal Plan', 20, 20);
    
    let yPos = 40;
    
    weeklyPlan.days.forEach((day, index) => {
      doc.setFontSize(16);
      doc.text(`Day ${index + 1}: ${day.date}`, 20, yPos);
      yPos += 10;
      
      Object.entries(day.meals).forEach(([mealType, meals]) => {
        doc.setFontSize(12);
        doc.text(`${mealType.charAt(0).toUpperCase() + mealType.slice(1)}:`, 30, yPos);
        yPos += 5;
        
        meals.forEach(meal => {
          doc.setFontSize(10);
          doc.text(`- ${meal.name} (${meal.calories} kcal)`, 40, yPos);
          yPos += 5;
        });
        
        yPos += 5;
      });
      
      yPos += 10;
    });
    
    doc.save('weekly-meal-plan.pdf');
  };

  const sharePlan = async () => {
    try {
      await navigator.share({
        title: 'My Weekly Meal Plan',
        text: 'Check out my personalized weekly meal plan!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weekly Meal Plan</h2>
        <div className="space-x-2">
          <Button onClick={exportToPDF} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button onClick={sharePlan} variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {weeklyPlan.days.map((day, index) => (
        <Card key={index} className="p-6">
          <h3 className="text-xl font-semibold mb-4">{day.date}</h3>
          
          {Object.entries(day.meals).map(([mealType, meals]) => (
            <div key={mealType} className="mb-4">
              <h4 className="font-medium capitalize mb-2">{mealType}</h4>
              <div className="space-y-2">
                {meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="pl-4">
                    <p>{meal.name}</p>
                    <p className="text-sm text-gray-500">
                      {meal.calories} kcal | P: {meal.protein}g | C: {meal.carbs}g | F: {meal.fat}g
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t">
            <h4 className="font-medium mb-2">Daily Totals</h4>
            <p className="text-sm">
              Calories: {day.totalCalories} kcal | 
              Protein: {day.totalProtein}g | 
              Carbs: {day.totalCarbs}g | 
              Fat: {day.totalFat}g
            </p>
          </div>
        </Card>
      ))}

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Weekly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Macronutrient Distribution</h4>
            <MacronutrientChart
              macros={{
                protein: weeklyPlan.weeklyTotals.protein / 7,
                carbs: weeklyPlan.weeklyTotals.carbs / 7,
                fats: weeklyPlan.weeklyTotals.fat / 7,
              }}
            />
          </div>
          <div>
            <h4 className="font-medium mb-2">Grocery List</h4>
            {Object.entries(weeklyPlan.groceryList).map(([category, items]) => (
              <div key={category} className="mb-4">
                <h5 className="font-medium capitalize">{category}</h5>
                <ul className="list-disc list-inside">
                  {items.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyMealPlan;