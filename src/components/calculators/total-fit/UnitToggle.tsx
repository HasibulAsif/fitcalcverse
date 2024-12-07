import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface UnitToggleProps {
  useMetric: boolean;
  onToggle: (checked: boolean) => void;
}

export const UnitToggle = ({ useMetric, onToggle }: UnitToggleProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="unit-toggle">
        {useMetric ? "Metric Units" : "Imperial Units"}
      </Label>
      <Switch
        id="unit-toggle"
        checked={useMetric}
        onCheckedChange={onToggle}
      />
    </div>
  );
};