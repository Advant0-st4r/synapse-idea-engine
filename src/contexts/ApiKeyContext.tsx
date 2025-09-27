import { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '../integrations/supabase/auth.ts'; // Adjust path

const ApiKeyContext = createContext<{ apiKey: string | null; setApiKey: (key: string) => void }>({
  apiKey: null,
  setApiKey: () => {},
});

export const ApiKeyProvider = ({ children }: { children: React.ReactNode }) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      // Fetch user-scoped API key from Supabase
      const fetchKey = async () => {
        const { data } = await supabase.from('api_keys').select('key').eq('user_id', user.id).single();
        setApiKey(data?.key || null);
      };
      fetchKey();
    }
  }, [user]);

  return <ApiKeyContext.Provider value={{ apiKey, setApiKey }}>{children}</ApiKeyContext.Provider>;
};

export const useApiKey = () => useContext(ApiKeyContext);
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};
