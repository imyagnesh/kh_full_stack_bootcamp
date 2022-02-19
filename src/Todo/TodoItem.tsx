import classNames from 'classnames';
import React, { Component, createRef } from 'react';
import { TodoItemType } from './Todo';

type Props = {
    todoItem: TodoItemType;
    handleDelete: (todoItem: TodoItemType) => void;
    toggleCompleted: (todoItem: TodoItemType) => void;
    handleEdit: (todoItem: TodoItemType, value: string) => void;
}

type State = {}

class TodoItem extends Component<Props, State> {
  state = {};

  inputRef = createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.inputRef.current) {
      const { todoItem } = this.props;
      this.inputRef.current.value = todoItem.text;
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { todoItem } = this.props;
    if (todoItem.isEditing && this.inputRef.current) {
      this.inputRef.current.value = todoItem.text;
    }
  }

  render() {
    const {
      todoItem, handleDelete, handleEdit, toggleCompleted,
    } = this.props;
    return (
      <div className="flex items-center m-2">
        <input
          type="checkbox"
          checked={todoItem.isCompleted}
          onChange={() => toggleCompleted(todoItem)}
        />
        <div className="flex-1 mx-3">
          {todoItem.isEditing ? <input type="text" ref={this.inputRef} /> : (
            <p
              className={classNames({
                'line-through': todoItem.isCompleted,
              })}
            >
              {todoItem.text}
            </p>
          )}
        </div>
        <button type="button" className="btn mr-2" onClick={() => handleEdit(todoItem, this.inputRef.current?.value)}>Edit</button>
        <button
          type="button"
          onClick={() => handleDelete(todoItem)}
          className="btn"
        >
          Delete
        </button>
      </div>
    );
  }
}

export default TodoItem;
