import React from 'react';
import Product from '../../components/Product';
import ThemeContext from '../../context/themeContext';

type Props = {};

const Home = (props: Props) => {
  console.log('Home Component');

  return (
    <div>
      <h1>Home</h1>
      <ThemeContext.Consumer>
        {({ theme, changeTheme }) => {
          console.log('Inner Section render');

          return (
            <div>
              <p>Current theme is {theme}</p>
              <button
                type="button"
                onClick={() =>
                  changeTheme(theme === 'light' ? 'dark' : 'light')
                }
              >
                Change Theme
              </button>
            </div>
          );
        }}
      </ThemeContext.Consumer>
      <Product />
    </div>
  );
};

export default Home;
