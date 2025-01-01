import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export const ProfileForm = ({ profile }: { profile: any }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateProfile = useMutation({
    mutationFn: async (formData: FormData) => {
      const updates = {
        full_name: formData.get('fullName')?.toString() || '',
        bio: formData.get('bio')?.toString() || '',
        website: formData.get('website')?.toString() || '',
      };

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('user_id', user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    },
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      updateProfile.mutate(new FormData(e.currentTarget));
    }} className="space-y-4">
      <div>
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          defaultValue={profile?.full_name || ''}
        />
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          name="bio"
          defaultValue={profile?.bio || ''}
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          defaultValue={profile?.website || ''}
        />
      </div>
      <Button type="submit" disabled={updateProfile.isPending}>
        {updateProfile.isPending && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Save Changes
      </Button>
    </form>
  );
};