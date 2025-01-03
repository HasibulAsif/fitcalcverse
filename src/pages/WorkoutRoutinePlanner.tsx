import { Card } from "@/components/ui/card";
import { WeeklySchedule } from "@/components/workout-planner/WeeklySchedule";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const WorkoutRoutinePlanner = () => {
  const { user } = useAuth();
  const [emailOpen, setEmailOpen] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendEmail = async (schedule: any) => {
    if (!emailTo) {
      toast.error("Please enter an email address");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-workout-email', {
        body: {
          to: [emailTo],
          subject: "Your Workout Routine",
          workoutRoutine: schedule,
          userId: user?.id
        }
      });

      if (error) throw error;
      toast.success("Workout routine sent successfully!");
      setEmailOpen(false);
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast.error("Failed to send workout routine");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Workout Routine Planner</h1>
        <div className="flex gap-4">
          <Dialog open={emailOpen} onOpenChange={setEmailOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Email Routine
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Send Workout Routine</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input
                  type="email"
                  placeholder="Enter email address"
                  value={emailTo}
                  onChange={(e) => setEmailTo(e.target.value)}
                />
                <Button 
                  className="w-full" 
                  onClick={() => handleSendEmail({})} 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Routine"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <WeeklySchedule />
    </div>
  );
};

export default WorkoutRoutinePlanner;