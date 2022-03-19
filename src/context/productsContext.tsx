import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import { ErrorStateType } from '../reducers/errorReducer';
import { LoadingStateType } from '../reducers/loadingReducer';

import rootReducer, { rootInitValues } from '../reducers/rootReducer';
import axiosInstance from '../utils';

type ProductContextType = {
  loadProducts: () => Promise<void>;
  loading: LoadingStateType[];
  products: ProductsType[];
  error: ErrorStateType[];
};

const ProductsContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

export const ProductsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootInitValues);

  const loadProducts = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_PRODUCTS_REQUEST',
        payload: {
          message: 'Loading Products',
        },
      });
      const res = await axiosInstance.get<ProductsType[]>('660/products');
      dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: {
          error: new Error(errorMessage),
          message: 'Loading Products Failed',
        },
      });
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products: state.products,
        loading: state.loading,
        error: state.error,
        loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
