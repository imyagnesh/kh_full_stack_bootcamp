import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import Header from './Header';

const mapStateToProps = (store: RootState) => ({
  cartCount: store.cart.reduce((p, c) => p + c.quantity, 0),
});

export default connect(mapStateToProps)(Header);
