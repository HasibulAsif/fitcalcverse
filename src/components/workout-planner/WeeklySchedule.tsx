import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WORKOUT_TYPES = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'other', label: 'Other' }
];

interface Exercise {
  id: string;
  name: string;
  type: string;
  duration: number;
  notes?: string;
}

interface DaySchedule {
  id: string;
  exercises: Exercise[];
}

export const WeeklySchedule = () => {
  const { user } = useAuth();
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

  const [newExercise, setNewExercise] = useState<Partial<Exercise>>({
    name: '',
    type: 'cardio',
    duration: 30
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

  const addExercise = () => {
    if (!newExercise.name || !newExercise.type || !newExercise.duration) {
      toast.error("Please fill in all exercise details");
      return;
    }

    const exercise: Exercise = {
      id: `exercise-${Date.now()}`,
      name: newExercise.name,
      type: newExercise.type,
      duration: newExercise.duration,
      notes: newExercise.notes
    };

    setSchedule({
      ...schedule,
      Monday: {
        ...schedule.Monday,
        exercises: [...schedule.Monday.exercises, exercise]
      }
    });

    setNewExercise({
      name: '',
      type: 'cardio',
      duration: 30
    });

    toast.success("Exercise added successfully!");
  };

  const saveRoutine = async () => {
    try {
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
          exercise_type: exercise.type,
          start_time: '09:00:00',
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
    } catch (error) {
      console.error('Error saving routine:', error);
      toast.error("Failed to save workout routine");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Add New Exercise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="exercise-name">Exercise Name</Label>
            <Input
              id="exercise-name"
              value={newExercise.name}
              onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
              placeholder="e.g., Push-ups"
            />
          </div>
          <div>
            <Label htmlFor="exercise-type">Type</Label>
            <Select
              value={newExercise.type}
              onValueChange={(value) => setNewExercise({ ...newExercise, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {WORKOUT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="exercise-duration">Duration (minutes)</Label>
            <Input
              id="exercise-duration"
              type="number"
              value={newExercise.duration}
              onChange={(e) => setNewExercise({ ...newExercise, duration: parseInt(e.target.value) })}
              min={1}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addExercise} className="w-full">
              Add Exercise
            </Button>
          </div>
        </div>
      </Card>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          {DAYS.map((day, index) => (
            <Card key={day} className="p-4">
              <h3 className="font-semibold mb-2">{day}</h3>
              <Droppable droppableId={index.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded-md p-2 ${
                      snapshot.isDraggingOver ? 'bg-primary/10' : 'bg-background/50'
                    }`}
                  >
                    {schedule[day].exercises.map((exercise, exerciseIndex) => (
                      <Draggable
                        key={exercise.id}
                        draggableId={exercise.id}
                        index={exerciseIndex}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-card p-2 mb-2 rounded-md shadow-sm"
                          >
                            <div className="font-medium">{exercise.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {exercise.duration} mins - {exercise.type}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          ))}
        </div>
      </DragDropContext>

      <div className="flex justify-end">
        <Button onClick={saveRoutine}>
          Save Routine
        </Button>
      </div>
    </div>
  );
};