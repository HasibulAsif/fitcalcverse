import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  age: z.string().min(1, 'Age is required').transform(Number),
  weight: z.string().min(1, 'Weight is required').transform(Number),
  height: z.string().min(1, 'Height is required').transform(Number),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'maintenance']),
  dietaryPreference: z.enum(['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian']),
  foodAllergies: z.string().optional(),
  mealFrequency: z.string().min(1, 'Meal frequency is required').transform(Number),
});

const MealPlanForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: '',
      weight: '',
      height: '',
      gender: 'male',
      activityLevel: 'moderately_active',
      fitnessGoal: 'maintenance',
      dietaryPreference: 'non-vegetarian',
      foodAllergies: '',
      mealFrequency: '3',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from('meal_plan_profiles').insert({
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
      });

      if (error) throw error;
      
      toast.success('Meal plan preferences saved successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to save meal plan preferences');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your weight" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="height"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Height (cm)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your height" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Activity Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active (1-3 days/week)</SelectItem>
                  <SelectItem value="moderately_active">Moderately Active (3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (6-7 days/week)</SelectItem>
                  <SelectItem value="extremely_active">Extremely Active (2x per day)</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fitnessGoal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fitness Goal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fitness goal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="weight_loss">Weight Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dietaryPreference"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dietary Preference</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select dietary preference" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                  <SelectItem value="pescatarian">Pescatarian</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="foodAllergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Food Allergies (comma-separated)</FormLabel>
              <FormControl>
                <Input placeholder="e.g., peanuts, shellfish, dairy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mealFrequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Meals per Day</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select number of meals" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="3">3 meals</SelectItem>
                  <SelectItem value="4">4 meals</SelectItem>
                  <SelectItem value="5">5 meals</SelectItem>
                  <SelectItem value="6">6 meals</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Save Preferences</Button>
      </form>
    </Form>
  );
};

export default MealPlanForm;