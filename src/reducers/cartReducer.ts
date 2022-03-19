import {
  ADD_TO_CART,
  DELETE_CART,
  LOAD_CART,
  SUCCESS,
  UPDATE_CART,
} from './actionsTypes';

type LoadCartSuccessActionType = {
  type: `${LOAD_CART}_${SUCCESS}`;
  payload: CartType[];
};

type ModifySuccessActionType = {
  type:
    | `${ADD_TO_CART}_${SUCCESS}`
    | `${UPDATE_CART}_${SUCCESS}`
    | `${DELETE_CART}_${SUCCESS}`;
  payload: CartType;
};

export type CartActionType =
  | LoadCartSuccessActionType
  | ModifySuccessActionType;

const cartReducer = (state: CartType[], { type, payload }: CartActionType) => {
  switch (type) {
    case 'LOAD_CART_SUCCESS':
      return payload;

    case 'ADD_TO_CART_SUCCESS':
      return [...state, payload];

    case 'UPDATE_CART_SUCCESS':
      return state.map((x) => (x.id === payload.id ? payload : x));

    case 'DELETE_CART_SUCCESS':
      return state.filter((x) => x.id !== payload.id);

    default:
      return state;
  }
};

export default cartReducer;
