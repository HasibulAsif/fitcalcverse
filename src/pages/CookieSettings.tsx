import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  advertising: boolean;
}

const CookieSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    functional: false,
    analytics: false,
    advertising: false,
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('cookie_consents')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setPreferences({
            essential: data.essential,
            functional: data.functional,
            analytics: data.analytics,
            advertising: data.advertising,
          });
        }
      }
    };

    fetchPreferences();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save preferences",
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from('cookie_consents')
      .upsert({
        user_id: user.id,
        ...preferences,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to save preferences",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "Your cookie preferences have been saved",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-3xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Settings</CardTitle>
          <CardDescription>
            Manage how we use cookies to improve your experience
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Essential Cookies</Label>
                <p className="text-sm text-gray-500">
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch checked={preferences.essential} disabled />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Functional Cookies</Label>
                <p className="text-sm text-gray-500">
                  Enable enhanced functionality and personalization.
                </p>
              </div>
              <Switch
                checked={preferences.functional}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, functional: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Analytics Cookies</Label>
                <p className="text-sm text-gray-500">
                  Help us understand how you use our website.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Advertising Cookies</Label>
                <p className="text-sm text-gray-500">
                  Used to show you relevant advertisements.
                </p>
              </div>
              <Switch
                checked={preferences.advertising}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, advertising: checked }))
                }
              />
            </div>
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookieSettings;