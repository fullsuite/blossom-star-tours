import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project's details
const supabaseUrl = 'https://ljuyclibiueedqmdompu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqdXljbGliaXVlZWRxbWRvbXB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg4NjYxMjYsImV4cCI6MjA0NDQ0MjEyNn0.2W8ZLGgdN_4y_RYnxg1MIJDSMJKCHxBC8iPIE8Ik3QQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);