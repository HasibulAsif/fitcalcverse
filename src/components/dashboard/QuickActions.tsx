import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Dumbbell, 
  Apple, 
  Calculator, 
  Trophy,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Log Workout',
      icon: <Dumbbell className="w-4 h-4" />,
      onClick: () => navigate('/workout-suggestion')
    },
    {
      title: 'Track Meal',
      icon: <Apple className="w-4 h-4" />,
      onClick: () => navigate('/meal-plan-generator')
    },
    {
      title: 'Calculate Stats',
      icon: <Calculator className="w-4 h-4" />,
      onClick: () => navigate('/total-fit-calculator')
    },
    {
      title: 'View Progress',
      icon: <Trophy className="w-4 h-4" />,
      onClick: () => navigate('/dashboard')
    }
  ];

  return (
    <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Quick Actions</h2>
        <Button variant="ghost" size="icon">
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="secondary"
            className="w-full justify-start gap-2"
            onClick={action.onClick}
          >
            {action.icon}
            {action.title}
          </Button>
        ))}
      </div>
    </Card>
  );
};