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
          {
            text: todoText, id: new Date().valueOf(), isCompleted: false, isEditing: false,
          },
        ],
      }), () => {
        if (this.inputRef.current) {
          this.inputRef.current.value = '';
        }
      });
    }
  };

  toggleCompleted = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.map((item) => {
        if (item.id === todoItem.id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      }),
    }));
  };

  handleDelete = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.filter((item) => item.id !== todoItem.id),
    }));
  };

  handleEdit = (todoItem: TodoItemType) => {
    this.setState(({ todoList }) => ({
      todoList: todoList.map((item) => {
        if (item.id === todoItem.id) {
          return { ...item, isEditing: !item.isEditing };
        }
        return item;
      }),
    }));
  };

  handleFilterStatus = (filterType: FilterStatus) => {
    this.setState({
      filterStatus: filterType,
    });
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
          {todoList.map((todoItem) => {
            const TodoItemComponent = (
              <TodoItem
                key={todoItem.id}
                todoItem={todoItem}
                handleDelete={this.handleDelete}
                handleEdit={this.handleEdit}
                toggleCompleted={this.toggleCompleted}
              />
            );
            if (filterStatus === 'all' || (filterStatus === 'pending' && !todoItem.isCompleted) || (filterStatus === 'completed' && todoItem.isCompleted)) {
              return TodoItemComponent;
            }
            return null;
          })}
        </div>
        <div className="w-full flex">
          <button type="button" className="btn flex-1 rounded-none" onClick={() => this.handleFilterStatus('all')}>All</button>
          <button type="button" className="btn flex-1 rounded-none" onClick={() => this.handleFilterStatus('pending')}>Pending</button>
          <button type="button" className="btn flex-1 rounded-none" onClick={() => this.handleFilterStatus('completed')}>Completed</button>
        </div>
      </div>
    );
  }
}

export default Todo;
