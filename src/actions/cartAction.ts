import { AppDispatch } from '..';
import { CartActionType } from '../reducers/cartReducer';
import { ErrorActionType } from '../reducers/errorReducer';
import { LoadingActionType } from '../reducers/loadingReducer';
import axiosInstance from '../utils';

const loadCartRequest = (): LoadingActionType => ({
  type: 'LOAD_CART_REQUEST',
  payload: {
    message: 'Loading Cart',
  },
});

const loadCartSuccess = (payload: CartType[]): CartActionType => ({
  type: 'LOAD_CART_SUCCESS',
  payload,
});

const LoadProductsFail = (errorMessage: string): ErrorActionType => ({
  type: 'LOAD_CART_FAIL',
  payload: {
    message: 'Loading Cart Failed',
    error: new Error(errorMessage),
  },
});

export const loadCartAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadCartRequest());
    const res = await axiosInstance.get<CartType[]>('660/cart');
    dispatch(loadCartSuccess(res.data));
  } catch (error) {
    let errorMessage = 'Something went wrong. Try after sometime';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(LoadProductsFail(errorMessage));
  }
};

const addCartRequest = (loadingId: number): LoadingActionType => ({
  type: 'ADD_TO_CART_REQUEST',
  payload: {
    loadingId,
    message: 'Adding Item to cart',
  },
});

const addCartSuccess = (
  payload: CartType & { loadingId: number },
): CartActionType => ({
  type: 'ADD_TO_CART_SUCCESS',
  payload,
});

const addCartFail = (
  loadingId: number,
  errorMessage: string,
): ErrorActionType => ({
  type: 'ADD_TO_CART_FAIL',
  payload: {
    loadingId,
    error: new Error(errorMessage),
    message: errorMessage,
  },
});

export const addCartAction =
  (cartItem: Omit<CartType, 'id'>) => async (dispatch: AppDispatch) => {
    try {
      dispatch(addCartRequest(cartItem.productId));
      const res = await axiosInstance.post<CartType>('660/cart', cartItem);
      dispatch(addCartSuccess({ ...res.data, loadingId: cartItem.productId }));
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(addCartFail(cartItem.productId, errorMessage));
    }
  };

const updateCartRequest = (loadingId: number): LoadingActionType => ({
  type: 'UPDATE_CART_REQUEST',
  payload: {
    loadingId,
    message: 'Updating Cart',
  },
});

const updateCartSuccess = (
  payload: CartType & {
    loadingId: number;
  },
): CartActionType => ({
  type: 'UPDATE_CART_SUCCESS',
  payload,
});

const updateCartFail = (
  loadingId: number,
  errorMessage: string,
): ErrorActionType => ({
  type: 'UPDATE_CART_FAIL',
  payload: {
    loadingId,
    error: new Error(errorMessage),
    message: errorMessage,
  },
});

export const updateCartAction =
  (cartItem: CartType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(updateCartRequest(cartItem.productId));
      const res = await axiosInstance.put<CartType>(
        `660/cart/${cartItem.id}`,
        cartItem,
      );
      dispatch(
        updateCartSuccess({ ...res.data, loadingId: cartItem.productId }),
      );
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(updateCartFail(cartItem.productId, errorMessage));
    }
  };

const deleteCartRequest = (loadingId: number): LoadingActionType => ({
  type: 'DELETE_CART_REQUEST',
  payload: {
    loadingId,
    message: 'Deleting Cart',
  },
});

const deleteCartSuccess = (
  payload: CartType & {
    loadingId: number;
  },
): CartActionType => ({
  type: 'DELETE_CART_SUCCESS',
  payload,
});

const deleteCartFail = (
  loadingId: number,
  errorMessage: string,
): ErrorActionType => ({
  type: 'DELETE_CART_FAIL',
  payload: {
    loadingId,
    error: new Error(errorMessage),
    message: errorMessage,
  },
});

export const deleteCartAction =
  (cartItem: CartType) => async (dispatch: AppDispatch) => {
    try {
      dispatch(deleteCartRequest(cartItem.productId));
      await axiosInstance.delete(`660/cart/${cartItem.id}`);
      dispatch(
        deleteCartSuccess({ ...cartItem, loadingId: cartItem.productId }),
      );
    } catch (error) {
      let errorMessage = 'Something went wrong. Try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch(deleteCartFail(cartItem.productId, errorMessage));
    }
  };
