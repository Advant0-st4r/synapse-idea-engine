// src/integrations/supabase/auth.ts
import { supabase } from './client';
import { useUser } from '@clerk/clerk-react';
import { useCallback } from 'react';

/**
 * Hook that gives you helpers to:
 * 1. Upsert the Clerk user into Supabase.
 * 2. Retrieve or generate an API key for the user.
 */
export const useSyncUser = () => {
  const { user, isSignedIn } = useUser();

  /** Upsert Clerk user → Supabase `users` table */
  const syncUser = useCallback(async () => {
    if (!isSignedIn || !user) return null;

    const payload = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress ?? '',
      full_name: user.fullName ?? null,
    };

    const { data, error } = await supabase
      .from('users')
      .upsert(payload, { onConflict: 'id' })
      .select()
      .single();

    if (error) {
      console.error('Supabase user sync error:', error);
      throw error;
    }
    return data;
  }, [user, isSignedIn]);

  /** Get existing key or create a new one */
  const getOrCreateApiKey = useCallback(async (): Promise<string | null> => {
    if (!isSignedIn || !user) return null;

    // Ensure the user row exists first
    await syncUser();

    // Look for an existing key
    const { data: existing, error: fetchErr } = await supabase
      .from('api_keys')
      .select('key')
      .eq('user_id', user.id)
      .single();

    if (existing) return existing.key;
    if (fetchErr && fetchErr.code !== 'PGRST116') {
      // PGRST116 = no row found, otherwise real error
      console.error('Error fetching API key:', fetchErr);
      throw fetchErr;
    }

    // ---- Generate a new key (simple client-side for demo) ----
    // In production you would do this on a secure backend.
    const newKey = `sk-${crypto.randomUUID()}`;

    const { error: insertErr } = await supabase
      .from('api_keys')
      .insert({ user_id: user.id, key: newKey });

    if (insertErr) {
      console.error('Error creating API key:', insertErr);
      throw insertErr;
    }

    return newKey;
  }, [user, isSignedIn, syncUser]);

  return { syncUser, getOrCreateApiKey };
};
