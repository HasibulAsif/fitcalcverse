import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Upload } from "lucide-react";

export const ProfilePictureUpload = ({ profile }: { profile: any }) => {
  const [uploading, setUploading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleProfilePictureUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20">
        <img
          src={profile?.avatar_url || '/placeholder.svg'}
          alt="Profile"
          className="rounded-full object-cover w-full h-full"
        />
        <Label
          htmlFor="picture"
          className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer"
        >
          <Upload className="h-4 w-4 text-white" />
        </Label>
        <Input
          id="picture"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleProfilePictureUpload}
          disabled={uploading}
        />
      </div>
      {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
    </div>
  );
};