import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface NutritionResultProps {
  results: NutritionData[];
}

export const NutritionResult = ({ results }: NutritionResultProps) => {
  if (!results.length) {
    return (
      <div className="text-center p-4 text-gray-400">
        No nutrition data found for this query.
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nutrient</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((item, index) => (
            <>
              <TableRow key={`${index}-name`}>
                <TableCell colSpan={2} className="font-bold bg-muted/50">
                  {item.name} (per {item.serving_size_g}g serving)
                </TableCell>
              </TableRow>
              <TableRow key={`${index}-calories`}>
                <TableCell>Calories</TableCell>
                <TableCell className="text-right">{item.calories.toFixed(1)} kcal</TableCell>
              </TableRow>
              <TableRow key={`${index}-protein`}>
                <TableCell>Protein</TableCell>
                <TableCell className="text-right">{item.protein_g.toFixed(1)}g</TableCell>
              </TableRow>
              <TableRow key={`${index}-carbs`}>
                <TableCell>Carbohydrates</TableCell>
                <TableCell className="text-right">{item.carbohydrates_total_g.toFixed(1)}g</TableCell>
              </TableRow>
              <TableRow key={`${index}-fat`}>
                <TableCell>Total Fat</TableCell>
                <TableCell className="text-right">{item.fat_total_g.toFixed(1)}g</TableCell>
              </TableRow>
              <TableRow key={`${index}-fiber`}>
                <TableCell>Fiber</TableCell>
                <TableCell className="text-right">{item.fiber_g.toFixed(1)}g</TableCell>
              </TableRow>
              <TableRow key={`${index}-sugar`}>
                <TableCell>Sugar</TableCell>
                <TableCell className="text-right">{item.sugar_g.toFixed(1)}g</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};