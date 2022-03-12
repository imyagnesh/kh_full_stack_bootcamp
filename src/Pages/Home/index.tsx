import React, { useCallback, useEffect, useState } from 'react';
import Product from '../../components/Product';
import ThemeContext from '../../context/themeContext';

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  console.log(products);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.title}</div>
      ))}
    </div>
  );
};

export default Home;
