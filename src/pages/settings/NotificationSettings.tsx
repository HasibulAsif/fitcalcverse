import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Bell, Calendar, Trophy, MessageSquare } from "lucide-react";

const NotificationSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Notification Preferences</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Push Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Workout Reminders</Label>
              <p className="text-sm text-gray-500">
                Receive reminders for scheduled workouts
              </p>
            </div>
            <Switch />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Goal Achievements</Label>
              <p className="text-sm text-gray-500">
                Get notified when you reach your fitness goals
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Updates</Label>
              <p className="text-sm text-gray-500">
                Important updates and announcements
              </p>
            </div>
            <Switch />
          </div>

          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Email Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Progress Reports</Label>
              <p className="text-sm text-gray-500">
                Receive weekly summaries of your progress
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Newsletter</Label>
              <p className="text-sm text-gray-500">
                Tips, updates, and fitness advice
              </p>
            </div>
            <Switch />
          </div>

          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;