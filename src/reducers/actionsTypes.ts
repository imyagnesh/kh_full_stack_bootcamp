export type LOAD_PRODUCTS = 'LOAD_PRODUCTS';
export type LOAD_CART = 'LOAD_CART';
export type ADD_TO_CART = 'ADD_TO_CART';
export type UPDATE_CART = 'UPDATE_CART';
export type DELETE_CART = 'DELETE_CART';

export type REQUEST = 'REQUEST';
export type SUCCESS = 'SUCCESS';
export type FAIL = 'FAIL';

export type ActionType =
  | LOAD_PRODUCTS
  | LOAD_CART
  | ADD_TO_CART
  | UPDATE_CART
  | DELETE_CART;
