// src/contexts/ApiKeyContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSyncUser } from '../integrations/supabase/auth';
import { useUser } from '@clerk/clerk-react';

interface ApiKeyContextValue {
  apiKey: string | null;
  loading: boolean;
  error: Error | null;
}

const ApiKeyContext = createContext<ApiKeyContextValue>({
  apiKey: null,
  loading: true,
  error: null,
});

export const ApiKeyProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn } = useUser();
  const { getOrCreateApiKey } = useSyncUser();
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!isSignedIn) {
      setApiKey(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    getOrCreateApiKey()
      .then((key) => {
        if (!cancelled) {
          setApiKey(key);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, getOrCreateApiKey]);

  return (
    <ApiKeyContext.Provider value={{ apiKey, loading, error }}>
      {children}
    </ApiKeyContext.Provider>
  );
};

export const useApiKey = () => useContext(ApiKeyContext);
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
