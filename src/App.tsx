import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Index from "./pages/Index";
import BMICalculator from "./components/calculators/BMICalculator";
import BodyFatCalculator from "./components/calculators/BodyFatCalculator";
import CalorieCalculator from "./components/calculators/CalorieCalculator";
import CaloriesBurnedCalculator from "./components/calculators/CaloriesBurnedCalculator";
import MacronutrientCalculator from "./components/calculators/MacronutrientCalculator";
import LeanBodyMassCalculator from "./components/calculators/LeanBodyMassCalculator";
import WeightGoalCalculator from "./components/calculators/WeightGoalCalculator";
import WaterIntakeCalculator from "./components/calculators/WaterIntakeCalculator";
import OneRepMaxCalculator from "./components/calculators/OneRepMaxCalculator";
import HeartRateZoneCalculator from "./components/calculators/HeartRateZoneCalculator";

const queryClient = new QueryClient();

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Index />
        </ProtectedRoute>
      } />
      <Route path="/bmi-calculator" element={
        <ProtectedRoute>
          <BMICalculator />
        </ProtectedRoute>
      } />
      <Route path="/body-fat-calculator" element={
        <ProtectedRoute>
          <BodyFatCalculator />
        </ProtectedRoute>
      } />
      <Route path="/calorie-calculator" element={
        <ProtectedRoute>
          <CalorieCalculator />
        </ProtectedRoute>
      } />
      <Route path="/calories-burned-calculator" element={
        <ProtectedRoute>
          <CaloriesBurnedCalculator />
        </ProtectedRoute>
      } />
      <Route path="/macronutrient-calculator" element={
        <ProtectedRoute>
          <MacronutrientCalculator />
        </ProtectedRoute>
      } />
      <Route path="/lean-body-mass-calculator" element={
        <ProtectedRoute>
          <LeanBodyMassCalculator />
        </ProtectedRoute>
      } />
      <Route path="/weight-goal-calculator" element={
        <ProtectedRoute>
          <WeightGoalCalculator />
        </ProtectedRoute>
      } />
      <Route path="/water-intake-calculator" element={
        <ProtectedRoute>
          <WaterIntakeCalculator />
        </ProtectedRoute>
      } />
      <Route path="/one-rep-max-calculator" element={
        <ProtectedRoute>
          <OneRepMaxCalculator />
        </ProtectedRoute>
      } />
      <Route path="/heart-rate-zone-calculator" element={
        <ProtectedRoute>
          <HeartRateZoneCalculator />
        </ProtectedRoute>
      } />
      
      {/* Catch all undefined routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <AppRoutes />
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;