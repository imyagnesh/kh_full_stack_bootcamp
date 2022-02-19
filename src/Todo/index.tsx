import React, { Component, createRef } from 'react';
import classnames from 'classnames';
import './todo.css';
import { FilterStatus, TodoItemType } from './Todo';
import TodoItem from './TodoItem';

type Props = {};

type State = {
  filterStatus: FilterStatus;
  todoList: TodoItemType[];
};

class Todo extends Component<Props, State> {
  state = {
    filterStatus: 'all',
    todoList: [],
  } as State;

  inputRef = createRef<HTMLInputElement>();

  async componentDidMount() {
    this.loadData('all');
  }

  loadData = async (filterStatus: FilterStatus) => {
    try {
      let url = 'http://localhost:3000/todoList';
      if (filterStatus !== 'all') {
        url = `${url}?isCompleted=${filterStatus === 'completed'}`;
      }
      const res = await fetch(url);
      const json = await res.json();
      this.setState({
        todoList: json,
        filterStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      // O(N)
      // const todoText = (document.getElementById('txtTodo') as HTMLInputElement).value;

      // O(1)
      const todoText = this.inputRef.current?.value;

      if (todoText) {
        const res = await fetch('http://localhost:3000/todoList', {
          method: 'POST',
          body: JSON.stringify({
            text: todoText,
            isCompleted: false,
            isEditing: false,
          }),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });
        const json = await res.json();

        this.setState(
          ({ todoList }) => ({
            todoList: [...todoList, json],
          }),
          () => {
            if (this.inputRef.current) {
              this.inputRef.current.value = '';
            }
          },
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  toggleCompleted = async (todoItem: TodoItemType) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: 'PUT',
        body: JSON.stringify(todoItem),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      const json = await res.json();

      this.setState(({ todoList }) => ({
        todoList: todoList.map((item) => {
          if (item.id === todoItem.id) {
            return json;
          }
          return item;
        }),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  handleDelete = async (todoItem: TodoItemType) => {
    try {
      const res = await fetch(`http://localhost:3000/todoList/${todoItem.id}`, {
        method: 'DELETE',
      });
      this.setState(({ todoList }) => ({
        todoList: todoList.filter((item) => item.id !== todoItem.id),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  toggleEdit = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.map((x) =>
        x.id === todoItem.id ? { ...x, isEditing: !x.isEditing } : x,
      ),
    }));
  };

  render() {
    console.log('app render');

    const { todoList, filterStatus } = this.state;
    return (
      <div className="flex flex-col items-center h-screen">
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
        <div className="w-full flex-1 overflow-auto">
          {todoList.map((todoItem) => (
            <TodoItem
              key={todoItem.id}
              todoItem={todoItem}
              handleDelete={this.handleDelete}
              toggleCompleted={this.toggleCompleted}
              toggleEdit={this.toggleEdit}
            />
          ))}
        </div>
        <div className="w-full flex">
          <button
            type="button"
            className={classnames('btn flex-1 rounded-none', {
              'bg-green-400 focus:ring-green-500': filterStatus === 'all',
            })}
            onClick={() => this.loadData('all')}
          >
            All
          </button>
          <button
            type="button"
            className={classnames('btn flex-1 rounded-none', {
              'bg-green-400 focus:ring-green-500': filterStatus === 'pending',
            })}
            onClick={() => this.loadData('pending')}
          >
            Pending
          </button>
          <button
            type="button"
            className={classnames('btn flex-1 rounded-none', {
              'bg-green-400 focus:ring-green-500': filterStatus === 'completed',
            })}
            onClick={() => this.loadData('completed')}
          >
            Completed
          </button>
        </div>
      </div>
    );
  }
}

export default Todo;
