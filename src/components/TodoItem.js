import React, { Component } from "react";
import { Motion, spring } from "react-motion";
import Hammer from "react-hammerjs";
import classNames from "classnames";
import FaEdit from "react-icons/lib/fa/edit";
import FaTrash from "react-icons/lib/fa/trash";

const SWIPE_THERSHOLD = 240;

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      editText: props.text,
      isPressed: false,
      lastX: null,
      deltaX: 0,
      opacity: 1
    };
    this.editTodo = this.editTodo.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChangeComplete = this.handleChangeComplete.bind(this);
  }
  editTodo = () => {
    this.setState({ editing: false });
    this.props.onEdit(this.props.id, this.state.editText);
  };
  handleDoubleTap = () => {
    this.setState({ editing: true });
  };
  handleBlur = () => {
    this.editTodo();
  };
  handleKeyDown = e => {
    if (e.which === 13) {
      this.editTodo();
    }
  };
  handleChange = e => {
    this.setState({ editText: e.target.value });
  };
  handlePan = ({ isFinal, deltaX }) => {
    const { id, completed, markTodo } = this.props;
    this.setState({
      isPressed: !isFinal,
      deltaX,
      opacity: (SWIPE_THERSHOLD - deltaX) / SWIPE_THERSHOLD
    });
    if (!completed && deltaX > SWIPE_THERSHOLD) {
      markTodo(id, true);
    } else if (completed && deltaX < -SWIPE_THERSHOLD) {
      markTodo(id, false);
    }
  };

  toggleEdit = () => {
    this.setState({ editing: true });
  };

  handleDelete = () => {
    this.props.onDelete(this.props.id);
  };

  handleChangeComplete = () => {
    const { id, completed, markTodo } = this.props;
    markTodo(id, !completed);
  };

  render() {
    const { text, completed, bgColor } = this.props;
    let { editing, isPressed, deltaX, opacity } = this.state;
    let style = isPressed
      ? { x: deltaX, opacity }
      : { x: spring(0), opacity: spring(1) };
    return (
      <Motion style={style}>
        {({ x, opacity }) => {
          return (
            <div
              className={classNames({
                "todo-item-container": true,
                editing: editing,
                completed: completed
              })}
              style={{
                backgroundColor: bgColor,
                opacity,
                transform: `translate3d(${x}px, 0, 0)`,
                WebkitTransform: `translate3d(${x}px, 0, 0)`
              }}
            >
              <Hammer onDoubleTap={this.handleDoubleTap} onPan={this.handlePan}>
                <div
                  className={classNames({
                    "todo-item": true,
                    completed: completed
                  })}
                >
                  <input
                    type="checkbox"
                    className="chk-complete "
                    name="mark"
                    value="true"
                    checked={completed}
                    onChange={this.handleChangeComplete}
                  />
                  <label>{text}</label>
                </div>
              </Hammer>
              {!this.state.editing &&
                <div className="todo-actions-container">
                  <button className="btn-edit" onClick={this.toggleEdit}>
                    <FaEdit />
                  </button>
                  <button className="btn-delete" onClick={this.handleDelete}>
                    <FaTrash />
                  </button>
                </div>}
              <div className="todo-edit-container">
                <input
                  type="text"
                  value={this.state.editText}
                  ref={input => input && input.focus()}
                  onChange={this.handleChange}
                  onBlur={this.handleBlur}
                  onKeyDown={this.handleKeyDown}
                />
              </div>
            </div>
          );
        }}
      </Motion>
    );
  }
}

export default TodoItem;
