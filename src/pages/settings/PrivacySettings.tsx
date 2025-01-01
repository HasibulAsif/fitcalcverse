import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Shield, Eye, Activity, Share2 } from "lucide-react";

const PrivacySettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your privacy settings have been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Profile Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Public Profile</Label>
              <p className="text-sm text-gray-500">
                Allow others to view your profile
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Progress</Label>
              <p className="text-sm text-gray-500">
                Display your fitness progress publicly
              </p>
            </div>
            <Switch />
          </div>

          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Data Collection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Analytics</Label>
              <p className="text-sm text-gray-500">
                Help improve our service with usage data
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Personalization</Label>
              <p className="text-sm text-gray-500">
                Customize your experience based on your activity
              </p>
            </div>
            <Switch />
          </div>

          <Button onClick={handleSave} className="w-full">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;