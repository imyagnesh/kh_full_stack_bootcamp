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

type CartContextType = {
  cart: CartType[];
  loading: LoadingStateType[];
  error: ErrorStateType[];
  loadCart: () => Promise<void>;
  addToCart: (cartItem: Omit<CartType, 'id'>) => Promise<void>;
  updateToCart: (cartItem: CartType) => Promise<void>;
  deleteCartItem: (cartItem: CartType) => Promise<void>;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, rootInitValues);

  const loadCart = useCallback(async () => {
    try {
      dispatch({
        type: 'LOAD_CART_REQUEST',
        payload: {
          message: 'Loading Cart',
        },
      });
      const res = await axiosInstance.get<CartType[]>('660/cart');
      dispatch({ type: 'LOAD_CART_SUCCESS', payload: res.data });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'LOAD_CART_FAIL',
        payload: {
          message: 'Loading Cart Failed',
          error: new Error(errorMessage),
        },
      });
    }
  }, []);

  const addToCart = useCallback(async (cartItem: Omit<CartType, 'id'>) => {
    try {
      dispatch({
        type: 'ADD_TO_CART_REQUEST',
        payload: {
          loadingId: cartItem.productId,
          message: 'Adding Item to cart',
        },
      });
      const res = await axiosInstance.post<CartType>('660/cart', cartItem);
      dispatch({
        type: 'ADD_TO_CART_SUCCESS',
        payload: { ...res.data, loadingId: cartItem.productId },
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'ADD_TO_CART_FAIL',
        payload: {
          loadingId: cartItem.productId,
          error: new Error(errorMessage),
          message: errorMessage,
        },
      });
    }
  }, []);

  const updateToCart = useCallback(async (cartItem: CartType) => {
    try {
      dispatch({
        type: 'UPDATE_CART_REQUEST',
        payload: {
          loadingId: cartItem.productId,
          message: 'Updating Cart',
        },
      });
      const res = await axiosInstance.put<CartType>(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch({
        type: 'UPDATE_CART_SUCCESS',
        payload: { ...res.data, loadingId: cartItem.productId },
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'UPDATE_CART_FAIL',
        payload: {
          loadingId: cartItem.productId,
          error: new Error(errorMessage),
          message: errorMessage,
        },
      });
    }
  }, []);

  const deleteCartItem = useCallback(async (cartItem: CartType) => {
    try {
      dispatch({
        type: 'DELETE_CART_REQUEST',
        payload: {
          loadingId: cartItem.productId,
          message: 'Deleting Cart',
        },
      });
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      dispatch({
        type: 'DELETE_CART_SUCCESS',
        payload: { ...cartItem, loadingId: cartItem.productId },
      });
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: 'DELETE_CART_FAIL',
        payload: {
          loadingId: cartItem.productId,
          error: new Error(errorMessage),
          message: errorMessage,
        },
      });
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        loading: state.loading,
        error: state.error,
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
