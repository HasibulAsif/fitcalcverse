import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Flame,
  Heart,
  Trophy,
  TrendingUp,
  Target
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const DashboardStats = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['mealPlanProfile'],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('meal_plan_profiles')
        .select('*')
        .single();
      return profile;
    }
  });

  const { data: credits } = useQuery({
    queryKey: ['userCredits'],
    queryFn: async () => {
      if (!user?.id) throw new Error('No user ID');

      // First try to get existing credits
      const { data: existingCredits, error } = await supabase
        .from('user_credits')
        .select('credits_remaining')
        .eq('user_id', user.id)
        .maybeSingle(); // Use maybeSingle() instead of single()

      // If no credits exist or there's a PGRST116 error, create a new record
      if (!existingCredits || (error && error.code === 'PGRST116')) {
        const { data: newCredits, error: insertError } = await supabase
          .from('user_credits')
          .insert([
            { user_id: user.id, credits_remaining: 10 }
          ])
          .select('credits_remaining')
          .single();

        if (insertError) throw insertError;
        return newCredits;
      }

      if (error && error.code !== 'PGRST116') throw error;
      return existingCredits;
    },
    enabled: !!user?.id
  });

  const stats = [
    {
      title: 'Workout Streak',
      value: '7 days',
      icon: <Trophy className="w-5 h-5 text-yellow-500" />,
      change: '+2 from last week'
    },
    {
      title: 'Calories Burned',
      value: '12,234 kcal',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      change: '↑ 8% this month'
    },
    {
      title: 'Active Minutes',
      value: '380 mins',
      icon: <Activity className="w-5 h-5 text-green-500" />,
      change: 'Last 7 days'
    },
    {
      title: 'Credits',
      value: `${credits?.credits_remaining || 0}`,
      icon: <Target className="w-5 h-5 text-primary" />,
      change: 'Available credits'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 rounded-lg bg-white/5">
              {stat.icon}
            </div>
            <span className="text-xs text-gray-400">{stat.change}</span>
          </div>
          <h3 className="text-lg font-semibold">{stat.title}</h3>
          <p className="text-2xl font-bold mt-2">{stat.value}</p>
        </Card>
      ))}
    </div>
  );
};