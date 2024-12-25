import { useEffect, useState } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export const DashboardStats = () => {
  const { user } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCredits = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // First check if credits exist
        const { data: existingCredits, error } = await supabase
          .from('user_credits')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching credits:', error);
          setCredits(0);
          setLoading(false);
          return;
        }

        // If no credits exist, create new record
        if (!existingCredits || existingCredits.length === 0) {
          console.log('Creating new credits record for user:', user.id);
          const { data: newCredits, error: insertError } = await supabase
            .from('user_credits')
            .insert([{ user_id: user.id, credits_remaining: 10 }])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating credits:', insertError);
            setCredits(0);
          } else {
            setCredits(newCredits?.credits_remaining || 0);
          }
        } else {
          // Use the first record if multiple exist
          setCredits(existingCredits[0]?.credits_remaining || 0);
        }
      } catch (error) {
        console.error('Unexpected error in credits query:', error);
        setCredits(0);
      }

      setLoading(false);
    };

    fetchUserCredits();
  }, [user]);

  if (loading) {
    return <div>Loading stats...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Credits Remaining</h3>
        <p className="text-2xl font-bold">{credits}</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Active Goals</h3>
        <p className="text-2xl font-bold">3</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Tracked Meals</h3>
        <p className="text-2xl font-bold">12</p>
      </Card>
      
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Workout Streak</h3>
        <p className="text-2xl font-bold">5 days</p>
      </Card>
    </div>
  );
};