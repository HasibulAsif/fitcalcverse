import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const GlycemicLoadCalculator = () => {
  const [foodItem, setFoodItem] = useState('');
  const [servingSize, setServingSize] = useState('');
  const [glycemicIndex, setGlycemicIndex] = useState('');
  const [glycemicLoad, setGlycemicLoad] = useState<number | null>(null);

  const calculateGlycemicLoad = () => {
    if (!foodItem || !servingSize || !glycemicIndex) {
      toast.error("Please fill in all fields");
      return;
    }

    const carbs = parseFloat(servingSize);
    const gi = parseFloat(glycemicIndex);
    const gl = (carbs * gi) / 100;
    
    setGlycemicLoad(parseFloat(gl.toFixed(1)));
    toast.success("Glycemic load calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Glycemic Load Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Food Item</label>
          <Input
            type="text"
            value={foodItem}
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="Enter food item name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Carbohydrates per Serving (g)</label>
          <Input
            type="number"
            value={servingSize}
            onChange={(e) => setServingSize(e.target.value)}
            placeholder="Enter carbohydrates in grams"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Glycemic Index</label>
          <Input
            type="number"
            value={glycemicIndex}
            onChange={(e) => setGlycemicIndex(e.target.value)}
            placeholder="Enter glycemic index (0-100)"
          />
        </div>

        <Button 
          onClick={calculateGlycemicLoad}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Glycemic Load
        </Button>
        
        {glycemicLoad !== null && (
          <div className="mt-4 p-4 bg-secondary rounded-lg animate-fade-in">
            <p className="text-center font-semibold">Glycemic Load: {glycemicLoad}</p>
            <p className="text-center text-sm mt-2">
              {glycemicLoad <= 10 ? "Low Glycemic Load" : 
               glycemicLoad <= 20 ? "Medium Glycemic Load" : 
               "High Glycemic Load"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GlycemicLoadCalculator;