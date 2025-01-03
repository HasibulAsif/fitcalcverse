import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TimeSlotPicker } from "./TimeSlotPicker";
import { NewExercise, WorkoutType } from "./types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExerciseLibrary } from "./exercise-library/ExerciseLibrary";
import { WorkoutTemplates } from "./templates/WorkoutTemplates";

interface ExerciseFormProps {
  onAddExercise: (exercise: NewExercise) => void;
  onApplyTemplate?: (exercises: NewExercise[]) => void;
}

export const ExerciseForm = ({ onAddExercise, onApplyTemplate }: ExerciseFormProps) => {
  const [open, setOpen] = useState(false);
  const [exercise, setExercise] = useState<NewExercise>({
    name: "",
    type: "cardio",
    duration: 30,
    startTime: "09:00",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExercise(exercise);
    setExercise({
      name: "",
      type: "cardio",
      duration: 30,
      startTime: "09:00",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Exercise</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Add New Exercise</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="manual" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
            <TabsTrigger value="library">Exercise Library</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <TabsContent value="manual">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Exercise Name</Label>
                <Input
                  id="name"
                  value={exercise.name}
                  onChange={(e) =>
                    setExercise({ ...exercise, name: e.target.value })
                  }
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={exercise.type}
                  onValueChange={(value: WorkoutType) =>
                    setExercise({ ...exercise, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="strength">Strength</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="flexibility">Flexibility</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={exercise.duration}
                  onChange={(e) =>
                    setExercise({ ...exercise, duration: parseInt(e.target.value) })
                  }
                  required
                />
              </div>

              <TimeSlotPicker
                value={exercise.startTime}
                onChange={(time) => setExercise({ ...exercise, startTime: time })}
              />

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={exercise.notes}
                  onChange={(e) =>
                    setExercise({ ...exercise, notes: e.target.value })
                  }
                />
              </div>

              <Button type="submit" className="w-full">
                Add Exercise
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="library">
            <ExerciseLibrary
              onSelectExercise={(selectedExercise) => {
                onAddExercise({
                  ...selectedExercise,
                  startTime: "09:00",
                });
                setOpen(false);
              }}
            />
          </TabsContent>
          
          <TabsContent value="templates">
            <WorkoutTemplates
              onApplyTemplate={(exercises) => {
                if (onApplyTemplate) {
                  onApplyTemplate(exercises);
                  setOpen(false);
                }
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};