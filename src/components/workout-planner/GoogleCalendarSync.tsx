import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const GoogleCalendarSync = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleAuth = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'https://www.googleapis.com/auth/calendar',
          redirectTo: `${window.location.origin}/workout-routine-planner`
        }
      });

      if (error) throw error;

      // Update workout_routines to enable Google Calendar sync
      if (user) {
        const { error: updateError } = await supabase
          .from('workout_routines')
          .update({ google_calendar_enabled: true })
          .eq('user_id', user.id);

        if (updateError) throw updateError;
      }

      toast.success("Successfully connected to Google Calendar!");
    } catch (error: any) {
      console.error('Google Calendar sync error:', error);
      toast.error("Failed to connect to Google Calendar");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className="gap-2"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Calendar className="h-4 w-4" />
      )}
      Sync with Google Calendar
    </Button>
  );
};