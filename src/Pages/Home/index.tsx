import React, { useEffect } from 'react';
import Product from '../../components/Product';
import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';

type Props = {};

const Home = (props: Props) => {
  const { products, loading, loadProducts } = useProducts();
  const { cart, loadCart, addToCart, updateToCart, deleteCartItem } = useCart();
  // Component Did Mount
  // as soon a component available in dom use Effect callback will call
  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  return (
    <div className="max-w-5xl mx-auto">
      {loading && (
        <div className="absolute h-screen inset-0 w-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-10">
          <h1 className="text-4xl bg-white text-red-400 opacity-100 font-bold">
            Loading...
          </h1>
        </div>
      )}
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        return (
          <Product
            key={product.id}
            data={product}
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
