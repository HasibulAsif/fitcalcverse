import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ChartBar } from "lucide-react";

const PerformanceAnalytics = () => {
  const data = [
    { date: '2024-01', value: 65 },
    { date: '2024-02', value: 70 },
    { date: '2024-03', value: 75 },
    { date: '2024-04', value: 72 },
    { date: '2024-05', value: 78 },
    { date: '2024-06', value: 82 }
  ];

  return (
    <div className="container mx-auto py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Performance Analytics</h1>
        <div className="flex gap-4">
          <Select defaultValue="6months">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="6months">Last 6 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <ChartBar className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">Progress Overview</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Key Metrics</h2>
          <div className="space-y-4">
            {['Strength', 'Endurance', 'Speed', 'Flexibility'].map((metric, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <span>{metric}</span>
                <span className="text-primary">+15%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;