import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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

const dietaryPreferencesSchema = z.object({
  dietaryPreference: z.enum(['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian']),
  foodAllergies: z.string().optional(),
  mealFrequency: z.coerce.number().min(1, 'Meal frequency is required'),
});

type DietaryPreferencesFormValues = z.infer<typeof dietaryPreferencesSchema>;

interface DietaryPreferencesFormProps {
  onSubmit: (values: DietaryPreferencesFormValues) => void;
}

const DietaryPreferencesForm = ({ onSubmit }: DietaryPreferencesFormProps) => {
  const form = useForm<DietaryPreferencesFormValues>({
    resolver: zodResolver(dietaryPreferencesSchema),
    defaultValues: {
      dietaryPreference: 'non-vegetarian',
      foodAllergies: '',
      mealFrequency: 3,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
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

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90">
          Save Preferences
        </button>
      </form>
    </Form>
  );
};

export default DietaryPreferencesForm;