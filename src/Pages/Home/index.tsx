import React, { useCallback, useEffect, useState } from 'react';
import Product from '../../components/Product';
import Rating from '../../components/Rating';
import { useCart } from '../../context/cartContext';
import { useProducts } from '../../context/productsContext';
import axiosInstance from '../../utils';

type Props = {};

const Home = (props: Props) => {
  const { products, loadProducts } = useProducts();
  const { cart, loadCart, addToCart, updateToCart, deleteCartItem } = useCart();
  // Component Did Mount
  // as soon a component available in dom use Effect callback will call
  useEffect(() => {
    Promise.all([loadProducts(), loadCart()]);
  }, [loadProducts, loadCart]);

  return (
    <div className="max-w-5xl mx-auto">
      {products.map((product) => {
        const cartItem = cart.find((x) => x.productId === product.id);
        return (
          <Product
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
