export type ProductsReducerStoreType = {
  products: ProductsType[];
  loading: boolean;
  error?: Error;
};

type LoadProductsRequestActionType = {
  type: 'LOAD_PRODUCTS_REQUEST';
  payload?: never;
};

type LoadProductsSuccessActionType = {
  type: 'LOAD_PRODUCTS_SUCCESS';
  payload: ProductsType[];
};

type LoadProductsFailActionType = {
  type: 'LOAD_PRODUCTS_FAIL';
  payload: Error;
};

type ProductsActionType =
  | LoadProductsRequestActionType
  | LoadProductsSuccessActionType
  | LoadProductsFailActionType;

export const productsReducerInitValue = {
  products: [],
  loading: false,
  error: undefined,
};

export const productsReducer = (
  state: ProductsReducerStoreType,
  { type, payload }: ProductsActionType,
) => {
  switch (type) {
    case 'LOAD_PRODUCTS_REQUEST':
      return { ...state, loading: true };

    case 'LOAD_PRODUCTS_SUCCESS':
      return { ...state, products: payload, loading: false };

    case 'LOAD_PRODUCTS_FAIL':
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};
