import React, {
  createContext,
  FC,
  useCallback,
  useMemo,
  useState,
} from 'react';

type LoadingType = {
  type: string;
  id?: number;
};

type LoadingContextType = {
  loading: LoadingType[];
};

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType,
);

export const LoadingProvider: FC = ({ children }) => {
  const [loading, setLoading] = useState<LoadingType[]>([]);

  const addLoader = useCallback((type, id) => {
    setLoading((val) => [...val, { type, id }]);
  }, []);

  const value = useMemo(() => ({ loading, addLoader }), [loading, addLoader]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
