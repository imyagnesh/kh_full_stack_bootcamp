import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
// import App from './app';
import Todo from './Todo';
import './style.css';

ReactDOM.render(<StrictMode><Todo /></StrictMode>, document.getElementById('root'));

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
