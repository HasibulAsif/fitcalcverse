import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string[];
  subject: string;
  workoutRoutine: any;
  userId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    const { to, subject, workoutRoutine, userId } = await req.json() as EmailRequest;

    // Generate HTML content from workout routine
    const htmlContent = `
      <h1>Your Workout Routine</h1>
      <p>Here's your workout schedule for the week:</p>
      ${Object.entries(workoutRoutine)
        .map(([day, exercises]: [string, any]) => `
          <h2>${day}</h2>
          <ul>
            ${exercises.exercises.map((exercise: any) => `
              <li>
                ${exercise.name} - ${exercise.duration} minutes
                ${exercise.notes ? `<br>Notes: ${exercise.notes}` : ''}
              </li>
            `).join('')}
          </ul>
        `).join('')}
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Workout Planner <workout@yourdomain.com>",
        to,
        subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);