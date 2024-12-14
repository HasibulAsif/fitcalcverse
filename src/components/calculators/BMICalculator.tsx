import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import GuidelinesTable from './GuidelinesTable';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiHistory, setBmiHistory] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBMIHistory();
    }
  }, [user]);

  const fetchBMIHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('bmi_records')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setBmiHistory(data || []);
    } catch (error) {
      console.error('Error fetching BMI history:', error);
      toast.error("Failed to load BMI history");
    }
  };

  const calculateBMI = async () => {
    if (!height || !weight) {
      toast.error("Please enter both height and weight");
      return;
    }

    if (!user) {
      toast.error("Please log in to save your BMI records");
      return;
    }

    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    const roundedBMI = parseFloat(calculatedBMI.toFixed(1));
    
    setBmi(roundedBMI);

    try {
      const { error } = await supabase
        .from('bmi_records')
        .insert({
          user_id: user.id,
          height: parseFloat(height),
          weight: weightInKg,
          bmi: roundedBMI,
          category: getBMICategory(roundedBMI)
        });

      if (error) throw error;
      
      toast.success("BMI calculated and saved successfully!");
      fetchBMIHistory();
    } catch (error) {
      console.error('Error saving BMI record:', error);
      toast.error("Failed to save BMI record");
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal weight";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  const bmiGuidelines = [
    {
      category: "Underweight",
      value: "< 18.5",
      source: "World Health Organization (WHO)"
    },
    {
      category: "Normal Weight",
      value: "18.5 - 24.9",
      source: "World Health Organization (WHO)"
    },
    {
      category: "Overweight",
      value: "25.0 - 29.9",
      source: "World Health Organization (WHO)"
    },
    {
      category: "Obesity Class I",
      value: "30.0 - 34.9",
      source: "World Health Organization (WHO)"
    },
    {
      category: "Obesity Class II",
      value: "35.0 - 39.9",
      source: "World Health Organization (WHO)"
    },
    {
      category: "Obesity Class III",
      value: "≥ 40.0",
      source: "World Health Organization (WHO)"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-6 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">BMI Calculator</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <Input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter height in cm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
            />
          </div>
          <Button 
            onClick={calculateBMI}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Calculate BMI
          </Button>
          
          {bmi !== null && (
            <div className="mt-4 p-4 bg-secondary rounded-lg">
              <p className="text-center font-semibold">Your BMI: {bmi}</p>
              <p className="text-center text-sm mt-1">Category: {getBMICategory(bmi)}</p>
            </div>
          )}

          {user && bmiHistory.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Recent BMI History</h3>
              <ScrollArea className="h-[200px] rounded-md border p-4">
                <div className="space-y-4">
                  {bmiHistory.map((record) => (
                    <div 
                      key={record.id} 
                      className="p-3 bg-secondary/50 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">BMI: {record.bmi}</p>
                          <p className="text-sm text-muted-foreground">
                            Height: {record.height}cm, Weight: {record.weight}kg
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(record.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm mt-1 text-primary">{record.category}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </Card>

      <GuidelinesTable 
        title="BMI Classification Guidelines"
        guidelines={bmiGuidelines}
      />
    </div>
  );
};

export default BMICalculator;