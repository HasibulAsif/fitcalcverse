import { Card } from "@/components/ui/card";
import { WeeklySchedule } from "@/components/workout-planner/WeeklySchedule";
import { GoogleCalendarSync } from "@/components/workout-planner/GoogleCalendarSync";

const WorkoutRoutinePlanner = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workout Routine Planner</h1>
        <GoogleCalendarSync />
      </div>
      <WeeklySchedule />
    </div>
  );
};

export default WorkoutRoutinePlanner;