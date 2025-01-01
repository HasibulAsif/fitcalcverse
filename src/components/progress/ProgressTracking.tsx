import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Share2, Trophy } from "lucide-react";

export const ProgressTracking = () => {
  const { user } = useAuth();

  const { data: progressData } = useQuery({
    queryKey: ['progress', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('progress_tracking')
        .select('*')
        .eq('user_id', user?.id)
        .order('tracking_date', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My Fitness Progress',
        text: 'Check out my fitness progress!',
        url: window.location.href,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Progress Tracking</h2>
          <Button onClick={handleShare} variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share Progress
          </Button>
        </div>

        <div className="h-[400px] mb-8">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tracking_date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="weight"
                stroke="#8884d8"
                name="Weight (kg)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="body_fat_percentage"
                stroke="#82ca9d"
                name="Body Fat %"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="muscle_mass"
                stroke="#ffc658"
                name="Muscle Mass (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {progressData?.slice(-1)[0] && (
            <>
              <Card className="p-4">
                <div className="text-sm text-gray-500">Current Weight</div>
                <div className="text-2xl font-bold">{progressData.slice(-1)[0].weight} kg</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-500">Body Fat %</div>
                <div className="text-2xl font-bold">{progressData.slice(-1)[0].body_fat_percentage}%</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-gray-500">Muscle Mass</div>
                <div className="text-2xl font-bold">{progressData.slice(-1)[0].muscle_mass} kg</div>
              </Card>
            </>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
          Goal Achievement
        </h3>
        <div className="space-y-4">
          {/* Add goal tracking UI here */}
          <div className="p-4 bg-green-100 rounded-lg">
            <div className="font-medium text-green-800">Weight Goal Progress</div>
            <div className="text-sm text-green-600">On track to reach target weight</div>
          </div>
        </div>
      </Card>
    </div>
  );
};