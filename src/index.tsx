import * as React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// React component rules
// 1. First Letter should always capital
// 2. can return only single element from component
// 3. apply style as object with camelCase properties
// 4. instead of class use classname to apply style

const color = 'white';
// Function Component
const App = () => (
  <>
    <h1
      style={{
        color,
        backgroundColor: 'red',
      }}
    >
      Hello from react component
    </h1>
    <h2 className="heading">hello to check class</h2>
    <input />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
