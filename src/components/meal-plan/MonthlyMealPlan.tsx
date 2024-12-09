import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import WeeklyMealPlan from './WeeklyMealPlan';

interface MonthlyMealPlanProps {
  monthlyPlan: {
    weeks: Array<{
      startDate: string;
      endDate: string;
      weeklyPlan: any; // Using the same type as WeeklyMealPlan props
    }>;
    monthlyTotals: {
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    };
    progressTracking: {
      weightGoal: number;
      currentWeight: number;
      calorieAdherence: number;
      macroBalance: {
        protein: number;
        carbs: number;
        fat: number;
      };
    };
  };
}

const MonthlyMealPlan: React.FC<MonthlyMealPlanProps> = ({ monthlyPlan }) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.text('Monthly Meal Plan', 20, 20);
    
    // Add monthly summary
    doc.setFontSize(16);
    doc.text('Monthly Summary', 20, 40);
    
    doc.setFontSize(12);
    doc.text(`Total Calories: ${monthlyPlan.monthlyTotals.calories}`, 30, 50);
    doc.text(`Progress towards weight goal: ${monthlyPlan.progressTracking.currentWeight} / ${monthlyPlan.progressTracking.weightGoal}`, 30, 60);
    
    doc.save('monthly-meal-plan.pdf');
  };

  const sharePlan = async () => {
    try {
      await navigator.share({
        title: 'My Monthly Meal Plan',
        text: 'Check out my personalized monthly meal plan!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Monthly Meal Plan</h2>
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

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Weight Progress</h4>
            <p>
              Goal: {monthlyPlan.progressTracking.weightGoal} lbs
              <br />
              Current: {monthlyPlan.progressTracking.currentWeight} lbs
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Nutrition Adherence</h4>
            <p>
              Calorie Adherence: {monthlyPlan.progressTracking.calorieAdherence}%
              <br />
              Macro Balance:
              <br />
              Protein: {monthlyPlan.progressTracking.macroBalance.protein}%
              <br />
              Carbs: {monthlyPlan.progressTracking.macroBalance.carbs}%
              <br />
              Fat: {monthlyPlan.progressTracking.macroBalance.fat}%
            </p>
          </div>
        </div>
      </Card>

      {monthlyPlan.weeks.map((week, index) => (
        <div key={index} className="space-y-4">
          <h3 className="text-xl font-semibold">
            Week {index + 1} ({week.startDate} - {week.endDate})
          </h3>
          <WeeklyMealPlan weeklyPlan={week.weeklyPlan} />
        </div>
      ))}

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Monthly Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">Total Nutrition</h4>
            <p>
              Calories: {monthlyPlan.monthlyTotals.calories} kcal
              <br />
              Protein: {monthlyPlan.monthlyTotals.protein}g
              <br />
              Carbs: {monthlyPlan.monthlyTotals.carbs}g
              <br />
              Fat: {monthlyPlan.monthlyTotals.fat}g
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Progress Feedback</h4>
            {monthlyPlan.progressTracking.macroBalance.protein >= 90 && (
              <p className="text-green-500">Great job meeting your protein goals!</p>
            )}
            {monthlyPlan.progressTracking.calorieAdherence >= 90 && (
              <p className="text-green-500">Excellent calorie adherence!</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MonthlyMealPlan;