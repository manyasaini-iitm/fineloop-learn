// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ldmezupqaggvjtrcayxu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkbWV6dXBxYWdndmp0cmNheXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyNDAyNjcsImV4cCI6MjA1ODgxNjI2N30.lvwBDmDVL9jCvHZcekf896x5qk-6WRNZ3mHv0T4i_z0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);