import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPreferencesForm from '@/components/meal-plan/UserPreferencesForm';
import DietaryPreferencesForm from '@/components/meal-plan/DietaryPreferencesForm';
import MealPlanDisplay from '@/components/meal-plan/MealPlanDisplay';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MealPlanGenerator = () => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserPreferences = async (values: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meal_plan_profiles')
        .upsert({
          user_id: user?.id,
          ...values,
        })
        .select();

      if (error) throw error;
      toast.success('User preferences saved successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDietaryPreferences = async (values: any) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('meal_plan_profiles')
        .update({
          dietary_preference: values.dietaryPreference,
          food_allergies: values.foodAllergies.split(',').map((item: string) => item.trim()),
          meal_frequency: values.mealFrequency,
        })
        .eq('user_id', user?.id)
        .select();

      if (error) throw error;
      toast.success('Dietary preferences saved successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meal Plan Generator</h1>
      
      <Tabs defaultValue="preferences" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="preferences">User Preferences</TabsTrigger>
          <TabsTrigger value="dietary">Dietary Preferences</TabsTrigger>
        </TabsList>
        
        <TabsContent value="preferences">
          <Card className="p-6">
            <UserPreferencesForm onSubmit={handleUserPreferences} />
          </Card>
        </TabsContent>
        
        <TabsContent value="dietary">
          <Card className="p-6">
            <DietaryPreferencesForm onSubmit={handleDietaryPreferences} />
          </Card>
        </TabsContent>
      </Tabs>

      {mealPlan && (
        <div className="mt-8">
          <MealPlanDisplay mealPlan={mealPlan} />
        </div>
      )}
    </div>
  );
};

export default MealPlanGenerator;