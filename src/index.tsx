import * as React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

// React component rules
// 1. First Letter should always capital
// 2. can return only single element from component
// 3. apply style as object with camelCase properties
// 4. instead of class use classname to apply style

// 1. Props are immutable

const color = 'white';
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

type AppProps = {};

type AppState = {
  counter: number;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  render(): React.ReactNode {
    console.log('Render');

    const { counter } = this.state;

    return (
      <>
        <button
          type="button"
          onClick={() => {
            // on set state method call render call again
            this.setState({
              counter: counter + 1,
            });
          }}
        >
          Increment
        </button>
        <h1>{counter}</h1>
        <button
          type="button"
          onClick={() => {
            this.setState({
              counter: counter - 1,
            });
          }}
        >
          Decrement
        </button>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
