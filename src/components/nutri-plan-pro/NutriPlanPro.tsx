import React from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserInfoForm } from './forms/UserInfoForm';
import { DietaryPreferencesForm } from './forms/DietaryPreferencesForm';
import { HealthGoalsForm } from './forms/HealthGoalsForm';
import { NutritionPlanDisplay } from './display/NutritionPlanDisplay';
import { WeeklyPlanView } from './display/WeeklyPlanView';
import { AnalyticsView } from './display/AnalyticsView';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from "sonner";

const NutriPlanPro = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = React.useState('profile');
  const [planGenerated, setPlanGenerated] = React.useState(false);

  const handleFormSubmit = async (values: any) => {
    try {
      toast.success('Profile updated successfully!');
      setPlanGenerated(true);
      setActiveTab('plan');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
          NutriPlanPro - Advanced Nutrition Planning
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 gap-2">
            <TabsTrigger value="profile" className="text-sm">Profile</TabsTrigger>
            <TabsTrigger value="dietary" className="text-sm">Dietary</TabsTrigger>
            <TabsTrigger value="goals" className="text-sm">Goals</TabsTrigger>
            <TabsTrigger value="plan" className="text-sm">Plan</TabsTrigger>
            <TabsTrigger value="weekly" className="text-sm">Weekly View</TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card className="p-6 glass-morphism">
              <UserInfoForm onSubmit={handleFormSubmit} />
            </Card>
          </TabsContent>
          
          <TabsContent value="dietary">
            <Card className="p-6 glass-morphism">
              <DietaryPreferencesForm onSubmit={handleFormSubmit} />
            </Card>
          </TabsContent>

          <TabsContent value="goals">
            <Card className="p-6 glass-morphism">
              <HealthGoalsForm onSubmit={handleFormSubmit} />
            </Card>
          </TabsContent>

          <TabsContent value="plan">
            {planGenerated ? (
              <NutritionPlanDisplay />
            ) : (
              <Card className="p-6 text-center glass-morphism">
                <p>Please complete your profile, dietary preferences, and goals first.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="weekly">
            {planGenerated ? (
              <WeeklyPlanView />
            ) : (
              <Card className="p-6 text-center glass-morphism">
                <p>Please complete your profile and generate a plan first.</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            {planGenerated ? (
              <AnalyticsView />
            ) : (
              <Card className="p-6 text-center glass-morphism">
                <p>Analytics will be available after generating your nutrition plan.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default NutriPlanPro;