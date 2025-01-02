import { Card } from "@/components/ui/card";

const WorkoutRoutinePlanner = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workout Routine Planner</h1>
      </div>
      <Card className="p-6">
        <p>Coming soon: Drag-and-drop workout planner with Google Calendar integration!</p>
      </Card>
    </div>
  );
};

export default WorkoutRoutinePlanner;