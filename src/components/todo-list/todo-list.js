import React from 'react';

import TodoListItem from '../todo-list-item/';
import './todo-list.css';

// Получаем видимые таски и деструктурируем функции
const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone }) => {

  // видимые таски разделяем и каждый оборачиваем в <li>, пропустив через TodoListItem
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item;

    return (
      <li key={ id } className="list-group-item">
        <TodoListItem { ...itemProps }
        onDeleted={() => onDeleted( id )}
        onToggleImportant={() => onToggleImportant( id )}
        onToggleDone={() => onToggleDone( id )}/>
      </li>
    );
  });

  return (
    <ul className="list-group todo-list">
      { elements }
    </ul>
  );
};

export default TodoList;
