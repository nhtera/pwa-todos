import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import { markTodo, editTodo, clearTodos, deleteTodo } from "../../actions";
import TodoInput from "../../components/TodoInput";
import TodoList from "../../components/TodoList";
import TodoItem from "../../components/TodoItem";

class TodoContainer extends Component {
  render() {
    const { todos, onlyActive, markTodo, editTodo, clearTodos, deleteTodo } = this.props;
    return (
      <div className="todo-container">
        <TodoInput />
        <div className="todo-lists-container">
          <TodoList>
            {todos
              .filter(todo => !todo.completed)
              .map(todo => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  markTodo={markTodo}
                  onDelete={deleteTodo}
                  bgColor="#2196F3"
                  onEdit={editTodo}
                />
              ))}
          </TodoList>
          <div
            className={classNames("heading-container", { hidden: onlyActive })}
          >
            <span>Completed</span>
          </div>
          <TodoList>
            {todos
              .filter(todo => todo.completed)
              .map(todo => (
                <TodoItem
                  key={todo.id}
                  {...todo}
                  markTodo={markTodo}
                  onDelete={deleteTodo}
                  bgColor="#2196F3"
                  onEdit={editTodo}
                />
              ))}
          </TodoList>
          <div
            className={classNames("heading-container", { hidden: onlyActive })}
          >
            <button className="btn-clear-completed" onClick={clearTodos}>Clear completed</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ todos }) => ({
  todos,
  onlyActive: !todos.some(todo => todo.completed)
});

export default connect(mapStateToProps, { markTodo, editTodo, clearTodos, deleteTodo })(
  TodoContainer
);
