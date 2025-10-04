// src/pages/Ideas.tsx
import { useEffect } from 'react';
import { useSyncUser } from '../integrations/supabase/auth';
import { useApiKey } from '../contexts/ApiKeyContext';
import IdeaForm from '../components/ideas/IdeaForm';
import IdeaCard from '../components/ideas/IdeaCard';
import { supabase } from '../integrations/supabase/client';

export default function Ideas() {
  const { syncUser } = useSyncUser();
  const { apiKey, loading: keyLoading } = useApiKey();

  // Sync user on mount (runs only when signed in)
  useEffect(() => {
    syncUser();
  }, [syncUser]);

  // Example: fetch ideas belonging to the current user
  // (Replace with your actual data model)
  // const [ideas, setIdeas] = useState<any[]>([]);
  // useEffect(() => {
  //   if (!apiKey) return;
  //   supabase.from('ideas').select('*').eq('user_id', userId).then(...)
  // }, [apiKey]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Idea Engine</h1>
        {keyLoading ? (
          <p>Loading API key…</p>
        ) : (
          <p className="text-sm text-gray-600">
            Your API key: <code className="bg-gray-100 p-1 rounded">{apiKey}</code>
          </p>
        )}
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <IdeaForm />
        {/* Example placeholder for a list */}
        <div className="space-y-4">
          {/* Replace with real fetch loop */}
          <IdeaCard
            title="Sample Idea"
            description="This is a demo idea card."
            // other props...
          />
        </div>
      </section>
    </div>
  );
}
