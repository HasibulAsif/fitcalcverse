export type WorkoutType = 'cardio' | 'strength' | 'yoga' | 'flexibility' | 'hiit' | 'other';

export interface Exercise {
  id: string;
  name: string;
  type: WorkoutType;
  duration: number;
  notes?: string;
}

export interface DaySchedule {
  id: string;
  exercises: Exercise[];
}

export interface NewExercise {
  name: string;
  type: WorkoutType;
  duration: number;
  notes?: string;
}