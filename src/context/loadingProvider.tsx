import React, {
  createContext,
  FC,
  useMemo,
  useReducer,
  Dispatch,
  useContext,
} from 'react';
import { LoadingStateType } from '../reducers/loadingReducer';
import rootReducer, {
  RootActionType,
  rootInitValues,
} from '../reducers/rootReducer';

type LoadingContextType = {
  loading: LoadingStateType[];
  loadingDispatch: Dispatch<RootActionType>;
};

export const LoadingContext = createContext<LoadingContextType>(
  {} as LoadingContextType,
);

export const LoadingProvider: FC = ({ children }) => {
  const [{ loading }, loadingDispatch] = useReducer(
    rootReducer,
    rootInitValues,
  );

  const value = useMemo(
    () => ({ loading, loadingDispatch }),
    [loading, loadingDispatch],
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
