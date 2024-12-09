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
import { Loader2 } from 'lucide-react';

const MealPlanGenerator = () => {
  const { user } = useAuth();
  const [mealPlan, setMealPlan] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState(null);
  const [monthlyPlan, setMonthlyPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('preferences');

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
      if (data?.[0]) {
        generateMealPlans(data[0]);
        setActiveTab('daily'); // Automatically switch to daily plan view
      }
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
      if (data?.[0]) {
        generateMealPlans(data[0]);
        setActiveTab('daily'); // Automatically switch to daily plan view
      }
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

  const handleMealLogged = async () => {
    try {
      const { data: profile, error } = await supabase
        .from('meal_plan_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        toast.error('Error refreshing meal plans');
        return;
      }

      if (profile) {
        generateMealPlans(profile);
      }
    } catch (error: any) {
      toast.error('Error refreshing meal plans');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Your Personal Meal Plan
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2">
            <TabsTrigger value="preferences" className="text-sm">Profile</TabsTrigger>
            <TabsTrigger value="dietary" className="text-sm">Dietary</TabsTrigger>
            <TabsTrigger value="daily" className="text-sm">Daily Plan</TabsTrigger>
            <TabsTrigger value="weekly" className="text-sm">Weekly Plan</TabsTrigger>
            <TabsTrigger value="monthly" className="text-sm">Monthly Plan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences">
            <Card className="p-6 glass-morphism">
              <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>
              <UserPreferencesForm onSubmit={handleUserPreferences} />
            </Card>
          </TabsContent>
          
          <TabsContent value="dietary">
            <Card className="p-6 glass-morphism">
              <h2 className="text-2xl font-semibold mb-6">Dietary Preferences</h2>
              <DietaryPreferencesForm onSubmit={handleDietaryPreferences} />
            </Card>
          </TabsContent>

          <TabsContent value="daily">
            <div className="space-y-6">
              <MealLogger onMealLogged={handleMealLogged} />
              {loading ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : mealPlan ? (
                <MealPlanDisplay mealPlan={mealPlan} />
              ) : (
                <Card className="p-6 text-center glass-morphism">
                  <p>Please complete your profile and dietary preferences first.</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : weeklyPlan ? (
              <WeeklyMealPlan weeklyPlan={weeklyPlan} />
            ) : (
              <Card className="p-6 text-center glass-morphism">
                <p>Please complete your profile and dietary preferences first.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="monthly">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            ) : monthlyPlan ? (
              <MonthlyMealPlan monthlyPlan={monthlyPlan} />
            ) : (
              <Card className="p-6 text-center glass-morphism">
                <p>Please complete your profile and dietary preferences first.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MealPlanGenerator;