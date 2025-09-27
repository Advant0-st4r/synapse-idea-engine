import { createClient } from '@supabase/supabase-js';
import { useUser } from '@clerk/clerk-react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const syncClerkWithSupabase = async () => {
  const { user } = useUser();
  if (!user) return;

  const { data, error } = await supabase
    .from('users')
    .upsert({
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      full_name: user.fullName,
    });

  if (error) console.error('Supabase sync error:', error);
};