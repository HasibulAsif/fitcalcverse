import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

export const SearchHistory = () => {
  const { data: searches } = useQuery({
    queryKey: ['nutrition_logs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('nutrition_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  if (!searches?.length) return null;

  return (
    <Card className="p-6 glass-morphism">
      <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
      <div className="space-y-4">
        {searches.map((search) => (
          <div
            key={search.id}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div>
              <p className="font-medium">{search.food_name}</p>
              <p className="text-sm text-gray-400">
                {formatDistanceToNow(new Date(search.created_at), { addSuffix: true })}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">{search.calories} kcal</p>
              <p className="text-sm text-gray-400">
                P: {search.protein_grams}g | C: {search.carbs_grams}g | F: {search.fat_grams}g
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};