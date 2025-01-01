import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Index from "@/pages/Index";
import CalculatorDashboard from "@/pages/CalculatorDashboard";
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

// Calculator Components
import TotalFitCalculator from "@/components/calculators/TotalFitCalculator";
import BMICalculator from "@/components/calculators/BMICalculator";
import BodyFatCalculator from "@/components/calculators/BodyFatCalculator";
import CalorieCalculator from "@/components/calculators/CalorieCalculator";
import CaloriesBurnedCalculator from "@/components/calculators/CaloriesBurnedCalculator";
import GlycemicLoadCalculator from "@/components/calculators/GlycemicLoadCalculator";
import HeartRateZoneCalculator from "@/components/calculators/HeartRateZoneCalculator";
import IdealBodyWeightCalculator from "@/components/calculators/IdealBodyWeightCalculator";
import LeanBodyMassCalculator from "@/components/calculators/LeanBodyMassCalculator";
import MacronutrientCalculator from "@/components/calculators/MacronutrientCalculator";
import MealCalorieCalculator from "@/components/calculators/MealCalorieCalculator";
import OneRepMaxCalculator from "@/components/calculators/OneRepMaxCalculator";
import WaistToHipCalculator from "@/components/calculators/WaistToHipCalculator";
import WaterIntakeCalculator from "@/components/calculators/WaterIntakeCalculator";
import WeightGoalCalculator from "@/components/calculators/WeightGoalCalculator";
import NutriPlanPro from "@/components/nutri-plan-pro/NutriPlanPro";
import CalorieBhai from "@/pages/CalorieBhai";

// Import new settings pages
import AccountSettings from "@/pages/settings/AccountSettings";
import NotificationSettings from "@/pages/settings/NotificationSettings";
import PrivacySettings from "@/pages/settings/PrivacySettings";
import LanguageSettings from "@/pages/settings/LanguageSettings";

// Import Help & Support pages
import Tutorial from "@/pages/help/Tutorial";
import KnowledgeBase from "@/pages/help/KnowledgeBase";

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
      
      {/* Help & Support Routes */}
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/knowledge-base" element={<KnowledgeBase />} />
      
      {/* Protected Routes */}
      <Route path="/calorie-bhai" element={<ProtectedRoute><CalorieBhai /></ProtectedRoute>} />
      
      <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
      <Route path="/calculator-dashboard" element={<ProtectedRoute><CalculatorDashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/settings/account" element={<ProtectedRoute><AccountSettings /></ProtectedRoute>} />
      <Route path="/settings/notifications" element={<ProtectedRoute><NotificationSettings /></ProtectedRoute>} />
      <Route path="/settings/privacy" element={<ProtectedRoute><PrivacySettings /></ProtectedRoute>} />
      <Route path="/settings/language" element={<ProtectedRoute><LanguageSettings /></ProtectedRoute>} />
      <Route path="/workout-suggestion" element={<ProtectedRoute><WorkoutSuggestion /></ProtectedRoute>} />
      <Route path="/meal-plan-generator" element={<ProtectedRoute><MealPlanGenerator /></ProtectedRoute>} />
      <Route path="/fitness-score" element={<ProtectedRoute><FitnessScore /></ProtectedRoute>} />
      <Route path="/nutrition-tracking" element={<ProtectedRoute><NutritionTracking /></ProtectedRoute>} />
      <Route path="/performance-analytics" element={<ProtectedRoute><PerformanceAnalytics /></ProtectedRoute>} />
      <Route path="/nutri-plan-pro" element={<ProtectedRoute><NutriPlanPro /></ProtectedRoute>} />

      {/* Calculator Routes */}
      <Route path="/total-fit-calculator" element={<ProtectedRoute><TotalFitCalculator /></ProtectedRoute>} />
      <Route path="/bmi-calculator" element={<ProtectedRoute><BMICalculator /></ProtectedRoute>} />
      <Route path="/body-fat-calculator" element={<ProtectedRoute><BodyFatCalculator /></ProtectedRoute>} />
      <Route path="/calorie-calculator" element={<ProtectedRoute><CalorieCalculator /></ProtectedRoute>} />
      <Route path="/calories-burned-calculator" element={<ProtectedRoute><CaloriesBurnedCalculator /></ProtectedRoute>} />
      <Route path="/glycemic-load-calculator" element={<ProtectedRoute><GlycemicLoadCalculator /></ProtectedRoute>} />
      <Route path="/heart-rate-zone-calculator" element={<ProtectedRoute><HeartRateZoneCalculator /></ProtectedRoute>} />
      <Route path="/ideal-body-weight-calculator" element={<ProtectedRoute><IdealBodyWeightCalculator /></ProtectedRoute>} />
      <Route path="/lean-body-mass-calculator" element={<ProtectedRoute><LeanBodyMassCalculator /></ProtectedRoute>} />
      <Route path="/macronutrient-calculator" element={<ProtectedRoute><MacronutrientCalculator /></ProtectedRoute>} />
      <Route path="/meal-calorie-calculator" element={<ProtectedRoute><MealCalorieCalculator /></ProtectedRoute>} />
      <Route path="/one-rep-max-calculator" element={<ProtectedRoute><OneRepMaxCalculator /></ProtectedRoute>} />
      <Route path="/waist-to-hip-calculator" element={<ProtectedRoute><WaistToHipCalculator /></ProtectedRoute>} />
      <Route path="/water-intake-calculator" element={<ProtectedRoute><WaterIntakeCalculator /></ProtectedRoute>} />
      <Route path="/weight-goal-calculator" element={<ProtectedRoute><WeightGoalCalculator /></ProtectedRoute>} />
      
      {/* Catch all undefined routes */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

export default AppRoutes;
