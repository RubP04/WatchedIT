import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://puafblfzkugflvoukqav.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1YWZibGZ6a3VnZmx2b3VrcWF2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NDY1MzQsImV4cCI6MjA1MjIyMjUzNH0.QRvNXv2nAnKayiFduFhqfd-gew-NgZ6_0c3nYhQKqwM'; // Replace with your Supabase public anon key

export const supabase = createClient(supabaseUrl, supabaseKey);
