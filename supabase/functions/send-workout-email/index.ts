import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const { to, subject, workoutSchedule, userId } = await req.json();

    // Format the workout schedule into HTML
    const scheduleHtml = Object.entries(workoutSchedule)
      .map(([day, schedule]: [string, any]) => {
        const exercises = schedule.exercises
          .map(
            (exercise: any) =>
              `<li>${exercise.name} - ${exercise.duration} minutes (${exercise.type})</li>`
          )
          .join("");
        return `
          <h3>${day}</h3>
          ${
            exercises
              ? `<ul>${exercises}</ul>`
              : "<p>No exercises scheduled</p>"
          }
        `;
      })
      .join("");

    const html = `
      <h2>Your Workout Schedule</h2>
      ${scheduleHtml}
      <p>Happy training!</p>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Workout Planner <onboarding@resend.dev>",
        to,
        subject,
        html,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});