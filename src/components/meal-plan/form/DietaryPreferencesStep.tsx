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
import { Utensils, AlertCircle } from 'lucide-react';

export const DietaryPreferencesStep = ({ form }: { form: any }) => {
  return (
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
        name="foodAllergies"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Food Allergies</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="e.g., peanuts, dairy"
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
  );
};