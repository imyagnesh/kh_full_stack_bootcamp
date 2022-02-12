import React, { PureComponent } from 'react';
import shallowCompare from 'react-addons-shallow-compare'; // ES6

type Props = {
  //   counter: number;
};

type State = {
  counter: number;
};

export default class Child2 extends PureComponent<Props, State> {
  state = {
    counter: 0,
  };

  //   shouldComponentUpdate(nextProps: Props, nextState: State) {
  //     return shallowCompare(this, nextProps, nextState);
  //   }

  mouseMove = () => {
    console.log('mouse move');
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.mouseMove);

    this.interval = setInterval(() => {
      console.log('interval');
    }, 1000);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.mouseMove);
    clearInterval(this.interval);
  }

  increment = () => {
    this.setState(({ counter }) => ({ counter: counter + 1 }));
  };

  render() {
    console.log('render child 2');
    const { counter } = this.state;

    if (counter > 5) {
      throw new Error('something went wrong...');
    }

    return (
      <div>
        <h2> hello from child 2 component</h2>
        <h3>{counter}</h3>
        <button type="button" onClick={this.increment}>
          Increment Counter
        </button>
      </div>
    );
  }
}
