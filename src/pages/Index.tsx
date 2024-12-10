import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Activity,
  Dumbbell,
  Target,
  Flame,
  Heart,
  Scale,
  TrendingUp,
  Calendar,
  ChevronRight,
  BarChart3
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch user's meal plan profile
  const { data: profile } = useQuery({
    queryKey: ['mealPlanProfile', user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('meal_plan_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      return data;
    },
  });

  const quickActions = [
    {
      title: 'Total Fitness Score',
      path: '/total-fit-calculator',
      icon: <Target className="w-6 h-6 text-primary" />,
      description: 'Get your comprehensive fitness analysis'
    },
    {
      title: 'Track Calories',
      path: '/calorie-calculator',
      icon: <Flame className="w-6 h-6 text-orange-500" />,
      description: 'Monitor your daily calorie intake'
    },
    {
      title: 'Workout Plan',
      path: '/workout-suggestion',
      icon: <Dumbbell className="w-6 h-6 text-blue-500" />,
      description: 'Get personalized workout recommendations'
    },
    {
      title: 'Health Metrics',
      path: '/bmi-calculator',
      icon: <Heart className="w-6 h-6 text-red-500" />,
      description: 'Check your vital health indicators'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome back, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-white/90 mb-6">
                Track your fitness journey and achieve your goals with our comprehensive tools
              </p>
              <Button 
                onClick={() => navigate('/total-fit-calculator')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Calculate Your Fitness Score
              </Button>
            </div>
            <div className="hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-white/10 backdrop-blur-sm">
                  <Activity className="w-8 h-8 text-white mb-2" />
                  <h3 className="text-white font-semibold">Activity Level</h3>
                  <p className="text-white/80">{profile?.activity_level || 'Not set'}</p>
                </Card>
                <Card className="p-4 bg-white/10 backdrop-blur-sm">
                  <Target className="w-8 h-8 text-white mb-2" />
                  <h3 className="text-white font-semibold">Fitness Goal</h3>
                  <p className="text-white/80">{profile?.fitness_goal || 'Not set'}</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Card 
              key={action.path}
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer group"
              onClick={() => navigate(action.path)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <div className="mb-4">{action.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-200 text-sm mb-4">{action.description}</p>
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                  <span className="text-sm">Get Started</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <Tabs defaultValue="calculators" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calculators" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Calculators
          </TabsTrigger>
          <TabsTrigger value="progress" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Progress
          </TabsTrigger>
        </TabsList>

        <TabsContent value="calculators">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              key="/bmi-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/bmi-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">BMI Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate your Body Mass Index</p>
              </div>
            </Card>
            <Card 
              key="/body-fat-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/body-fat-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Body Fat Calculator</h3>
                <p className="text-gray-200 text-sm">Estimate your body fat percentage</p>
              </div>
            </Card>
            <Card 
              key="/calorie-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/calorie-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Calorie Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate your daily calorie needs</p>
              </div>
            </Card>
            <Card 
              key="/calories-burned-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/calories-burned-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Calories Burned Calculator</h3>
                <p className="text-gray-200 text-sm">Track calories burned during activities</p>
              </div>
            </Card>
            <Card 
              key="/macronutrient-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/macronutrient-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Macronutrient Calculator</h3>
                <p className="text-gray-200 text-sm">Plan your macro intake</p>
              </div>
            </Card>
            <Card 
              key="/lean-body-mass-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/lean-body-mass-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Lean Body Mass Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate your lean body mass</p>
              </div>
            </Card>
            <Card 
              key="/weight-goal-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/weight-goal-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Weight Goal Calculator</h3>
                <p className="text-gray-200 text-sm">Plan your weight loss or gain journey</p>
              </div>
            </Card>
            <Card 
              key="/water-intake-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/water-intake-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Water Intake Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate your daily water needs</p>
              </div>
            </Card>
            <Card 
              key="/one-rep-max-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/one-rep-max-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">One Rep Max Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate your maximum lifting capacity</p>
              </div>
            </Card>
            <Card 
              key="/heart-rate-zone-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/heart-rate-zone-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Heart Rate Zone Calculator</h3>
                <p className="text-gray-200 text-sm">Find your optimal training zones</p>
              </div>
            </Card>
            <Card 
              key="/glycemic-load-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/glycemic-load-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Glycemic Load Calculator</h3>
                <p className="text-gray-200 text-sm">Calculate the glycemic load of foods</p>
              </div>
            </Card>
            <Card 
              key="/meal-calorie-calculator"
              className="relative overflow-hidden backdrop-blur-xl bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
              onClick={() => navigate('/meal-calorie-calculator')}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
              <div className="relative p-6">
                <h3 className="text-xl font-semibold mb-2">Meal Calorie Calculator</h3>
                <p className="text-gray-200 text-sm">Distribute daily calories into meals</p>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Scale className="w-5 h-5" />
                Weight Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Current</span>
                    <span>{profile?.weight || '0'} kg</span>
                  </div>
                  <Progress value={33} />
                </div>
                <Button variant="outline" className="w-full">
                  Update Weight
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Workout Streak
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">7</div>
                <p className="text-sm text-gray-400">days in a row</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
