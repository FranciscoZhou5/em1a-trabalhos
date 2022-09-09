import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

//@ts-ignore
export const supabase = createClient(supabaseUrl, supabaseKey);
