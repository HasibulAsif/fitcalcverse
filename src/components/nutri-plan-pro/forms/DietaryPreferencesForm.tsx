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
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Utensils, AlertCircle, Clock } from 'lucide-react';

const formSchema = z.object({
  dietaryPreference: z.enum(['vegetarian', 'vegan', 'non-vegetarian', 'pescatarian']),
  foodAllergies: z.string().optional(),
  mealFrequency: z.coerce.number().min(3).max(6),
  cuisinePreferences: z.array(z.string()).min(1, 'Select at least one cuisine preference'),
});

export const DietaryPreferencesForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryPreference: 'non-vegetarian',
      foodAllergies: '',
      mealFrequency: 3,
      cuisinePreferences: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="dietaryPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preference</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <Utensils className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select preference" />
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
            name="mealFrequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meals per Day</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} value={String(field.value)}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select meals" />
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

          <FormField
            control={form.control}
            name="foodAllergies"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Food Allergies</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="e.g., peanuts, dairy (comma separated)"
                      {...field}
                      className="pl-10"
                    />
                    <AlertCircle className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Save Preferences</Button>
      </form>
    </Form>
  );
};