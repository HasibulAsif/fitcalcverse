import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Exercise } from "../types";
import { Loader2 } from "lucide-react";

interface WorkoutTemplatesProps {
  onApplyTemplate: (exercises: Exercise[]) => void;
}

export const WorkoutTemplates = ({ onApplyTemplate }: WorkoutTemplatesProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    description: "",
  });

  const { data: templates, isLoading } = useQuery({
    queryKey: ["workout-templates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workout_templates")
        .select("*")
        .or(`user_id.eq.${user?.id},is_public.eq.true`);
      if (error) throw error;
      return data;
    },
  });

  const createTemplateMutation = useMutation({
    mutationFn: async (currentExercises: Exercise[]) => {
      const { data, error } = await supabase
        .from("workout_templates")
        .insert({
          user_id: user?.id,
          name: newTemplate.name,
          description: newTemplate.description,
          exercises: currentExercises,
        });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workout-templates"] });
      setIsCreateOpen(false);
      setNewTemplate({ name: "", description: "" });
      toast.success("Template saved successfully!");
    },
    onError: (error) => {
      console.error("Error saving template:", error);
      toast.error("Failed to save template");
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Workout Templates</h2>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>Save as Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Save Workout Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Template Name"
                value={newTemplate.name}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={newTemplate.description}
                onChange={(e) =>
                  setNewTemplate({ ...newTemplate, description: e.target.value })
                }
              />
              <Button
                className="w-full"
                onClick={() => createTemplateMutation.mutate([])}
                disabled={!newTemplate.name}
              >
                {createTemplateMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save Template"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <Card
            key={template.id}
            className="p-4 cursor-pointer hover:bg-accent transition-colors"
            onClick={() => {
              const exercises = template.exercises as Exercise[];
              onApplyTemplate(exercises);
              toast.success("Template applied successfully!");
            }}
          >
            <div className="space-y-2">
              <h3 className="font-medium">{template.name}</h3>
              {template.description && (
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};