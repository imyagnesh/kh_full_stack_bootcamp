import React, { Component } from 'react';
import classnames from 'classnames';
import './todo.css';

type TodoItem = {
  id: number;
  text: string;
  isCompleted: boolean;
};

type Props = {};

type State = {
  todoText: string;
  todoList: TodoItem[];
};

class Todo extends Component<Props, State> {
  state = {
    todoText: '',
    todoList: [] as TodoItem[],
  };

  onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoText: e.target.value,
    });
  };

  handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(({ todoText, todoList }) => ({
      todoList: [
        ...todoList,
        { text: todoText, id: new Date().valueOf(), isCompleted: false },
      ],
      todoText: '',
    }));
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
    this.setState(({ todoList }, props) => {
      return {
        todoList: todoList.filter((item) => {
          return item.id !== todoItem.id;
        }),
      };
    });
  };

  render() {
    const { todoText, todoList } = this.state;
    return (
      <div className="flex flex-col items-center">
        <h1 className="heading1 text-center">Todo App</h1>
        <form className="flex max-w-3xl my-4" onSubmit={this.handleAddTodo}>
          <input type="text" value={todoText} onChange={this.onChangeText} />
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
