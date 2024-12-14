import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import Settings from "@/pages/Settings";
import CookieSettings from "@/pages/CookieSettings";
import WorkoutSuggestion from "@/pages/WorkoutSuggestion";
import MealPlanGenerator from "@/pages/MealPlanGenerator";
import FitnessScore from "@/pages/FitnessScore";
import NutritionTracking from "@/pages/NutritionTracking";
import PerformanceAnalytics from "@/pages/PerformanceAnalytics";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Profile from "@/pages/Profile";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/cookie-settings" element={<CookieSettings />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/workout-suggestion" element={<ProtectedRoute><WorkoutSuggestion /></ProtectedRoute>} />
      <Route path="/meal-plan-generator" element={<ProtectedRoute><MealPlanGenerator /></ProtectedRoute>} />
      <Route path="/fitness-score" element={<ProtectedRoute><FitnessScore /></ProtectedRoute>} />
      <Route path="/nutrition-tracking" element={<ProtectedRoute><NutritionTracking /></ProtectedRoute>} />
      <Route path="/performance-analytics" element={<ProtectedRoute><PerformanceAnalytics /></ProtectedRoute>} />
      
      {/* Catch all undefined routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
