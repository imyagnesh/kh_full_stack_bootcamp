import classNames from 'classnames';
import React, { Component, createRef } from 'react';
import { TodoItemType } from './Todo';

type Props = {
  todoItem: TodoItemType;
  handleDelete: (todoItem: TodoItemType) => void;
  toggleCompleted: (todoItem: TodoItemType) => void;
  toggleEdit: (todoItem: TodoItemType) => void;
};

type State = {};

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
    const { todoItem, handleDelete, toggleCompleted, toggleEdit } = this.props;
    return (
      <div className="flex items-center m-2">
        <input
          type="checkbox"
          checked={todoItem.isCompleted}
          onChange={() =>
            toggleCompleted({ ...todoItem, isCompleted: !todoItem.isCompleted })
          }
        />
        <div className="flex-1 mx-3">
          {todoItem.isEditing ? (
            <input type="text" ref={this.inputRef} />
          ) : (
            <p
              className={classNames({
                'line-through': todoItem.isCompleted,
              })}
            >
              {todoItem.text}
            </p>
          )}
        </div>
        {todoItem.isEditing ? (
          <div>
            <button
              type="button"
              className="btn mr-2"
              onClick={() => toggleEdit(todoItem)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn mr-2"
              onClick={() =>
                toggleCompleted({
                  ...todoItem,
                  text: this.inputRef.current!.value,
                  isEditing: false,
                })
              }
            >
              Save
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="btn mr-2"
            onClick={() => toggleEdit(todoItem)}
          >
            Edit
          </button>
        )}
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
