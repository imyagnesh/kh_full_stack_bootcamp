import React, { useEffect, useMemo } from 'react';
import Product from '../../components/Product';
import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';

type Props = {};

const Home = (props: Props) => {
  const { products, loading: productsLoading, loadProducts } = useProducts();
  const {
    cart,
    loading: cartLoading,
    loadCart,
    addToCart,
    updateToCart,
    deleteCartItem,
  } = useCart();
  // Component Did Mount
  // as soon a component available in dom use Effect callback will call
  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  const loadProductsLoading = useMemo(
    () => productsLoading.find((x) => x.actionType === 'LOAD_PRODUCTS'),
    [productsLoading],
  );

  return (
    <div className="max-w-5xl mx-auto">
      {loadProductsLoading && (
        <div className="absolute h-screen inset-0 w-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
          <h1 className="text-4xl bg-white text-red-400 opacity-100 font-bold">
            {loadProductsLoading.message || 'Loading...'}
          </h1>
        </div>
      )}
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        const isAdding = cartLoading.some(
          (x) => x.actionType === 'ADD_TO_CART' && x.id === product.id,
        );
        const isUpdating = cartLoading.some(
          (x) => x.actionType === 'UPDATE_CART' && x.id === product.id,
        );

        const isDeleting = cartLoading.some(
          (x) => x.actionType === 'DELETE_CART' && x.id === product.id,
        );
        return (
          <Product
            key={product.id}
            data={product}
            isAdding={isAdding}
            isUpdating={isUpdating}
            isDeleting={isDeleting}
            addToCart={addToCart}
            updateToCart={updateToCart}
            deleteCartItem={deleteCartItem}
            cartItem={cartItem}
          />
        );
      })}
    </div>
  );
};

export default Home;
