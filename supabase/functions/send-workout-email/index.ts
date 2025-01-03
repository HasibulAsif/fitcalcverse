import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface WorkoutSchedule {
  [key: string]: {
    id: string;
    exercises: Array<{
      id: string;
      name: string;
      type: string;
      duration: number;
      startTime?: string;
      notes?: string;
    }>;
  };
}

interface EmailRequest {
  to: string[];
  subject: string;
  workoutSchedule: WorkoutSchedule;
  userId: string;
}

const generateEmailContent = (schedule: WorkoutSchedule): string => {
  let content = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; }
          .day { margin-bottom: 20px; }
          .exercise { margin-left: 20px; }
          h2 { color: #333; }
          .type { color: #666; }
        </style>
      </head>
      <body>
        <h1>Your Weekly Workout Schedule</h1>
  `;

  Object.entries(schedule).forEach(([day, data]) => {
    if (data.exercises.length > 0) {
      content += `<div class="day">
        <h2>${day}</h2>`;
      
      data.exercises.forEach(exercise => {
        content += `
          <div class="exercise">
            <p><strong>${exercise.name}</strong></p>
            <p class="type">Type: ${exercise.type}</p>
            <p>Duration: ${exercise.duration} minutes</p>
            ${exercise.startTime ? `<p>Start Time: ${exercise.startTime}</p>` : ''}
            ${exercise.notes ? `<p>Notes: ${exercise.notes}</p>` : ''}
          </div>
        `;
      });

      content += `</div>`;
    }
  });

  content += `
      </body>
    </html>
  `;

  return content;
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);
    const emailRequest: EmailRequest = await req.json();
    
    // Generate HTML content from the workout schedule
    const htmlContent = generateEmailContent(emailRequest.workoutSchedule);

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Workout Planner <onboarding@resend.dev>",
        to: emailRequest.to,
        subject: emailRequest.subject,
        html: htmlContent,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("Email sent successfully:", data);

      // Save the email template
      const { error: templateError } = await supabase
        .from('workout_email_templates')
        .insert([
          {
            user_id: emailRequest.userId,
            template_name: 'Weekly Workout Schedule',
            subject: emailRequest.subject,
            html_content: htmlContent
          }
        ]);

      if (templateError) {
        console.error("Error saving email template:", templateError);
      }

      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const error = await res.text();
      return new Response(JSON.stringify({ error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error: any) {
    console.error("Error in send-workout-email function:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
};

serve(handler);