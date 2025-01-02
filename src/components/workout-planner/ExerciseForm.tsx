import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { WorkoutType, NewExercise } from "./types";

const WORKOUT_TYPES: { value: WorkoutType; label: string }[] = [
  { value: 'cardio', label: 'Cardio' },
  { value: 'strength', label: 'Strength' },
  { value: 'yoga', label: 'Yoga' },
  { value: 'flexibility', label: 'Flexibility' },
  { value: 'hiit', label: 'HIIT' },
  { value: 'other', label: 'Other' }
];

interface ExerciseFormProps {
  onAddExercise: (exercise: NewExercise) => void;
}

export const ExerciseForm = ({ onAddExercise }: ExerciseFormProps) => {
  const [newExercise, setNewExercise] = useState<NewExercise>({
    name: '',
    type: 'cardio',
    duration: 30
  });

  const handleSubmit = () => {
    if (!newExercise.name || !newExercise.type || !newExercise.duration) {
      toast.error("Please fill in all exercise details");
      return;
    }

    onAddExercise(newExercise);
    setNewExercise({
      name: '',
      type: 'cardio',
      duration: 30
    });
    toast.success("Exercise added successfully!");
  };

  return (
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
            onValueChange={(value: WorkoutType) => setNewExercise({ ...newExercise, type: value })}
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
          <Button onClick={handleSubmit} className="w-full">
            Add Exercise
          </Button>
        </div>
      </div>
    </Card>
  );
};