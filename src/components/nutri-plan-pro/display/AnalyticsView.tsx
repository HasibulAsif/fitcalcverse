import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AnalyticsView = () => {
  const weeklyData = [
    { day: 'Mon', calories: 2100, protein: 150, carbs: 200, fat: 70 },
    { day: 'Tue', calories: 2050, protein: 155, carbs: 190, fat: 65 },
    { day: 'Wed', calories: 2200, protein: 160, carbs: 210, fat: 75 },
    { day: 'Thu', calories: 1950, protein: 145, carbs: 185, fat: 60 },
    { day: 'Fri', calories: 2150, protein: 158, carbs: 205, fat: 72 },
    { day: 'Sat', calories: 2300, protein: 165, carbs: 220, fat: 80 },
    { day: 'Sun', calories:  2000, protein: 148, carbs: 195, fat: 68 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 glass-morphism">
        <h2 className="text-2xl font-semibold mb-6">Nutrition Analytics</h2>
        
        <div className="space-y-8">
          <div className="h-[400px]">
            <h3 className="text-lg font-medium mb-4">Weekly Calorie Intake</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="h-[400px]">
            <h3 className="text-lg font-medium mb-4">Macronutrient Distribution</h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="protein" stroke="#82ca9d" />
                <Line type="monotone" dataKey="carbs" stroke="#ffc658" />
                <Line type="monotone" dataKey="fat" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};