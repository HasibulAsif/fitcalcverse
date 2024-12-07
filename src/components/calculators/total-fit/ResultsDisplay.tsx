import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, Activity, Dumbbell } from "lucide-react";
import { MacronutrientChart } from "./MacronutrientChart";
import { TooltipInfo } from "./TooltipInfo";

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
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="metrics">
          <Calculator className="w-4 h-4 mr-2" />
          Metrics
        </TabsTrigger>
        <TabsTrigger value="nutrition">
          <Activity className="w-4 h-4 mr-2" />
          Nutrition
        </TabsTrigger>
        <TabsTrigger value="workout">
          <Dumbbell className="w-4 h-4 mr-2" />
          Workout
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="metrics" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TooltipInfo term="BMI" />
            </h3>
            <p>{results.bmi.toFixed(1)} ({results.bmiCategory})</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TooltipInfo term="BMR" />
            </h3>
            <p>{Math.round(results.bmr)} calories/day</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <TooltipInfo term="TDEE" />
            </h3>
            <p>{Math.round(results.tdee)} calories/day</p>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Water Intake</h3>
            <p>{results.waterIntake.toFixed(1)} liters/day</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="nutrition" className="space-y-4">
        <div className="p-4 bg-secondary rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <TooltipInfo term="Macronutrients" />
          </h3>
          <MacronutrientChart macros={results.macros} />
          <ul className="space-y-2 mt-4">
            <li>Protein: {Math.round(results.macros.protein)}g</li>
            <li>Carbs: {Math.round(results.macros.carbs)}g</li>
            <li>Fats: {Math.round(results.macros.fats)}g</li>
          </ul>
        </div>
      </TabsContent>
      
      <TabsContent value="workout" className="space-y-4">
        <div className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Workout Recommendations</h3>
            <ul className="space-y-2">
              {results.workoutSuggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-2">Daily Activity Goals</h3>
            <p>Walking Goal: {results.walkingGoal}</p>
            <p>Sleep: {results.sleepRecommendation}</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
};