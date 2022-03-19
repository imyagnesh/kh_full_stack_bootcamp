import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useReducer,
  useState,
} from 'react';
import {
  productsReducer,
  productsReducerInitValue,
  ProductsReducerStoreType,
} from '../reducers/productsReducer';
import axiosInstance from '../utils';

type ProductContextType = {
  loadProducts: () => Promise<void>;
} & ProductsReducerStoreType;

const ProductsContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

export const ProductsProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(
    productsReducer,
    productsReducerInitValue,
  );

  const loadProducts = useCallback(async () => {
    try {
      dispatch({ type: 'LOAD_PRODUCTS_REQUEST' });
      const res = await axiosInstance.get<ProductsType[]>('660/products');
      dispatch({ type: 'LOAD_PRODUCTS_SUCCESS', payload: res.data });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'LOAD_PRODUCTS_FAIL',
        payload: new Error(errorMessage),
      });
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
