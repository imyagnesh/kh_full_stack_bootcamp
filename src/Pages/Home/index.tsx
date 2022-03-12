import React, { useCallback, useEffect, useState } from 'react';
import Product from '../../components/Product';
import Rating from '../../components/Rating';

type Props = {};

const Home = (props: Props) => {
  const [products, setProducts] = useState<ProductsType[]>([]);

  const loadProducts = useCallback(async () => {
    try {
      const token = sessionStorage.getItem('@token');
      const headers = {} as HeadersInit & { Authorization: string };
      if (token) {
        // convert token to JSON object
        const jsonToken: AuthResponse = JSON.parse(token);
        headers.Authorization = `Bearer ${jsonToken.accessToken}`;
      }
      const res = await fetch('http://localhost:3000/660/products', {
        headers,
      });
      const json = await res.json();
      if (res.ok) {
        setProducts(json);
      } else {
        throw new Error(json);
      }
    } catch (error) {
      let errorMessage = 'Something Went wrong! Please try after sometime';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  }, []);

  // Component Did Mount
  // as soon a component available in dom use Effect callback will call
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="max-w-5xl mx-auto">
      {products.map((product) => (
        <Product data={product} />
      ))}
    </div>
  );
};

export default Home;
