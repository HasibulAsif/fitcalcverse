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
import { Target, Activity, Scale } from 'lucide-react';

const formSchema = z.object({
  fitnessGoal: z.enum(['weight_loss', 'muscle_gain', 'maintenance', 'general_health']),
  targetWeight: z.coerce.number().min(1, 'Target weight is required'),
  weeklyGoal: z.coerce.number().min(0.1).max(2),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
});

export const HealthGoalsForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoal: 'maintenance',
      targetWeight: 0,
      weeklyGoal: 0.5,
      activityLevel: 'moderately_active',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="fitnessGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fitness Goal</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="pl-10">
                      <Target className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select goal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="weight_loss">Weight Loss</SelectItem>
                    <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="general_health">General Health</SelectItem>
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
                    <SelectTrigger className="pl-10">
                      <Activity className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary</SelectItem>
                    <SelectItem value="lightly_active">Lightly Active</SelectItem>
                    <SelectItem value="moderately_active">Moderately Active</SelectItem>
                    <SelectItem value="very_active">Very Active</SelectItem>
                    <SelectItem value="extremely_active">Extremely Active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="targetWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Weight (kg)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter target weight"
                      type="number"
                      {...field}
                      className="pl-10"
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                    <Scale className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="weeklyGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weekly Goal (kg)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter weekly goal"
                      type="number"
                      step="0.1"
                      {...field}
                      className="pl-10"
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                    <Target className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">Save Goals</Button>
      </form>
    </Form>
  );
};