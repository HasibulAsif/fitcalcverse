import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [oneRepMax, setOneRepMax] = useState<number | null>(null);

  const calculateOneRepMax = () => {
    if (!weight || !reps) {
      toast.error("Please fill in all fields");
      return;
    }

    // Brzycki Formula: 1RM = weight × (36 / (37 - reps))
    const weightLifted = parseFloat(weight);
    const repetitions = parseFloat(reps);
    const max = weightLifted * (36 / (37 - repetitions));
    
    setOneRepMax(Math.round(max));
    toast.success("One rep max calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">One Rep Max (1RM) Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weight Lifted (kg)</label>
          <Input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight lifted"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Repetitions</label>
          <Input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Enter number of reps"
          />
        </div>

        <Button 
          onClick={calculateOneRepMax}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate 1RM
        </Button>
        
        {oneRepMax !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg animate-fade-in">
            <p className="text-center font-semibold">Estimated One Rep Max:</p>
            <p className="text-center text-3xl font-bold mt-2">{oneRepMax} kg</p>
            <div className="mt-4 space-y-2 text-sm">
              <p className="text-center">Training Percentages:</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="text-center">95%: {Math.round(oneRepMax * 0.95)} kg</div>
                <div className="text-center">90%: {Math.round(oneRepMax * 0.90)} kg</div>
                <div className="text-center">85%: {Math.round(oneRepMax * 0.85)} kg</div>
                <div className="text-center">80%: {Math.round(oneRepMax * 0.80)} kg</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default OneRepMaxCalculator;