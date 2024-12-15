import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { toast } from 'sonner';
import { Loader2, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { StepProgressBar } from './form/StepProgressBar';
import { FormStep } from './form/FormStep';
import { ProfileInfoStep } from './form/ProfileInfoStep';
import { ActivityGoalsStep } from './form/ActivityGoalsStep';
import { DietaryPreferencesStep } from './form/DietaryPreferencesStep';

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

const steps = ['Profile', 'Activity & Goals', 'Dietary'];

const MealPlanForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const { data: profile, error: profileError } = await supabase
        .from('meal_plan_profiles')
        .insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          ...values,
        })
        .select()
        .single();

      if (profileError) throw profileError;

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

      const { data: generatedPlan, error: generationError } = await supabase.functions
        .invoke('generate-meal-plan', {
          body: { profile, planType: 'daily' }
        });

      if (generationError) throw generationError;

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
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetForm = () => {
    form.reset();
    setCurrentStep(0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card className="p-6 glass-morphism">
          <StepProgressBar currentStep={currentStep} steps={steps} />
          
          <div className="mt-8">
            <FormStep isActive={currentStep === 0}>
              <ProfileInfoStep form={form} />
            </FormStep>

            <FormStep isActive={currentStep === 1}>
              <ActivityGoalsStep form={form} />
            </FormStep>

            <FormStep isActive={currentStep === 2}>
              <DietaryPreferencesStep form={form} />
            </FormStep>
          </div>

          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="w-[120px]"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              className="px-4"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>

            {currentStep === steps.length - 1 ? (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-[120px] bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Generate'
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={nextStep}
                className="w-[120px]"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </form>
    </Form>
  );
};

export default MealPlanForm;