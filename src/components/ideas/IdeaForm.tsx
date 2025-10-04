// src/components/ideas/IdeaForm.tsx
import { useState } from 'react';
import { supabase } from '../../integrations/supabase/client';
import { useUser } from '@clerk/clerk-react';

export default function IdeaForm() {
  const { user } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('ideas') // <-- create this table in Supabase if you need it
      .insert({
        user_id: user.id,
        title,
        description,
        created_at: new Date().toISOString(),
      });

    if (error) {
      setError(error.message);
    } else {
      setTitle('');
      setDescription('');
    }
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">New Idea</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        className="w-full p-2 border rounded"
      />

      {error && <p className="text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save Idea'}
      </button>
    </form>
  );
}
