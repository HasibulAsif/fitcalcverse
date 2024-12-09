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
      const { error } = await supabase
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

      if (error) throw error;
      
      toast.success('Meal plan preferences saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save meal plan preferences');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <BasicInfoFields form={form} />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Preferences</h3>
          <PreferencesFields form={form} />
        </Card>

        <Card className="p-6">
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