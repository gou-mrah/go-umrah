import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewmenfmcblascndlaout.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3bWVuZm1jYmxhc2NuZGxhb3V0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NzI1MzksImV4cCI6MjA2NjE0ODUzOX0.cO9iqUZK-uH6IrhuuH12mHonxYa3rSxKdbqutWaViv8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);