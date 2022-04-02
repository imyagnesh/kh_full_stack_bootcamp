import {
  ActionType,
  ADD_TO_CART,
  DELETE_CART,
  FAIL,
  LOAD_CART,
  LOAD_PRODUCTS,
  UPDATE_CART,
} from './actionsTypes';

export type ErrorStateType = {
  actionType: ActionType;
  error: Error;
  loadingId?: number;
  message?: string;
};

type WithoutIDActionType = {
  type: `${LOAD_PRODUCTS}_${FAIL}` | `${LOAD_CART}_${FAIL}`;
  payload: {
    loadingId?: never;
    error: Error;
    message?: string;
    index?: never;
  };
};

type WithIDActionType = {
  type:
    | `${ADD_TO_CART}_${FAIL}`
    | `${UPDATE_CART}_${FAIL}`
    | `${DELETE_CART}_${FAIL}`;
  payload: {
    loadingId: number;
    error: Error;
    message?: string;
    index?: never;
  };
};

type ClearActionType = {
  type: 'CLEAR_ERROR';
  payload: {
    loadingId?: never;
    error?: never;
    message?: never;
    index: number;
  };
};

export type ErrorActionType =
  | WithoutIDActionType
  | WithIDActionType
  | ClearActionType;

const errorReducer = (
  state: ErrorStateType[] = [],
  { type, payload }: ErrorActionType,
) => {
  if (type === 'CLEAR_ERROR') {
    return [
      ...state.slice(0, payload.index),
      ...state.slice(payload.index + 1),
    ];
  }

  const matches = /(.*)_(REQUEST|FAIL)/.exec(type);
  if (!matches) {
    return state;
  }
  const [, actionType, actionState] = matches;
  if (actionState === 'FAIL') {
    return [
      ...state,
      { actionType: actionType as ActionType, ...(payload || {}) },
    ];
  }
  return state.filter(
    (x) => x.actionType !== actionType && x.loadingId !== payload.loadingId,
  );
};

export default errorReducer;
