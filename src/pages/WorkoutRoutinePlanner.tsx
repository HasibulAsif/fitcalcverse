import { Card } from "@/components/ui/card";
import { WeeklySchedule } from "@/components/workout-planner/WeeklySchedule";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const WorkoutRoutinePlanner = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workout Routine Planner</h1>
        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Sync with Google Calendar
        </Button>
      </div>
      <WeeklySchedule />
    </div>
  );
};

export default WorkoutRoutinePlanner;