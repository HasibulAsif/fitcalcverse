import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { profile, planType } = await req.json()

    // Get all available foods
    const { data: foods, error: foodsError } = await supabase
      .from('foods')
      .select('*')
    
    if (foodsError) throw foodsError

    // Helper function to calculate calories and macros
    const calculateNutrition = (meals: any[]) => {
      return meals.reduce((acc, meal) => ({
        calories: acc.calories + (meal.calories * meal.servings),
        protein: acc.protein + (meal.protein * meal.servings),
        carbs: acc.carbs + (meal.carbs * meal.servings),
        fat: acc.fat + (meal.fat * meal.servings),
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 })
    }

    // Generate a single day's meals
    const generateDayMeals = () => {
      const meals = {
        breakfast: foods.filter(f => f.category === 'protein' || f.category === 'carb').slice(0, 2),
        lunch: foods.filter(f => f.category === 'protein' || f.category === 'vegetable').slice(0, 2),
        dinner: foods.filter(f => f.category === 'protein' || f.category === 'carb' || f.category === 'vegetable').slice(0, 3),
        snacks: foods.filter(f => f.category === 'fat' || f.category === 'protein').slice(0, 2),
      }

      return meals
    }

    let response
    switch (planType) {
      case 'daily':
        const dailyMeals = generateDayMeals()
        response = {
          meals: dailyMeals,
          ...calculateNutrition(Object.values(dailyMeals).flat()),
        }
        break

      case 'weekly':
        const weeklyMeals = Array(7).fill(null).map((_, index) => ({
          date: new Date(Date.now() + index * 24 * 60 * 60 * 1000).toLocaleDateString(),
          meals: generateDayMeals(),
        }))

        response = {
          days: weeklyMeals.map(day => ({
            ...day,
            ...calculateNutrition(Object.values(day.meals).flat()),
          })),
          groceryList: {
            proteins: [...new Set(weeklyMeals.flatMap(day => 
              Object.values(day.meals).flat().filter(m => m.category === 'protein').map(m => m.name)
            ))],
            vegetables: [...new Set(weeklyMeals.flatMap(day => 
              Object.values(day.meals).flat().filter(m => m.category === 'vegetable').map(m => m.name)
            ))],
            carbs: [...new Set(weeklyMeals.flatMap(day => 
              Object.values(day.meals).flat().filter(m => m.category === 'carb').map(m => m.name)
            ))],
            fats: [...new Set(weeklyMeals.flatMap(day => 
              Object.values(day.meals).flat().filter(m => m.category === 'fat').map(m => m.name)
            ))],
          },
          weeklyTotals: weeklyMeals.reduce((acc, day) => {
            const dayTotals = calculateNutrition(Object.values(day.meals).flat())
            return {
              calories: acc.calories + dayTotals.calories,
              protein: acc.protein + dayTotals.protein,
              carbs: acc.carbs + dayTotals.carbs,
              fat: acc.fat + dayTotals.fat,
            }
          }, { calories: 0, protein: 0, carbs: 0, fat: 0 }),
        }
        break

      case 'monthly':
        const weeks = Array(4).fill(null).map((_, weekIndex) => {
          const weeklyPlan = Array(7).fill(null).map((_, dayIndex) => ({
            date: new Date(Date.now() + (weekIndex * 7 + dayIndex) * 24 * 60 * 60 * 1000).toLocaleDateString(),
            meals: generateDayMeals(),
          }))

          return {
            startDate: weeklyPlan[0].date,
            endDate: weeklyPlan[6].date,
            weeklyPlan: {
              days: weeklyPlan.map(day => ({
                ...day,
                ...calculateNutrition(Object.values(day.meals).flat()),
              })),
              groceryList: {
                proteins: [...new Set(weeklyPlan.flatMap(day => 
                  Object.values(day.meals).flat().filter(m => m.category === 'protein').map(m => m.name)
                ))],
                vegetables: [...new Set(weeklyPlan.flatMap(day => 
                  Object.values(day.meals).flat().filter(m => m.category === 'vegetable').map(m => m.name)
                ))],
                carbs: [...new Set(weeklyPlan.flatMap(day => 
                  Object.values(day.meals).flat().filter(m => m.category === 'carb').map(m => m.name)
                ))],
                fats: [...new Set(weeklyPlan.flatMap(day => 
                  Object.values(day.meals).flat().filter(m => m.category === 'fat').map(m => m.name)
                ))],
              },
            },
          }
        })

        response = {
          weeks,
          monthlyTotals: weeks.reduce((acc, week) => {
            const weekTotals = week.weeklyPlan.days.reduce((dayAcc, day) => {
              const dayTotals = calculateNutrition(Object.values(day.meals).flat())
              return {
                calories: dayAcc.calories + dayTotals.calories,
                protein: dayAcc.protein + dayTotals.protein,
                carbs: dayAcc.carbs + dayTotals.carbs,
                fat: dayAcc.fat + dayTotals.fat,
              }
            }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
            
            return {
              calories: acc.calories + weekTotals.calories,
              protein: acc.protein + weekTotals.protein,
              carbs: acc.carbs + weekTotals.carbs,
              fat: acc.fat + weekTotals.fat,
            }
          }, { calories: 0, protein: 0, carbs: 0, fat: 0 }),
          progressTracking: {
            weightGoal: profile.target_weight || 0,
            currentWeight: profile.current_weight || 0,
            calorieAdherence: 95, // This would be calculated based on logged meals
            macroBalance: {
              protein: 92,
              carbs: 88,
              fat: 90,
            },
          },
        }
        break

      default:
        throw new Error('Invalid plan type')
    }

    return new Response(
      JSON.stringify(response),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 },
    )
  }
})