import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://gvazgvbsrhzxpcadfzcb.supabase.co";
export const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(SUPABASE_URL, supabaseKey);

export const origin = "http://localhost:3000/"