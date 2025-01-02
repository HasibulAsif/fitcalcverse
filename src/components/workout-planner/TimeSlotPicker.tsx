import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface TimeSlotPickerProps {
  value?: string;
  onChange: (time: string) => void;
}

export const TimeSlotPicker = ({ value, onChange }: TimeSlotPickerProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="time">Start Time</Label>
      <Input
        type="time"
        id="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};