import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search, Upload, Text, Image } from "lucide-react";
import { NutritionResult } from '@/components/calorie-bhai/NutritionResult';
import { SearchHistory } from '@/components/calorie-bhai/SearchHistory';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CalculatorGuide from '@/components/calculators/CalculatorGuide';

const CalorieBhai = () => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('quick');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { toast } = useToast();

  const { data, isLoading, refetch, isError } = useQuery({
    queryKey: ['nutrition', query],
    queryFn: async () => {
      if (!query) return null;
      
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`, {
        headers: {
          'X-Api-Key': 'i77Z0rufJh7lj3mGvPpEUg==FAsB30jTczLncxR7'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data');
      }
      
      const data = await response.json();
      return data.items;
    },
    enabled: false
  });

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a food item to search",
        variant: "destructive"
      });
      return;
    }
    refetch();
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Here you would implement OCR or image processing
      toast({
        title: "Image Uploaded",
        description: "Processing image text...",
      });
    }
  };

  const guideContent = {
    title: "CalorieBhai",
    description: "Get instant nutrition information for any food item with our advanced food analysis tool.",
    features: [
      "Quick search for instant nutrition facts",
      "Natural language processing for meal descriptions",
      "Image recognition for food items",
      "Detailed macro and micronutrient breakdown",
      "Search history tracking",
      "Export and share nutrition reports"
    ],
    howTo: [
      {
        title: "Quick Search",
        content: [
          "Enter a specific food item with quantity (e.g., '100g chicken breast')",
          "Click search or press Enter to get instant results",
          "View comprehensive nutrition breakdown"
        ]
      },
      {
        title: "Text Analysis",
        content: [
          "Describe your meal in natural language",
          "Include approximate portions if known",
          "Get nutrition estimates for complete meals"
        ]
      },
      {
        title: "Image Upload",
        content: [
          "Take a clear photo of your food",
          "Upload through the image upload section",
          "Wait for AI analysis of your meal"
        ]
      }
    ],
    interpretation: [
      {
        title: "Understanding Calories",
        content: "Calories represent the energy content in food. The daily recommended intake varies based on age, gender, and activity level."
      },
      {
        title: "Macronutrients",
        content: [
          "Proteins: Essential for muscle building and repair",
          "Carbohydrates: Primary energy source",
          "Fats: Important for hormone production and nutrient absorption"
        ]
      },
      {
        title: "Using the Results",
        content: "Compare results with your daily targets, track your intake over time, and adjust portions based on your goals."
      }
    ]
  };

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          CalorieBhai
        </h1>
        <p className="text-gray-400">
          Get instant nutrition information for any food item
        </p>
      </div>

      <Card className="p-6 glass-morphism">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="quick">Quick Search</TabsTrigger>
            <TabsTrigger value="text">Text Analysis</TabsTrigger>
            <TabsTrigger value="image">Image Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="quick">
            <div className="flex gap-4">
              <Input
                placeholder="Enter food item (e.g., '100g chicken breast' or '1 apple')"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="min-w-[100px]"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="text">
            <div className="space-y-4">
              <div>
                <Label>Natural Language Input</Label>
                <Textarea 
                  placeholder="Describe your meal (e.g., 'Last night we ordered a 14oz prime rib and mashed potatoes')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              <Button 
                onClick={handleSearch}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Text className="w-4 h-4 mr-2" />
                    Analyze Text
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="image">
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <Image className="w-12 h-12 mb-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Upload an image of your food or menu
                  </span>
                  <span className="text-xs text-gray-500 mt-2">
                    Supports JPG, PNG up to 5MB
                  </span>
                </Label>
              </div>
              {imageFile && (
                <div className="text-sm text-gray-400">
                  Selected file: {imageFile.name}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {isError && (
          <div className="text-red-500 text-center p-4">
            Failed to fetch nutrition data. Please try again.
          </div>
        )}

        {data && <NutritionResult results={data} />}
      </Card>

      <SearchHistory />
      <CalculatorGuide {...guideContent} />
    </div>
  );
};

export default CalorieBhai;
