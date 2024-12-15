import React from 'react';
import { Check } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
  steps: string[];
}

export const StepProgressBar = ({ currentStep, steps }: StepProgressBarProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 
                ${
                  index < currentStep
                    ? 'bg-primary text-white'
                    : index === currentStep
                    ? 'bg-primary/80 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <span className="text-sm text-gray-600">{step}</span>
          </div>
        ))}
      </div>
      <div className="relative mt-2">
        <div className="absolute top-0 h-1 bg-gray-200 w-full"></div>
        <div
          className="absolute top-0 h-1 bg-primary transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};