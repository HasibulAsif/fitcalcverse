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
import { User, Ruler, Weight, Heart } from 'lucide-react';

export const ProfileInfoStep = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="age"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Age</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Enter your age"
                  type="number"
                  {...field}
                  className="pl-10"
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
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
                <SelectTrigger className="pl-10">
                  <Heart className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
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
        name="height"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Height (cm)</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  placeholder="Enter your height"
                  type="number"
                  {...field}
                  className="pl-10"
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
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
              <div className="relative">
                <Input
                  placeholder="Enter your weight"
                  type="number"
                  {...field}
                  className="pl-10"
                  onChange={e => field.onChange(e.target.valueAsNumber)}
                />
                <Weight className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};