import React, { createContext, useContext, useState, useEffect } from 'react';

interface ApiKeyContextType {
  openaiApiKey: string;
  anthropicApiKey: string;
  preferredModel: string;
  setOpenaiApiKey: (key: string) => void;
  setAnthropicApiKey: (key: string) => void;
  setPreferredModel: (model: string) => void;
  hasValidApiKey: () => boolean;
}

const ApiKeyContext = createContext<ApiKeyContextType | undefined>(undefined);

export const useApiKeys = () => {
  const context = useContext(ApiKeyContext);
  if (context === undefined) {
    throw new Error('useApiKeys must be used within an ApiKeyProvider');
  }
  return context;
};

export const ApiKeyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [openaiApiKey, setOpenaiApiKeyState] = useState('');
  const [anthropicApiKey, setAnthropicApiKeyState] = useState('');
  const [preferredModel, setPreferredModelState] = useState('gpt-4o');

  // Load from localStorage on mount (but don't persist - for session only)
  useEffect(() => {
    const saved = sessionStorage.getItem('synapseApiKeys');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setOpenaiApiKeyState(parsed.openaiApiKey || '');
        setAnthropicApiKeyState(parsed.anthropicApiKey || '');
        setPreferredModelState(parsed.preferredModel || 'gpt-4o');
      } catch (error) {
        console.error('Failed to parse saved API keys:', error);
      }
    }
  }, []);

  const setOpenaiApiKey = (key: string) => {
    setOpenaiApiKeyState(key);
    updateStorage({ openaiApiKey: key, anthropicApiKey, preferredModel });
  };

  const setAnthropicApiKey = (key: string) => {
    setAnthropicApiKeyState(key);
    updateStorage({ openaiApiKey, anthropicApiKey: key, preferredModel });
  };

  const setPreferredModel = (model: string) => {
    setPreferredModelState(model);
    updateStorage({ openaiApiKey, anthropicApiKey, preferredModel: model });
  };

  const updateStorage = (data: { openaiApiKey: string; anthropicApiKey: string; preferredModel: string }) => {
    sessionStorage.setItem('synapseApiKeys', JSON.stringify(data));
  };

  const hasValidApiKey = () => {
    if (preferredModel.startsWith('gpt-') || preferredModel.startsWith('o1-')) {
      return openaiApiKey.length > 0;
    }
    if (preferredModel.startsWith('claude-')) {
      return anthropicApiKey.length > 0;
    }
    return openaiApiKey.length > 0 || anthropicApiKey.length > 0;
  };

  return (
    <ApiKeyContext.Provider
      value={{
        openaiApiKey,
        anthropicApiKey,
        preferredModel,
        setOpenaiApiKey,
        setAnthropicApiKey,
        setPreferredModel,
        hasValidApiKey,
      }}
    >
      {children}
    </ApiKeyContext.Provider>
  );
};