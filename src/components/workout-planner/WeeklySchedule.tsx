import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ExerciseForm } from "./ExerciseForm";
import { DayColumn } from "./DayColumn";
import { Exercise, DaySchedule, NewExercise, WorkoutType } from "./types";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { GoogleCalendarSync } from "./GoogleCalendarSync";
import { Loader2 } from "lucide-react";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const WeeklySchedule = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [schedule, setSchedule] = useState<{ [key: string]: DaySchedule }>(() => {
    const initial: { [key: string]: DaySchedule } = {};
    DAYS.forEach((day, index) => {
      initial[day] = {
        id: `day-${index}`,
        exercises: []
      };
    });
    return initial;
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceDay = DAYS[Math.floor(parseInt(source.droppableId))];
    const destDay = DAYS[Math.floor(parseInt(destination.droppableId))];
    
    const sourceExercises = [...schedule[sourceDay].exercises];
    const destExercises = sourceDay === destDay ? sourceExercises : [...schedule[destDay].exercises];
    
    const [removed] = sourceExercises.splice(source.index, 1);
    destExercises.splice(destination.index, 0, removed);

    setSchedule({
      ...schedule,
      [sourceDay]: {
        ...schedule[sourceDay],
        exercises: sourceExercises
      },
      [destDay]: {
        ...schedule[destDay],
        exercises: destExercises
      }
    });
  };

  const addExercise = (newExercise: NewExercise) => {
    const exercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: newExercise.name,
      type: newExercise.type,
      duration: newExercise.duration,
      notes: newExercise.notes,
      startTime: newExercise.startTime
    };

    setSchedule({
      ...schedule,
      Monday: {
        ...schedule.Monday,
        exercises: [...schedule.Monday.exercises, exercise]
      }
    });
  };

  const saveRoutine = async () => {
    try {
      setIsLoading(true);
      const { data: routine, error: routineError } = await supabase
        .from('workout_routines')
        .insert([
          {
            user_id: user?.id,
            name: 'Weekly Routine',
            description: 'My weekly workout schedule'
          }
        ])
        .select()
        .single();

      if (routineError) throw routineError;

      const scheduleItems = Object.entries(schedule).flatMap(([day, daySchedule], dayIndex) =>
        daySchedule.exercises.map((exercise) => ({
          routine_id: routine.id,
          day_of_week: dayIndex,
          exercise_name: exercise.name,
          exercise_type: exercise.type as WorkoutType,
          start_time: exercise.startTime || '09:00:00',
          duration_minutes: exercise.duration,
          notes: exercise.notes
        }))
      );

      if (scheduleItems.length > 0) {
        const { error: scheduleError } = await supabase
          .from('workout_schedule')
          .insert(scheduleItems);

        if (scheduleError) throw scheduleError;
      }

      toast.success("Workout routine saved successfully!");
    } catch (error: any) {
      console.error('Error saving routine:', error);
      toast.error("Failed to save workout routine");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <ExerciseForm onAddExercise={addExercise} />
        <GoogleCalendarSync />
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {DAYS.map((day, index) => (
            <DayColumn
              key={day}
              day={day}
              dayIndex={index}
              exercises={schedule[day].exercises}
            />
          ))}
        </div>
      </DragDropContext>

      <div className="flex justify-end">
        <Button 
          onClick={saveRoutine} 
          disabled={isLoading}
          className="relative"
        >
          {isLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Save Routine
        </Button>
      </div>
    </div>
  );
};