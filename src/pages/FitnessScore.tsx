import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Heart, Running, Dumbbell } from "lucide-react";

const FitnessScore = () => {
  const scores = [
    {
      title: 'Overall Fitness',
      score: 85,
      icon: <Trophy className="w-6 h-6 text-primary" />,
      color: 'from-primary/10 to-primary/20'
    },
    {
      title: 'Cardio',
      score: 80,
      icon: <Heart className="w-6 h-6 text-red-500" />,
      color: 'from-red-500/10 to-red-500/20'
    },
    {
      title: 'Strength',
      score: 90,
      icon: <Dumbbell className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500/10 to-blue-500/20'
    },
    {
      title: 'Endurance',
      score: 75,
      icon: <Running className="w-6 h-6 text-green-500" />,
      color: 'from-green-500/10 to-green-500/20'
    }
  ];

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <h1 className="text-4xl font-bold mb-8">Fitness Score</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {scores.map((score, index) => (
          <Card key={index} className={`p-6 relative overflow-hidden`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${score.color} opacity-50`} />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                {score.icon}
                <span className="text-2xl font-bold">{score.score}</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{score.title}</h3>
              <Progress value={score.score} className="h-2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FitnessScore;