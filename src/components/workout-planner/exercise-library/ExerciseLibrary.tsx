import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Exercise, WorkoutType } from "../types";
import { Loader2 } from "lucide-react";

interface ExerciseLibraryProps {
  onSelectExercise: (exercise: Exercise) => void;
}

export const ExerciseLibrary = ({ onSelectExercise }: ExerciseLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

  const { data: exercises, isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercise_library")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const filteredExercises = exercises?.filter((exercise) => {
    const matchesSearch = exercise.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || exercise.category === selectedCategory;
    const matchesDifficulty =
      !selectedDifficulty || exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const mapCategoryToType = (category: string): WorkoutType => {
    const categoryMap: Record<string, WorkoutType> = {
      'Strength': 'strength',
      'Cardio': 'cardio',
      'Flexibility': 'flexibility',
      'Balance': 'other',
    };
    return categoryMap[category] || 'other';
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            <SelectItem value="Strength">Strength</SelectItem>
            <SelectItem value="Cardio">Cardio</SelectItem>
            <SelectItem value="Flexibility">Flexibility</SelectItem>
            <SelectItem value="Balance">Balance</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={selectedDifficulty}
          onValueChange={setSelectedDifficulty}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Difficulties</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="expert">Expert</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises?.map((exercise) => (
          <Card
            key={exercise.id}
            className="p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => onSelectExercise({
              id: `exercise-${Date.now()}`,
              name: exercise.name,
              type: mapCategoryToType(exercise.category),
              duration: 30,
              notes: exercise.description,
            })}
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start">
                <h3 className="font-medium">{exercise.name}</h3>
                <Badge variant="secondary">{exercise.difficulty}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{exercise.description}</p>
              <div className="flex gap-2">
                <Badge>{exercise.category}</Badge>
                {exercise.calories_per_hour && (
                  <Badge variant="outline">
                    {exercise.calories_per_hour} cal/hour
                  </Badge>
                )}
              </div>
              {exercise.equipment && exercise.equipment.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {exercise.equipment.map((item) => (
                    <Badge key={item} variant="outline" className="text-xs">
                      {item}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};