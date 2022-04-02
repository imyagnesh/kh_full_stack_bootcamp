import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import {
  addCartAction,
  deleteCartAction,
  updateCartAction,
} from '../../actions/cartAction';
import Product from './Product';

const mapStateToProps = (store: RootState, props: ProductsType) => ({
  cartItem: store.cart.find((x) => x.productId === props.id),
  isAdding: store.loading.some(
    (x) => x.actionType === 'ADD_TO_CART' && x.loadingId === props.id,
  ),
  isUpdating: store.loading.some(
    (x) => x.actionType === 'UPDATE_CART' && x.loadingId === props.id,
  ),
  isDeleting: store.loading.some(
    (x) => x.actionType === 'DELETE_CART' && x.loadingId === props.id,
  ),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  addToCart: (cartItem: Omit<CartType, 'id'>) =>
    addCartAction(cartItem)(dispatch),
  updateToCart: (cartItem: CartType) => updateCartAction(cartItem)(dispatch),
  deleteCartItem: (cartItem: CartType) => deleteCartAction(cartItem)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
