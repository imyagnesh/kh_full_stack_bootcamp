import React, { Component, createRef } from 'react';
import classnames from 'classnames';
import './todo.css';

type TodoItem = {
  id: number;
  text: string;
  isCompleted: boolean;
};

type Props = {};

type State = {
  todoList: TodoItem[];
};

class Todo extends Component<Props, State> {
  state = {
    todoList: [] as TodoItem[],
  };

  inputRef = createRef<HTMLInputElement>();

  handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // O(N)
    // const todoText = (document.getElementById('txtTodo') as HTMLInputElement).value;

    // O(1)
    const todoText = this.inputRef.current?.value;

    if (todoText) {
      this.setState(({ todoList }) => ({
        todoList: [
          ...todoList,
          { text: todoText, id: new Date().valueOf(), isCompleted: false },
        ],
      }));
    }
  };

  toggleCompleted = (todoItem: TodoItem) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.map((item) => {
        if (item.id === todoItem.id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      }),
    }));
  };

  handleDelete = (todoItem: TodoItem) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.filter((item) => item.id !== todoItem.id),
    }));
  };

  render() {
    console.log('app render');

    const { todoList } = this.state;
    return (
      <div className="flex flex-col items-center">
        <h1 className="heading1 text-center">Todo App</h1>
        <form className="flex max-w-3xl my-4" onSubmit={this.handleAddTodo}>
          <input type="text" id="txtTodo" ref={this.inputRef} />
          <button
            type="submit"
            className="btn min-w-[100px] rounded-none rounded-r"
          >
            Add Todo
          </button>
        </form>
        <div className="w-full">
          {todoList.map((todoItem) => (
            <div className="flex items-center m-2" key={todoItem.id}>
              <input
                type="checkbox"
                checked={todoItem.isCompleted}
                onChange={() => this.toggleCompleted(todoItem)}
              />
              <p
                className={classnames('flex-1 mx-3', {
                  'line-through': todoItem.isCompleted,
                })}
              >
                {todoItem.text}
              </p>
              <button
                type="button"
                onClick={() => this.handleDelete(todoItem)}
                className="btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Todo;
