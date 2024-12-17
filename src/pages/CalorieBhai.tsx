import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Search } from "lucide-react";
import { NutritionResult } from '@/components/calorie-bhai/NutritionResult';
import { SearchHistory } from '@/components/calorie-bhai/SearchHistory';
import { useQuery } from '@tanstack/react-query';

interface NutritionData {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

const CalorieBhai = () => {
  const [query, setQuery] = useState('');
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
      return data.items as NutritionData[];
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
        <div className="flex gap-4 mb-6">
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

        {isError && (
          <div className="text-red-500 text-center p-4">
            Failed to fetch nutrition data. Please try again.
          </div>
        )}

        {data && <NutritionResult results={data} />}
      </Card>

      <SearchHistory />
    </div>
  );
};

export default CalorieBhai;