import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Activity, Dumbbell } from "lucide-react";
import { MacronutrientChart } from "./MacronutrientChart";
import { TooltipInfo } from "./TooltipInfo";
import { Card } from "@/components/ui/card";

interface ResultsDisplayProps {
  results: {
    bmi: number;
    bmiCategory: string;
    bmr: number;
    tdee: number;
    macros: {
      protein: number;
      carbs: number;
      fats: number;
    };
    waterIntake: number;
    sleepRecommendation: string;
    walkingGoal: string;
    workoutSuggestions: string[];
  };
}

export const ResultsDisplay = ({ results }: ResultsDisplayProps) => {
  return (
    <Tabs defaultValue="metrics" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="metrics" className="flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Metrics
        </TabsTrigger>
        <TabsTrigger value="nutrition" className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Nutrition
        </TabsTrigger>
        <TabsTrigger value="workout" className="flex items-center gap-2">
          <Dumbbell className="w-4 h-4" />
          Workout
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="metrics" className="space-y-4 animate-fade-in">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-sm border-primary/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-primary">
              <TooltipInfo 
                term="BMI" 
                description="Body Mass Index (BMI) is a measure of body fat based on height and weight."
              />
            </h3>
            <p className="text-2xl font-bold">{results.bmi.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">{results.bmiCategory}</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm border-accent/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-accent">
              <TooltipInfo 
                term="BMR"
                description="Basal Metabolic Rate (BMR) is the number of calories your body burns at rest."
              />
            </h3>
            <p className="text-2xl font-bold">{Math.round(results.bmr)}</p>
            <p className="text-sm text-muted-foreground">calories/day</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 backdrop-blur-sm border-secondary/20">
            <h3 className="font-semibold mb-2 flex items-center gap-2 text-secondary">
              <TooltipInfo 
                term="TDEE"
                description="Total Daily Energy Expenditure (TDEE) is the total number of calories you burn in a day."
              />
            </h3>
            <p className="text-2xl font-bold">{Math.round(results.tdee)}</p>
            <p className="text-sm text-muted-foreground">calories/day</p>
          </Card>
          <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-500/5 backdrop-blur-sm border-blue-500/20">
            <h3 className="font-semibold mb-2 text-blue-500">Water Intake</h3>
            <p className="text-2xl font-bold">{results.waterIntake.toFixed(1)}</p>
            <p className="text-sm text-muted-foreground">liters/day</p>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="nutrition" className="space-y-4 animate-fade-in">
        <Card className="p-6 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TooltipInfo 
              term="Macronutrients"
              description="Macronutrients are the three main categories of nutrients you eat the most and provide you with most of your energy."
            />
          </h3>
          <MacronutrientChart macros={results.macros} />
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 rounded-lg bg-[#22c55e]/10">
              <p className="text-sm text-[#22c55e]">Protein</p>
              <p className="text-xl font-bold">{Math.round(results.macros.protein)}g</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-[#3b82f6]/10">
              <p className="text-sm text-[#3b82f6]">Carbs</p>
              <p className="text-xl font-bold">{Math.round(results.macros.carbs)}g</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-[#ef4444]/10">
              <p className="text-sm text-[#ef4444]">Fats</p>
              <p className="text-xl font-bold">{Math.round(results.macros.fats)}g</p>
            </div>
          </div>
        </Card>
      </TabsContent>
      
      <TabsContent value="workout" className="space-y-4 animate-fade-in">
        <Card className="p-6 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4">Workout Recommendations</h3>
          <ul className="space-y-3">
            {results.workoutSuggestions.map((suggestion, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm">
                  {index + 1}
                </span>
                {suggestion}
              </li>
            ))}
          </ul>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-background to-muted/50 backdrop-blur-sm">
          <h3 className="font-semibold mb-4">Daily Activity Goals</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <p>Walking Goal: {results.walkingGoal}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <p>Sleep: {results.sleepRecommendation}</p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};