import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { BasicInfoFields } from './form/BasicInfoFields';
import { PreferencesFields } from './form/PreferencesFields';
import { DietaryFields } from './form/DietaryFields';
import { Card } from '@/components/ui/card';

const formSchema = z.object({
  age: z.coerce.number().min(1, 'Age is required'),
  weight: z.coerce.number().min(1, 'Weight is required'),
  height: z.coerce.number().min(1, 'Height is required'),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'maintenance']),
  dietaryPreference: z.enum(['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian']),
  foodAllergies: z.string().optional(),
  mealFrequency: z.coerce.number().min(1, 'Meal frequency is required'),
});

type FormValues = z.infer<typeof formSchema>;

const MealPlanForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      weight: 0,
      height: 0,
      gender: 'male',
      activityLevel: 'moderately_active',
      fitnessGoal: 'maintenance',
      dietaryPreference: 'non-vegetarian',
      foodAllergies: '',
      mealFrequency: 3,
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      console.log('Submitting form values:', values);
      const { data: profile, error: profileError } = await supabase
        .from('meal_plan_profiles')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          age: values.age,
          weight: values.weight,
          height: values.height,
          gender: values.gender,
          activity_level: values.activityLevel,
          fitness_goal: values.fitnessGoal,
          dietary_preference: values.dietaryPreference,
          food_allergies: values.foodAllergies ? values.foodAllergies.split(',').map(item => item.trim()) : [],
          meal_frequency: values.mealFrequency,
        })
        .select()
        .single();

      if (profileError) throw profileError;
      console.log('Profile saved:', profile);

      // Create a new meal plan
      const { data: mealPlan, error: mealPlanError } = await supabase
        .from('meal_plans')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          name: `Meal Plan - ${new Date().toLocaleDateString()}`,
          description: `Generated meal plan based on ${values.fitnessGoal} goal`,
        })
        .select()
        .single();

      if (mealPlanError) throw mealPlanError;
      console.log('Meal plan created:', mealPlan);

      // Generate meal plan items using the Edge Function
      const { data: generatedPlan, error: generationError } = await supabase.functions
        .invoke('generate-meal-plan', {
          body: { profile, planType: 'daily' }
        });

      if (generationError) throw generationError;
      console.log('Generated meal plan:', generatedPlan);

      // Insert meal plan items
      if (generatedPlan && generatedPlan.meals) {
        const mealItems = Object.entries(generatedPlan.meals).flatMap(([mealType, foods]: [string, any[]], index) => 
          foods.map((food, foodIndex) => ({
            meal_plan_id: mealPlan.id,
            food_id: food.id,
            meal_type: mealType,
            serving_quantity: 1,
            order_in_meal: foodIndex,
          }))
        );

        const { error: itemsError } = await supabase
          .from('meal_plan_items')
          .insert(mealItems);

        if (itemsError) throw itemsError;
      }
      
      toast.success('Meal plan generated successfully!');
    } catch (error: any) {
      console.error('Error generating meal plan:', error);
      toast.error(error.message || 'Failed to generate meal plan');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <BasicInfoFields form={form} />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <PreferencesFields form={form} />
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Dietary Requirements</h3>
          <DietaryFields form={form} />
        </Card>

        <Button type="submit" className="w-full">
          Generate Meal Plan
        </Button>
      </form>
    </Form>
  );
};

export default MealPlanForm;