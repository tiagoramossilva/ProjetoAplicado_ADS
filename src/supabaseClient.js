// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gzoqhmadbqoifchfzuuc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6b3FobWFkYnFvaWZjaGZ6dXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4Nzg3NjksImV4cCI6MjA2MTQ1NDc2OX0.F3UqAwLTCUnFD8Jy8F9xqbn9a2ED1eH2ZY9wMdVWCvg';
export const supabase = createClient(supabaseUrl, supabaseKey);
