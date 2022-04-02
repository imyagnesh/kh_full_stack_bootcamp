import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { loadCartAction } from '../../actions/cartAction';
import { LoadProductsAction } from '../../actions/productsAction';
import Home from './Home';

const mapStateToProps = (store: RootState) => ({
  products: store.products,
  productsLoading: store.loading.find((x) => x.actionType === 'LOAD_PRODUCTS'),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadProducts: () => LoadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
