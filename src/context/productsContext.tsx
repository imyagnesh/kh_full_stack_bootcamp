import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import axiosInstance from '../utils';

type ProductContextType = {
  products: ProductsType[];
  loadProducts: () => Promise<void>;
};

const ProductsContext = createContext<ProductContextType>(
  {} as ProductContextType,
);

export const ProductsProvider: FC = ({ children }) => {
  const [products, setProducts] = useState<ProductsType[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const res = await axiosInstance.get<ProductsType[]>('660/products');
      setProducts(res.data);
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);
