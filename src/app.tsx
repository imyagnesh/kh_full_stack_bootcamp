import React from 'react';
import Child1 from './Child1';
import Child2 from './Child2';

type AppProps = {
  name: string;
};

type AppState = {
  counter: number;
  name: string;
  greet: string;
};

// life cycle methods

// 4 stages of life cycle methods

// 1. Mounting

// Constructor (call only once)
// getDerivedStateFromProps
// render
// componentDidMount

// When Prop or state value change
// 2. Updating

// getDerivedStateFromProps
// shouldComponentUpdate (M IMP)
// render
// getSnapshotBeforeUpdate
// componentDidUpdate

// 3. Unmounting

// componentWillUnmount (MIMP)

// 4. Error

// getDerivedStateFromError
// componentDidCatch

class App extends React.Component<AppProps, AppState> {
  // Use Cases
  // 1. Define state value
  // 2. Base on props define state value
  // 3. Analytics
  constructor(props: AppProps) {
    // only once
    // only once
    console.log('constructor');

    super(props);

    // console.log(props);

    this.state = {
      counter: 0,
      name: props.name,
      // greet: `Hello, ${props.name}`,
    };

    // server call to send analytics information
  }

  // based on prop and old state value derive new state value
  // call everytime whenever state or prop value change
  static getDerivedStateFromProps(props, state) {
    console.log('getDerivedStateFromProps');

    return {
      greet: `Hello, ${state.name}`,
    };
  }

  // Manipulate dom element
  // register event handlers
  // on page load fetch data from database
  componentDidMount() {
    // call only once
    const heading = document.getElementById('heading');

    document.addEventListener('copy', () => {
      console.log('Copied');
    });

    if (heading) {
      heading.style = 'color: red';
    }
    // API Call
    // set state
    // console.log();
  }

  getSnapshotBeforeUpdate(prevProp, prevState) {
    return 10;
  }

  // manipulate dom element
  componentDidUpdate(prevProps: Props, prevState: State, snapshot) {
    console.log('Snapshot value', snapshot);
  }

  static getDerivedStateFromError(error) {
    return {
      error: true,
    };
  }

  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);

    // log server
  }

  increment = () => {
    this.setState(({ counter }) => ({
      counter: counter + 1,
    }));
  };

  decrement = () => {
    this.setState(({ counter }) => ({ counter: counter - 1 }));
  };

  changeName = () => {
    this.setState({ name: 'Artin' });
  };

  // When Prop value or state value change then and then component rerender
  render(): React.ReactNode {
    console.log('Render');

    const { counter, greet, error } = this.state;

    if (error) {
      return <h1>Oops! something went wrong..</h1>;
    }

    return (
      <>
        <button type="button" onClick={this.increment}>
          Increment
        </button>
        <h1 id="heading">{counter}</h1>
        <button type="button" onClick={this.decrement}>
          Decrement
        </button>
        <Child1 />
        {counter < 5 && <Child2 />}

        {counter < 5 && (
          <>
            <h1>{greet}</h1>
            <button type="button" onClick={this.changeName}>
              Change Name
            </button>
          </>
        )}
      </>
    );
  }
}

export default App;
