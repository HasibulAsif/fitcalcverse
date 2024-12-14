import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, User } from "lucide-react";

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  website: string;
}

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;
      return data as Profile;
    },
    enabled: !!user?.id,
  });

  const updateProfile = useMutation({
    mutationFn: async (updatedProfile: Partial<Profile>) => {
      const { error } = await supabase
        .from("profiles")
        .update(updatedProfile)
        .eq("user_id", user?.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", user?.id] });
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedProfile = {
      full_name: formData.get("full_name") as string,
      bio: formData.get("bio") as string,
      website: formData.get("website") as string,
    };
    updateProfile.mutate(updatedProfile);
  };

  useEffect(() => {
    if (!user) return;

    const createProfileIfNotExists = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (!data && !error) {
        await supabase.from("profiles").insert([
          {
            user_id: user.id,
            full_name: user.email?.split("@")[0] || "",
          },
        ]);
        queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
      }
    };

    createProfileIfNotExists();
  }, [user, queryClient]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <User className="w-6 h-6" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Full Name</label>
                <Input
                  name="full_name"
                  defaultValue={profile?.full_name || ""}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Bio</label>
                <Textarea
                  name="bio"
                  defaultValue={profile?.bio || ""}
                  className="bg-gray-700/50 border-gray-600 min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400">Website</label>
                <Input
                  name="website"
                  type="url"
                  defaultValue={profile?.website || ""}
                  className="bg-gray-700/50 border-gray-600"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={updateProfile.isPending}
              >
                {updateProfile.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;