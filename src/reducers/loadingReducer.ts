import {
  ActionType,
  ADD_TO_CART,
  DELETE_CART,
  LOAD_CART,
  LOAD_PRODUCTS,
  REQUEST,
  UPDATE_CART,
} from './actionsTypes';

export type LoadingStateType = {
  actionType: ActionType;
  loadingId?: number;
  message?: string;
};

type WithoutIDRequestActionType = {
  type: `${LOAD_PRODUCTS}_${REQUEST}` | `${LOAD_CART}_${REQUEST}`;
  payload: {
    loadingId?: never;
    message?: string;
  };
};

type WithIDRequestActionType = {
  type:
    | `${ADD_TO_CART}_${REQUEST}`
    | `${UPDATE_CART}_${REQUEST}`
    | `${DELETE_CART}_${REQUEST}`;
  payload: {
    loadingId: number;
    message?: string;
  };
};

export type LoadingActionType =
  | WithoutIDRequestActionType
  | WithIDRequestActionType;

const loadingReducer = (
  state: LoadingStateType[] = [],
  { type, payload }: LoadingActionType,
) => {
  const matches = /(.*)_(REQUEST|SUCCESS|FAIL)/.exec(type);
  if (!matches) {
    return state;
  }
  const [, actionType, actionState] = matches;
  if (actionState === 'REQUEST') {
    return [
      ...state,
      { actionType: actionType as ActionType, ...(payload || {}) },
    ];
  }
  return state.filter(
    (x) => x.actionType !== actionType && x.loadingId !== payload.loadingId,
  );
};

export default loadingReducer;
