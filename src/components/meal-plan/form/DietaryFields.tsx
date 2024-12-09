import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const DietaryFields = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
    </div>
  );
};