import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../..';
import { loadCartAction } from '../../actions/cartAction';
import { LoadProductsAction } from '../../actions/productsAction';
import Product from '../../components/Product';
import { useCart } from '../../context/cartContext';
import { LoadingStateType } from '../../reducers/loadingReducer';

type Props = {
  products: ProductsType[];
  loadProducts: () => Promise<void>;
  loadCart: () => Promise<void>;
  productsLoading: LoadingStateType | undefined;
};

const Home = ({ products, loadProducts, productsLoading, loadCart }: Props) => {
  const {
    loading: cartLoading,
    addToCart,
    updateToCart,
    deleteCartItem,
  } = useCart();
  // Component Did Mount
  // as soon a component available in dom use Effect callback will call
  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  return (
    <div className="max-w-5xl mx-auto">
      {productsLoading && (
        <div className="absolute h-screen inset-0 w-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
          <h1 className="text-4xl bg-white text-red-400 opacity-100 font-bold">
            {productsLoading.message || 'Loading...'}
          </h1>
        </div>
      )}
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

const mapStateToProps = (store: RootState) => ({
  products: store.products,
  productsLoading: store.loading.find((x) => x.actionType === 'LOAD_PRODUCTS'),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  loadProducts: () => LoadProductsAction()(dispatch),
  loadCart: () => loadCartAction()(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
