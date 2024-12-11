import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export const ProgressTracking = () => {
  const goals = [
    {
      title: 'Weekly Workout Goal',
      current: 4,
      target: 5,
      unit: 'sessions',
      progress: (4 / 5) * 100
    },
    {
      title: 'Daily Calorie Goal',
      current: 1800,
      target: 2000,
      unit: 'kcal',
      progress: (1800 / 2000) * 100
    },
    {
      title: 'Water Intake',
      current: 2.5,
      target: 3,
      unit: 'L',
      progress: (2.5 / 3) * 100
    }
  ];

  return (
    <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
      <h2 className="text-lg font-semibold mb-4">Progress Tracking</h2>
      <div className="space-y-6">
        {goals.map((goal, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{goal.title}</span>
              <span>
                {goal.current} / {goal.target} {goal.unit}
              </span>
            </div>
            <Progress value={goal.progress} className="h-2" />
          </div>
        ))}
      </div>
    </Card>
  );
};