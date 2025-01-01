import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSettings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your language preferences have been updated successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Language Preferences</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Display Language
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select Language</label>
            <Select defaultValue="en">
              <SelectTrigger>
                <SelectValue placeholder="Select a language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="it">Italiano</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5" />
            Regional Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Time Zone</label>
            <Select defaultValue="utc">
              <SelectTrigger>
                <SelectValue placeholder="Select a time zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="utc">UTC (GMT)</SelectItem>
                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                <SelectItem value="cet">Central European Time (CET)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleSave} className="w-full">Save Preferences</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSettings;