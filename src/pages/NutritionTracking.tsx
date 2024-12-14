import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Plus, ChevronRight } from "lucide-react";

const NutritionTracking = () => {
  const meals = [
    { type: 'Breakfast', calories: 450, protein: 20, carbs: 55, fat: 15 },
    { type: 'Lunch', calories: 650, protein: 35, carbs: 75, fat: 20 },
    { type: 'Dinner', calories: 550, protein: 30, carbs: 65, fat: 18 }
  ];

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Nutrition Tracking</h1>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Log Meal
        </Button>
      </div>

      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-500" />
                <h2 className="text-xl font-semibold">Today's Nutrition</h2>
              </div>
              <div className="text-sm text-gray-400">
                1650 / 2000 kcal
              </div>
            </div>

            <div className="space-y-4">
              {meals.map((meal, index) => (
                <div key={index} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{meal.type}</h3>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="grid grid-cols-4 gap-4 mt-2 text-sm text-gray-400">
                    <div>{meal.calories} kcal</div>
                    <div>P: {meal.protein}g</div>
                    <div>C: {meal.carbs}g</div>
                    <div>F: {meal.fat}g</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NutritionTracking;