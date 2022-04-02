import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { deleteCartAction } from '../../actions/cartAction';
import ShoppingBag from './ShoppingBag';

const mapStateToProps = (store: RootState) => ({
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
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  deleteCartItem: (cartItem: CartType) => deleteCartAction(cartItem)(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingBag);
