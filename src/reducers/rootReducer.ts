import cartReducer, { CartActionType } from './cartReducer';
import errorReducer, { ErrorActionType, ErrorStateType } from './errorReducer';
import loadingReducer, {
  LoadingActionType,
  LoadingStateType,
} from './loadingReducer';
import { ProductsActionType, productsReducer } from './productsReducer';

export type RootStateType = {
  products: ProductsType[];
  loading: LoadingStateType[];
  error: ErrorStateType[];
  cart: CartType[];
};

export type RootActionType =
  | ProductsActionType
  | LoadingActionType
  | ErrorActionType
  | CartActionType;

export const rootInitValues = {
  products: [],
  loading: [],
  error: [],
  cart: [],
};

const rootReducer = (state: RootStateType, action: RootActionType) => ({
  products: productsReducer(state.products, action as ProductsActionType),
  loading: loadingReducer(state.loading, action as LoadingActionType),
  error: errorReducer(state.error, action as ErrorActionType),
  cart: cartReducer(state.cart, action as CartActionType),
});

export default rootReducer;
