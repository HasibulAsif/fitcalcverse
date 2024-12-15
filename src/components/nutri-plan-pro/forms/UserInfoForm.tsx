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
import { User, Ruler, Weight, Heart } from 'lucide-react';

const formSchema = z.object({
  age: z.coerce.number().min(1, 'Age is required').max(120, 'Please enter a valid age'),
  weight: z.coerce.number().min(1, 'Weight is required'),
  height: z.coerce.number().min(1, 'Height is required'),
  gender: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extremely_active']),
});

export const UserInfoForm = ({ onSubmit }: { onSubmit: (values: any) => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: 0,
      weight: 0,
      height: 0,
      gender: 'male',
      activityLevel: 'moderately_active',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

        <Button type="submit" className="w-full">Save Profile</Button>
      </form>
    </Form>
  );
};