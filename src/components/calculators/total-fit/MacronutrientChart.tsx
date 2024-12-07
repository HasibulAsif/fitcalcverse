import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface MacronutrientChartProps {
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export const MacronutrientChart = ({ macros }: MacronutrientChartProps) => {
  const data = [
    { name: 'Protein', value: macros.protein * 4, color: '#22c55e' },
    { name: 'Carbs', value: macros.carbs * 4, color: '#3b82f6' },
    { name: 'Fats', value: macros.fats * 9, color: '#ef4444' },
  ];

  return (
    <div className="w-full h-[300px] mt-4">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: any) => {
              return typeof value === 'number' 
                ? `${Math.round(value)} calories` 
                : value;
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};