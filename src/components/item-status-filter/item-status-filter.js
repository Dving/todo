import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {

    // массив для создания кнопок
    buttons = [
        { name: 'all', label: 'all'},
        { name: 'active', label: 'active'},
        { name: 'done', label: 'done'}
    ];

  render() {
      const { filter, onFilterChange } = this.props; // деструктурируем функции из app
      const buttons = this.buttons.map(({name, label}) => { // для каждого элемента массива
          const isActive = filter === name;                 // проверяем совпадение имени и назначаем True/False
          const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'; // меняем стили по соответствию
          return (                              // строим кнопку
              <button type={'button'}
                      className={`btn ${clazz}`}
                      key={name}                // уникальный ключ
                      onClick={() => onFilterChange(name)}>
                  {label}
              </button>
          );
      });

    return ( // возвращается массив с готовым рендером
        <div className="btn-group">
            {buttons}
        </div>
    );
  }
}