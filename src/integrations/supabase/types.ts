export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bmi_records: {
        Row: {
          bmi: number
          category: string
          created_at: string | null
          height: number
          id: string
          updated_at: string | null
          user_id: string
          weight: number
        }
        Insert: {
          bmi: number
          category: string
          created_at?: string | null
          height: number
          id?: string
          updated_at?: string | null
          user_id: string
          weight: number
        }
        Update: {
          bmi?: number
          category?: string
          created_at?: string | null
          height?: number
          id?: string
          updated_at?: string | null
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      body_fat_records: {
        Row: {
          body_fat_percentage: number
          created_at: string | null
          gender: string
          height: number
          hip: number | null
          id: string
          neck: number
          updated_at: string | null
          user_id: string
          waist: number
        }
        Insert: {
          body_fat_percentage: number
          created_at?: string | null
          gender: string
          height: number
          hip?: number | null
          id?: string
          neck: number
          updated_at?: string | null
          user_id: string
          waist: number
        }
        Update: {
          body_fat_percentage?: number
          created_at?: string | null
          gender?: string
          height?: number
          hip?: number | null
          id?: string
          neck?: number
          updated_at?: string | null
          user_id?: string
          waist?: number
        }
        Relationships: []
      }
      calories_burned_records: {
        Row: {
          activity: string
          calories_burned: number
          created_at: string | null
          duration: number
          id: string
          updated_at: string | null
          user_id: string
          weight: number
        }
        Insert: {
          activity: string
          calories_burned: number
          created_at?: string | null
          duration: number
          id?: string
          updated_at?: string | null
          user_id: string
          weight: number
        }
        Update: {
          activity?: string
          calories_burned?: number
          created_at?: string | null
          duration?: number
          id?: string
          updated_at?: string | null
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          subject: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          subject: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          subject?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cookie_consents: {
        Row: {
          advertising: boolean | null
          analytics: boolean | null
          created_at: string | null
          essential: boolean | null
          functional: boolean | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          advertising?: boolean | null
          analytics?: boolean | null
          created_at?: string | null
          essential?: boolean | null
          functional?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          advertising?: boolean | null
          analytics?: boolean | null
          created_at?: string | null
          essential?: boolean | null
          functional?: boolean | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      daily_meal_plans: {
        Row: {
          created_at: string | null
          date: string
          id: string
          notes: string | null
          nutrition_plan_id: string
          total_calories: number
          total_carbs: number
          total_fat: number
          total_protein: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          nutrition_plan_id: string
          total_calories: number
          total_carbs: number
          total_fat: number
          total_protein: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          nutrition_plan_id?: string
          total_calories?: number
          total_carbs?: number
          total_fat?: number
          total_protein?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "daily_meal_plans_nutrition_plan_id_fkey"
            columns: ["nutrition_plan_id"]
            isOneToOne: false
            referencedRelation: "nutrition_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      email_subscriptions: {
        Row: {
          created_at: string | null
          email: string
          id: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      fitness_scores: {
        Row: {
          assessment_date: string
          cardio_score: number
          created_at: string | null
          endurance_score: number
          flexibility_score: number
          id: string
          strength_score: number
          total_score: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          assessment_date?: string
          cardio_score: number
          created_at?: string | null
          endurance_score: number
          flexibility_score: number
          id?: string
          strength_score: number
          total_score: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          assessment_date?: string
          cardio_score?: number
          created_at?: string | null
          endurance_score?: number
          flexibility_score?: number
          id?: string
          strength_score?: number
          total_score?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      foods: {
        Row: {
          calories: number
          carbs_grams: number
          category: Database["public"]["Enums"]["food_category"]
          created_at: string | null
          description: string | null
          fat_grams: number
          id: string
          image_url: string | null
          name: string
          preparation_instructions: string | null
          protein_grams: number
          serving_size: string
          updated_at: string | null
        }
        Insert: {
          calories: number
          carbs_grams: number
          category: Database["public"]["Enums"]["food_category"]
          created_at?: string | null
          description?: string | null
          fat_grams: number
          id?: string
          image_url?: string | null
          name: string
          preparation_instructions?: string | null
          protein_grams: number
          serving_size: string
          updated_at?: string | null
        }
        Update: {
          calories?: number
          carbs_grams?: number
          category?: Database["public"]["Enums"]["food_category"]
          created_at?: string | null
          description?: string | null
          fat_grams?: number
          id?: string
          image_url?: string | null
          name?: string
          preparation_instructions?: string | null
          protein_grams?: number
          serving_size?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      google_calendar_events: {
        Row: {
          calendar_id: string
          created_at: string | null
          google_event_id: string
          id: string
          routine_id: string
          synced_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calendar_id: string
          created_at?: string | null
          google_event_id: string
          id?: string
          routine_id: string
          synced_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calendar_id?: string
          created_at?: string | null
          google_event_id?: string
          id?: string
          routine_id?: string
          synced_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "google_calendar_events_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "workout_routines"
            referencedColumns: ["id"]
          },
        ]
      }
      ideal_weight_records: {
        Row: {
          created_at: string | null
          gender: string
          height: number
          id: string
          ideal_weight: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          gender: string
          height: number
          id?: string
          ideal_weight: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          gender?: string
          height?: number
          id?: string
          ideal_weight?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      lean_mass_records: {
        Row: {
          body_fat_percentage: number
          created_at: string | null
          id: string
          lean_mass: number
          updated_at: string | null
          user_id: string
          weight: number
        }
        Insert: {
          body_fat_percentage: number
          created_at?: string | null
          id?: string
          lean_mass: number
          updated_at?: string | null
          user_id: string
          weight: number
        }
        Update: {
          body_fat_percentage?: number
          created_at?: string | null
          id?: string
          lean_mass?: number
          updated_at?: string | null
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      meal_plan_items: {
        Row: {
          created_at: string | null
          food_id: string | null
          id: string
          meal_plan_id: string | null
          meal_type: string
          order_in_meal: number
          serving_quantity: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          food_id?: string | null
          id?: string
          meal_plan_id?: string | null
          meal_type: string
          order_in_meal: number
          serving_quantity?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          food_id?: string | null
          id?: string
          meal_plan_id?: string | null
          meal_type?: string
          order_in_meal?: number
          serving_quantity?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meal_plan_items_food_id_fkey"
            columns: ["food_id"]
            isOneToOne: false
            referencedRelation: "foods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "meal_plan_items_meal_plan_id_fkey"
            columns: ["meal_plan_id"]
            isOneToOne: false
            referencedRelation: "meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      meal_plan_profiles: {
        Row: {
          activity_level: Database["public"]["Enums"]["activity_level"]
          age: number
          country: string
          created_at: string | null
          dietary_preference: Database["public"]["Enums"]["dietary_preference"]
          fitness_goal: Database["public"]["Enums"]["fitness_goal"]
          food_allergies: string[] | null
          gender: string
          height: number
          id: string
          meal_frequency: number
          updated_at: string | null
          user_id: string | null
          weight: number
        }
        Insert: {
          activity_level: Database["public"]["Enums"]["activity_level"]
          age: number
          country?: string
          created_at?: string | null
          dietary_preference: Database["public"]["Enums"]["dietary_preference"]
          fitness_goal: Database["public"]["Enums"]["fitness_goal"]
          food_allergies?: string[] | null
          gender: string
          height: number
          id?: string
          meal_frequency: number
          updated_at?: string | null
          user_id?: string | null
          weight: number
        }
        Update: {
          activity_level?: Database["public"]["Enums"]["activity_level"]
          age?: number
          country?: string
          created_at?: string | null
          dietary_preference?: Database["public"]["Enums"]["dietary_preference"]
          fitness_goal?: Database["public"]["Enums"]["fitness_goal"]
          food_allergies?: string[] | null
          gender?: string
          height?: number
          id?: string
          meal_frequency?: number
          updated_at?: string | null
          user_id?: string | null
          weight?: number
        }
        Relationships: []
      }
      meal_plans: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      meals: {
        Row: {
          calories: number
          carbs: number
          created_at: string | null
          daily_plan_id: string
          fat: number
          id: string
          meal_time: string
          meal_type: string
          protein: number
          updated_at: string | null
        }
        Insert: {
          calories: number
          carbs: number
          created_at?: string | null
          daily_plan_id: string
          fat: number
          id?: string
          meal_time: string
          meal_type: string
          protein: number
          updated_at?: string | null
        }
        Update: {
          calories?: number
          carbs?: number
          created_at?: string | null
          daily_plan_id?: string
          fat?: number
          id?: string
          meal_time?: string
          meal_type?: string
          protein?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "meals_daily_plan_id_fkey"
            columns: ["daily_plan_id"]
            isOneToOne: false
            referencedRelation: "daily_meal_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      nutrition_logs: {
        Row: {
          calories: number
          carbs_grams: number
          created_at: string | null
          fat_grams: number
          food_name: string
          id: string
          meal_date: string
          meal_type: string
          protein_grams: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          calories: number
          carbs_grams: number
          created_at?: string | null
          fat_grams: number
          food_name: string
          id?: string
          meal_date?: string
          meal_type: string
          protein_grams: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          calories?: number
          carbs_grams?: number
          created_at?: string | null
          fat_grams?: number
          food_name?: string
          id?: string
          meal_date?: string
          meal_type?: string
          protein_grams?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      nutrition_plans: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: string
          nutrition_goal: Database["public"]["Enums"]["nutrition_goal_type"]
          start_date: string
          status: string
          target_weight: number
          updated_at: string | null
          user_id: string
          weekly_goal: number
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          nutrition_goal: Database["public"]["Enums"]["nutrition_goal_type"]
          start_date?: string
          status?: string
          target_weight: number
          updated_at?: string | null
          user_id: string
          weekly_goal: number
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: string
          nutrition_goal?: Database["public"]["Enums"]["nutrition_goal_type"]
          start_date?: string
          status?: string
          target_weight?: number
          updated_at?: string | null
          user_id?: string
          weekly_goal?: number
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string | null
          id: string
          metric_type: string
          metric_unit: string
          metric_value: number
          notes: string | null
          recorded_date: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          metric_type: string
          metric_unit: string
          metric_value: number
          notes?: string | null
          recorded_date?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          metric_type?: string
          metric_unit?: string
          metric_value?: number
          notes?: string | null
          recorded_date?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          full_name: string | null
          id: string
          preferences: Json | null
          social_links: Json | null
          updated_at: string | null
          user_id: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          preferences?: Json | null
          social_links?: Json | null
          updated_at?: string | null
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      progress_tracking: {
        Row: {
          body_fat_percentage: number | null
          created_at: string | null
          id: string
          muscle_mass: number | null
          notes: string | null
          tracking_date: string
          updated_at: string | null
          user_id: string | null
          weight: number | null
        }
        Insert: {
          body_fat_percentage?: number | null
          created_at?: string | null
          id?: string
          muscle_mass?: number | null
          notes?: string | null
          tracking_date?: string
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Update: {
          body_fat_percentage?: number | null
          created_at?: string | null
          id?: string
          muscle_mass?: number | null
          notes?: string | null
          tracking_date?: string
          updated_at?: string | null
          user_id?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: Database["public"]["Enums"]["subscription_status"] | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: Database["public"]["Enums"]["subscription_status"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_credits: {
        Row: {
          created_at: string | null
          credits_remaining: number
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          credits_remaining?: number
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          credits_remaining?: number
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      water_intake_records: {
        Row: {
          activity_level: string
          climate: string
          created_at: string | null
          id: string
          recommended_intake: number
          updated_at: string | null
          user_id: string
          weight: number
        }
        Insert: {
          activity_level: string
          climate: string
          created_at?: string | null
          id?: string
          recommended_intake: number
          updated_at?: string | null
          user_id: string
          weight: number
        }
        Update: {
          activity_level?: string
          climate?: string
          created_at?: string | null
          id?: string
          recommended_intake?: number
          updated_at?: string | null
          user_id?: string
          weight?: number
        }
        Relationships: []
      }
      workout_routines: {
        Row: {
          created_at: string | null
          description: string | null
          google_calendar_enabled: boolean | null
          google_calendar_sync: boolean | null
          google_refresh_token: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          google_calendar_enabled?: boolean | null
          google_calendar_sync?: boolean | null
          google_refresh_token?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          google_calendar_enabled?: boolean | null
          google_calendar_sync?: boolean | null
          google_refresh_token?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      workout_schedule: {
        Row: {
          created_at: string | null
          day_of_week: number
          duration_minutes: number
          exercise_name: string
          exercise_type: Database["public"]["Enums"]["workout_type"]
          google_event_id: string | null
          id: string
          notes: string | null
          routine_id: string
          start_time: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          day_of_week: number
          duration_minutes: number
          exercise_name: string
          exercise_type: Database["public"]["Enums"]["workout_type"]
          google_event_id?: string | null
          id?: string
          notes?: string | null
          routine_id: string
          start_time: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          day_of_week?: number
          duration_minutes?: number
          exercise_name?: string
          exercise_type?: Database["public"]["Enums"]["workout_type"]
          google_event_id?: string | null
          id?: string
          notes?: string | null
          routine_id?: string
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workout_schedule_routine_id_fkey"
            columns: ["routine_id"]
            isOneToOne: false
            referencedRelation: "workout_routines"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      activity_level:
        | "sedentary"
        | "lightly_active"
        | "moderately_active"
        | "very_active"
        | "extremely_active"
      dietary_preference:
        | "vegetarian"
        | "vegan"
        | "non-vegetarian"
        | "pescatarian"
      fitness_goal: "weight_loss" | "muscle_gain" | "maintenance"
      food_category: "protein" | "carb" | "fat" | "vegetable"
      nutrition_goal_type:
        | "weight_loss"
        | "muscle_gain"
        | "maintenance"
        | "general_health"
      subscription_status: "active" | "unsubscribed"
      workout_type:
        | "cardio"
        | "strength"
        | "yoga"
        | "flexibility"
        | "hiit"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
