import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Resume = {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  education: any[];
  experience: any[];
  skills: string[];
  generated_resume: string;
  generated_cover_letter?: string;
  created_at: string;
  updated_at: string;
};
