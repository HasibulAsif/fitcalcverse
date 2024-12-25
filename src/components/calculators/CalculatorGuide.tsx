import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  HelpCircle, 
  Info, 
  ArrowRight,
  Target,
  Brain,
  Lightbulb
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface GuideSection {
  title: string;
  content: string | string[];
}

interface CalculatorGuideProps {
  title: string;
  description: string;
  features: string[];
  howTo: GuideSection[];
  interpretation: GuideSection[];
}

const CalculatorGuide = ({ 
  title, 
  description, 
  features, 
  howTo, 
  interpretation 
}: CalculatorGuideProps) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Overview Section */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-start gap-4">
          <Info className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-2">About {title}</h3>
            <p className="text-gray-300">{description}</p>
          </div>
        </div>
      </Card>

      {/* Features Section */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-start gap-4">
          <Target className="w-6 h-6 text-blue-500 mt-1" />
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <ArrowRight className="w-4 h-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* How To Use Section */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-start gap-4">
          <HelpCircle className="w-6 h-6 text-green-500 mt-1" />
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-4">How to Use</h3>
            <Accordion type="single" collapsible className="w-full">
              {howTo.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc list-inside space-y-2">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300">{section.content}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Card>

      {/* Understanding Results Section */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 border-white/20">
        <div className="flex items-start gap-4">
          <Brain className="w-6 h-6 text-purple-500 mt-1" />
          <div className="w-full">
            <h3 className="text-xl font-semibold mb-4">Understanding Your Results</h3>
            <Accordion type="single" collapsible className="w-full">
              {interpretation.map((section, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {Array.isArray(section.content) ? (
                      <ul className="list-disc list-inside space-y-2">
                        {section.content.map((item, idx) => (
                          <li key={idx} className="text-gray-300">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-300">{section.content}</p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CalculatorGuide;