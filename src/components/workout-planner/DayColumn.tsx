import { Droppable, Draggable } from "react-beautiful-dnd";
import { Card } from "@/components/ui/card";
import { Exercise } from "./types";

interface DayColumnProps {
  day: string;
  dayIndex: number;
  exercises: Exercise[];
}

export const DayColumn = ({ day, dayIndex, exercises }: DayColumnProps) => {
  return (
    <Card key={day} className="p-4">
      <h3 className="font-semibold mb-2">{day}</h3>
      <Droppable droppableId={dayIndex.toString()}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[200px] rounded-md p-2 ${
              snapshot.isDraggingOver ? 'bg-primary/10' : 'bg-background/50'
            }`}
          >
            {exercises.map((exercise, exerciseIndex) => (
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
  );
};