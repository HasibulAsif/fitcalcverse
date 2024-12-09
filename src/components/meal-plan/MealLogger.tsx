import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface MealLoggerProps {
  onMealLogged: () => void;
}

const MealLogger: React.FC<MealLoggerProps> = ({ onMealLogged }) => {
  const [selectedMeal, setSelectedMeal] = React.useState('');
  const [portions, setPortions] = React.useState('1');

  const handleLogMeal = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) {
        toast.error('Please log in to track meals');
        return;
      }

      // First create or get the user's current meal plan
      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: userData.user.id,
          name: `Daily Plan ${new Date().toLocaleDateString()}`,
        })
        .select()
        .single();

      if (mealPlanError) throw mealPlanError;

      // Then create the meal plan item
      const { error: mealItemError } = await supabase
        .from('meal_plan_items')
        .insert({
          meal_plan_id: mealPlanData.id,
          meal_type: selectedMeal,
          serving_quantity: parseFloat(portions),
          order_in_meal: 1, // Default to 1 for now
        });

      if (mealItemError) throw mealItemError;

      toast.success('Meal logged successfully!');
      onMealLogged();
      setSelectedMeal('');
      setPortions('1');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Log Your Meal</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Meal Type</label>
          <Select value={selectedMeal} onValueChange={setSelectedMeal}>
            <SelectTrigger>
              <SelectValue placeholder="Select meal type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="breakfast">Breakfast</SelectItem>
              <SelectItem value="lunch">Lunch</SelectItem>
              <SelectItem value="dinner">Dinner</SelectItem>
              <SelectItem value="snack">Snack</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Portions</label>
          <Input
            type="number"
            min="0.25"
            step="0.25"
            value={portions}
            onChange={(e) => setPortions(e.target.value)}
          />
        </div>

        <Button onClick={handleLogMeal} className="w-full">
          Log Meal
        </Button>
      </div>
    </Card>
  );
};

export default MealLogger;