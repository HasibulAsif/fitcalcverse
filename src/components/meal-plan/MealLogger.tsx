import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { PlusCircle } from 'lucide-react';

interface MealLoggerProps {
  onMealLogged: () => void;
}

const MealLogger: React.FC<MealLoggerProps> = ({ onMealLogged }) => {
  const { user } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState('');
  const [portions, setPortions] = useState('1');
  const [loading, setLoading] = useState(false);

  const handleLogMeal = async () => {
    if (!selectedMeal || !portions) {
      toast.error('Please select a meal and specify portions');
      return;
    }

    try {
      setLoading(true);
      const userData = await supabase.auth.getUser();
      
      if (!userData.data.user) {
        toast.error('Please log in to track meals');
        return;
      }

      // First create or get the user's current meal plan
      const { data: mealPlanData, error: mealPlanError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: userData.data.user.id,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6 glass-morphism">
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Log Your Meal</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Meal Type</label>
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

          <div className="space-y-2">
            <label className="text-sm font-medium">Portions</label>
            <Input
              type="number"
              min="0.25"
              step="0.25"
              value={portions}
              onChange={(e) => setPortions(e.target.value)}
              placeholder="Enter portions"
            />
          </div>

          <div className="flex items-end">
            <Button 
              onClick={handleLogMeal} 
              disabled={loading || !selectedMeal || !portions}
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Log Meal
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MealLogger;