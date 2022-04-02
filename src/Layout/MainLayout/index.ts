import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { deleteCartAction } from '../../actions/cartAction';
import MainLayout from './MainLayout';

const mapStateToProps = (store: RootState) => ({
  cartCount: store.cart.reduce((p, c) => c.quantity + p, 0),
  totalPrice: store.cart.reduce((p, c) => {
    const productData: ProductsType | undefined = store.products.find(
      (x) => x.id === c.productId,
    );
    if (productData) {
      return p + c.quantity * productData.price;
    }
    return p + 0;
  }, 0),
  cart: store.cart,
  products: store.products,
  errors: store.errors,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deleteCartItem: (cartItem: CartType) => deleteCartAction(cartItem)(dispatch),
  clearError: (index: number) => {
    dispatch({ type: 'CLEAR_ERROR', payload: { index } });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
