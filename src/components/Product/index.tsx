import React from 'react';
import ThemeContext from '../../context/themeContext';

type Props = {};

const Product = (props: Props) => {
  console.log('Product');

  return (
    <div>
      <h1>Product</h1>
      <ThemeContext.Consumer>
        {({ theme }) => <h2>Current Theme: {theme}</h2>}
      </ThemeContext.Consumer>
    </div>
  );
};

export default Product;
