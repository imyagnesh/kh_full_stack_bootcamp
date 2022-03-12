import React, {
  createContext,
  FC,
  useCallback,
  useContext,
  useState,
} from 'react';
import axiosInstance from '../utils';

type CartContextType = {
  cart: CartType[];
  loadCart: () => Promise<void>;
  addToCart: (cartItem: Omit<CartType, 'id'>) => Promise<void>;
  updateToCart: (cartItem: CartType) => Promise<void>;
  deleteCartItem: (cartItem: CartType) => Promise<void>;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: FC = ({ children }) => {
  const [cart, setCart] = useState<CartType[]>([]);

  const loadCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get<CartType[]>('660/cart');
      setCart(res.data);
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
    }
  }, []);

  const addToCart = useCallback(async (cartItem: Omit<CartType, 'id'>) => {
    try {
      const res = await axiosInstance.post<CartType>('660/cart', cartItem);
      setCart((val) => [...val, res.data]);
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
    }
  }, []);

  const updateToCart = useCallback(async (cartItem: CartType) => {
    try {
      const res = await axiosInstance.put<CartType>(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      setCart((val) => val.map((x) => (x.id === res.data.id ? res.data : x)));
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
    }
  }, []);

  const deleteCartItem = useCallback(async (cartItem: CartType) => {
    try {
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      setCart((val) => val.filter((x) => x.id !== cartItem.id));
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(error);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loadCart,
        addToCart,
        updateToCart,
        deleteCartItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
