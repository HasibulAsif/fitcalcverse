import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Activity, Dumbbell, Apple } from "lucide-react";

export const RecentActivity = () => {
  const activities = [
    {
      type: 'workout',
      title: 'Completed Strength Training',
      time: '2 hours ago',
      icon: <Dumbbell className="w-4 h-4 text-blue-500" />
    },
    {
      type: 'meal',
      title: 'Logged Lunch',
      time: '4 hours ago',
      icon: <Apple className="w-4 h-4 text-green-500" />
    },
    {
      type: 'achievement',
      title: 'New Personal Best',
      time: '1 day ago',
      icon: <Activity className="w-4 h-4 text-purple-500" />
    }
  ];

  return (
    <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <ScrollArea className="h-[200px] pr-4">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="p-2 rounded-full bg-white/5">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};