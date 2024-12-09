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
