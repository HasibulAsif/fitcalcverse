import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPreferencesForm from '@/components/meal-plan/UserPreferencesForm';
import DietaryPreferencesForm from '@/components/meal-plan/DietaryPreferencesForm';
import MealPlanDisplay from '@/components/meal-plan/MealPlanDisplay';
import WeeklyMealPlan from '@/components/meal-plan/WeeklyMealPlan';
import MonthlyMealPlan from '@/components/meal-plan/MonthlyMealPlan';
import MealLogger from '@/components/meal-plan/MealLogger';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MealPlanGenerator = () => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [monthlyPlan, setMonthlyPlan] = useState(null);
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
      generateMealPlans(data[0]);
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
      generateMealPlans(data[0]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateMealPlans = async (profile: any) => {
    try {
      setLoading(true);
      
      // Generate daily plan
      const { data: dailyPlan, error: dailyError } = await supabase
        .functions.invoke('generate-meal-plan', {
          body: { profile, planType: 'daily' }
        });
      
      if (dailyError) throw dailyError;
      setMealPlan(dailyPlan);

      // Generate weekly plan
      const { data: weeklyPlan, error: weeklyError } = await supabase
        .functions.invoke('generate-meal-plan', {
          body: { profile, planType: 'weekly' }
        });
      
      if (weeklyError) throw weeklyError;
      setWeeklyPlan(weeklyPlan);

      // Generate monthly plan
      const { data: monthlyPlan, error: monthlyError } = await supabase
        .functions.invoke('generate-meal-plan', {
          body: { profile, planType: 'monthly' }
        });
      
      if (monthlyError) throw monthlyError;
      setMonthlyPlan(monthlyPlan);

    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMealLogged = () => {
    // Refresh the meal plans after logging a meal
    const { data: profile } = supabase
      .from('meal_plan_profiles')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (profile) {
      generateMealPlans(profile);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Meal Plan Generator</h1>
      
      <Tabs defaultValue="preferences" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="dietary">Dietary</TabsTrigger>
          <TabsTrigger value="daily">Daily Plan</TabsTrigger>
          <TabsTrigger value="weekly">Weekly Plan</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Plan</TabsTrigger>
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

        <TabsContent value="daily">
          <div className="space-y-6">
            <MealLogger onMealLogged={handleMealLogged} />
            {mealPlan && <MealPlanDisplay mealPlan={mealPlan} />}
          </div>
        </TabsContent>

        <TabsContent value="weekly">
          {weeklyPlan && <WeeklyMealPlan weeklyPlan={weeklyPlan} />}
        </TabsContent>

        <TabsContent value="monthly">
          {monthlyPlan && <MonthlyMealPlan monthlyPlan={monthlyPlan} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealPlanGenerator;