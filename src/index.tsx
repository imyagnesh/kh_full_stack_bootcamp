import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import { AuthProvider } from './context/authContext';
import { LoadingProvider } from './context/loadingProvider';
import { ThemeProvider } from './context/themeContext';
import rootReducer from './reducers';
import './style.css';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// React component rules
// 1. First Letter should always capital
// 2. can return only single element from component
// 3. apply style as object with camelCase properties
// 4. instead of class use classname to apply style

// 1. Props are immutable

// const color = 'white';
// Function Component

// const App = ({ title, caption }: AppProps) => (
//   <>
//     <h1
//       style={{
//         color,
//         backgroundColor: 'red',
//       }}
//     >
//       {title}
//     </h1>
//     <h2 className="heading">{caption}</h2>
//     <input type="checkbox" />
//   </>
// );

// Class Component

// state is mutable
// change state value have to use this.setState

// life cycle methods

// 4 stages of life cycle methods

// 1. Mounting

// Constructor
// getDerivedStateFromProps

// 2. Updating

// 3. Unmounting

// 4. Error

// App.getDerivedStateFromProps = (props, state) => {
//   console.log('getDerivedStateFromProps');
//   return {
//     greet: `Hello, ${state.name}`,
//   };
// };
