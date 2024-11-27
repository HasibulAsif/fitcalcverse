import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const HeartRateZoneCalculator = () => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [zones, setZones] = useState<{ name: string; range: string; purpose: string }[] | null>(null);

  const calculateHeartRateZones = () => {
    if (!age || !restingHR) {
      toast.error("Please fill in all fields");
      return;
    }

    const maxHR = 220 - parseInt(age);
    const hrReserve = maxHR - parseInt(restingHR);

    const calculateZoneHR = (percentLow: number, percentHigh: number) => {
      const low = Math.round(parseInt(restingHR) + (hrReserve * percentLow));
      const high = Math.round(parseInt(restingHR) + (hrReserve * percentHigh));
      return `${low} - ${high} bpm`;
    };

    const calculatedZones = [
      {
        name: "Zone 1 (50-60%)",
        range: calculateZoneHR(0.5, 0.6),
        purpose: "Warm up / Recovery"
      },
      {
        name: "Zone 2 (60-70%)",
        range: calculateZoneHR(0.6, 0.7),
        purpose: "Fat Burn"
      },
      {
        name: "Zone 3 (70-80%)",
        range: calculateZoneHR(0.7, 0.8),
        purpose: "Aerobic / Endurance"
      },
      {
        name: "Zone 4 (80-90%)",
        range: calculateZoneHR(0.8, 0.9),
        purpose: "Anaerobic / Performance"
      },
      {
        name: "Zone 5 (90-100%)",
        range: calculateZoneHR(0.9, 1),
        purpose: "Maximum Effort"
      }
    ];

    setZones(calculatedZones);
    toast.success("Heart rate zones calculated successfully!");
  };

  return (
    <Card className="p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Heart Rate Zone Calculator</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Age</label>
          <Input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Resting Heart Rate (bpm)</label>
          <Input
            type="number"
            value={restingHR}
            onChange={(e) => setRestingHR(e.target.value)}
            placeholder="Enter resting heart rate"
          />
        </div>

        <Button 
          onClick={calculateHeartRateZones}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Calculate Heart Rate Zones
        </Button>
        
        {zones && (
          <div className="mt-4 space-y-4 animate-fade-in">
            {zones.map((zone, index) => (
              <div 
                key={index}
                className="p-4 bg-secondary rounded-lg hover:scale-105 transition-transform duration-300"
              >
                <h3 className="font-semibold text-center">{zone.name}</h3>
                <p className="text-2xl font-bold text-center mt-1">{zone.range}</p>
                <p className="text-sm text-center text-gray-400 mt-1">{zone.purpose}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default HeartRateZoneCalculator;