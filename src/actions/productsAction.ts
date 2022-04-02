import { AppDispatch } from '..';
import { ErrorActionType } from '../reducers/errorReducer';
import { LoadingActionType } from '../reducers/loadingReducer';
import { ProductsActionType } from '../reducers/productsReducer';
import axiosInstance from '../utils';

const LoadProductsRequest = (): LoadingActionType => ({
  type: 'LOAD_PRODUCTS_REQUEST',
  payload: {
    message: 'Loading Products',
  },
});

const LoadProductsSuccess = (payload: ProductsType[]): ProductsActionType => ({
  type: 'LOAD_PRODUCTS_SUCCESS',
  payload,
});

const LoadProductsFail = (errorMessage: string): ErrorActionType => ({
  type: 'LOAD_PRODUCTS_FAIL',
  payload: {
    message: 'Loading Products Failed',
    error: new Error(errorMessage),
  },
});

export const LoadProductsAction = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(LoadProductsRequest());
    const res = await axiosInstance.get<ProductsType[]>('660/products');
    dispatch(LoadProductsSuccess(res.data));
  } catch (error) {
    let errorMessage = 'Something went wrong. Try after sometime';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    dispatch(LoadProductsFail(errorMessage));
  }
};

export const a = 1;
