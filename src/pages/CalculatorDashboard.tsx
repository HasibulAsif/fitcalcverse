import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Calculator,
  Scale,
  Heart,
  Activity,
  Dumbbell,
  Apple,
  Droplets
} from "lucide-react";

const CalculatorDashboard = () => {
  const navigate = useNavigate();

  const calculatorCategories = [
    {
      title: "Body Composition",
      description: "Calculate and track your body measurements",
      icon: <Scale className="w-6 h-6 text-primary" />,
      calculators: [
        { name: "BMI Calculator", path: "/bmi-calculator" },
        { name: "Body Fat Calculator", path: "/body-fat-calculator" },
        { name: "Lean Body Mass", path: "/lean-body-mass-calculator" },
        { name: "Ideal Body Weight", path: "/ideal-body-weight-calculator" },
        { name: "Waist-to-Hip Ratio", path: "/waist-to-hip-calculator" }
      ]
    },
    {
      title: "Energy & Metabolism",
      description: "Track your energy expenditure and needs",
      icon: <Activity className="w-6 h-6 text-blue-500" />,
      calculators: [
        { name: "Calorie Calculator", path: "/calorie-calculator" },
        { name: "Calories Burned", path: "/calories-burned-calculator" },
        { name: "Weight Goal", path: "/weight-goal-calculator" }
      ]
    },
    {
      title: "Nutrition",
      description: "Plan and optimize your nutrition",
      icon: <Apple className="w-6 h-6 text-green-500" />,
      calculators: [
        { name: "Macronutrient Calculator", path: "/macronutrient-calculator" },
        { name: "Water Intake", path: "/water-intake-calculator" },
        { name: "Glycemic Load", path: "/glycemic-load-calculator" },
        { name: "Meal Calorie", path: "/meal-calorie-calculator" }
      ]
    },
    {
      title: "Fitness",
      description: "Optimize your workout performance",
      icon: <Dumbbell className="w-6 h-6 text-purple-500" />,
      calculators: [
        { name: "One Rep Max", path: "/one-rep-max-calculator" },
        { name: "Heart Rate Zones", path: "/heart-rate-zone-calculator" }
      ]
    }
  ];

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Fitness Calculators</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculatorCategories.map((category, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center gap-4 mb-4">
              {category.icon}
              <div>
                <h2 className="text-xl font-semibold">{category.title}</h2>
                <p className="text-gray-500">{category.description}</p>
              </div>
            </div>
            <div className="space-y-2">
              {category.calculators.map((calc, calcIndex) => (
                <button
                  key={calcIndex}
                  onClick={() => navigate(calc.path)}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  {calc.name}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CalculatorDashboard;