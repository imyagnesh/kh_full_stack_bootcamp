import React, { Component } from 'react';
import './todo.css';

type Props = {};

type State = {
    todoText: string;
};

class Todo extends Component<Props, State> {
  state = {
    todoText: '',
  };

  onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: e.target.value,
    });
  };

  render() {
    const { todoText } = this.state;
    return (
      <div className="flex flex-col items-center">
        <h1 className="heading1 text-center">
          Todo App
        </h1>
        <form className="flex max-w-3xl my-4">
          <input type="text" className="input" value={todoText} onChange={this.onChangeText} />
          <button type="submit" className="btn min-w-[100px]">Add Todo</button>
        </form>
      </div>
    );
  }
}

export default Todo;
