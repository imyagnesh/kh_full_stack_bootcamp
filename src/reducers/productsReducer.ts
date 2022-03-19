import { LOAD_PRODUCTS, SUCCESS } from './actionsTypes';

type LoadProductsSuccessActionType = {
  type: `${LOAD_PRODUCTS}_${SUCCESS}`;
  payload: ProductsType[];
};

export type ProductsActionType = LoadProductsSuccessActionType;

export const productsReducerInitValue = [];

export const productsReducer = (
  state: ProductsType[],
  { type, payload }: ProductsActionType,
) => {
  switch (type) {
    case 'LOAD_PRODUCTS_SUCCESS':
      return payload;

    default:
      return state;
  }
};
