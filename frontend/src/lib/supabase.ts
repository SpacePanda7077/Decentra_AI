import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const hackathon_supabaseUrl = process.env.HACKATHON_PUBLIC_SUPABASE_URL!;
const hackathon_supabaseKey = process.env.HACKATHON_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export const hackathon_supabase = createClient(
  "https://xzedwlnzjpdykwyvsiac.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6ZWR3bG56anBkeWt3eXZzaWFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjY2ODAsImV4cCI6MjA3NzQwMjY4MH0.YmRe-FYF6EE78wjYPMuBDCzj7Enf7gGR4upKX51OeHo"
);
