import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import BMICalculator from "./components/calculators/BMICalculator";
import BodyFatCalculator from "./components/calculators/BodyFatCalculator";
import CalorieCalculator from "./components/calculators/CalorieCalculator";
import CaloriesBurnedCalculator from "./components/calculators/CaloriesBurnedCalculator";
import MacronutrientCalculator from "./components/calculators/MacronutrientCalculator";
import LeanBodyMassCalculator from "./components/calculators/LeanBodyMassCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/bmi-calculator" element={<BMICalculator />} />
            <Route path="/body-fat-calculator" element={<BodyFatCalculator />} />
            <Route path="/calorie-calculator" element={<CalorieCalculator />} />
            <Route path="/calories-burned-calculator" element={<CaloriesBurnedCalculator />} />
            <Route path="/macronutrient-calculator" element={<MacronutrientCalculator />} />
            <Route path="/lean-body-mass-calculator" element={<LeanBodyMassCalculator />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;