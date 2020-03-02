import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";
import React, { Component } from "react";

import './app.css';

export default class App extends Component {

    maxId = 100; // для старта идентификаторов итема в todoData

    state = {
        todoData : [ // тестовый массив
            this.createTodoItem('Drink Coffe'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '', // для работы с фильтром текущего списка
        filter: 'all' // значение фильтра по дефолту
    };

    // Функция создания таска
    createTodoItem(label) {
        return {
            label, // назначение
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    // Функция добавление таска в тестовый массив стэйта
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({ todoData }) => {
            const newArr = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newArr
            };
        });
    };

    // Функция удаления таска из тестового массива стэйта
    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);

            const newArray = [ ...todoData.slice(0, idx),
                            ...todoData.slice(idx + 1) ];
            return {
                todoData: newArray
            };
        });
    };

    // Функция изменения свойства элемента тестового массива
    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = { ...oldItem, [propName]: !oldItem[propName] };

        return [
            ...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    // Функция назначения свойства 'important'
    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    // Функция назначения свойства 'done'
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    // Функция применения поиска
    onSearchChange = (term) => {
        this.setState({ term });
    };

    // Функция применения быстрого фильтра
    onFilterChange = (filter) => {
        this.setState({ filter });
    };

    // Функция передачи результата быстрого фильтра
    filter(items, filter) {
        switch(filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        }
    };

    // Функция вычисления результата поиска
    search (items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        });
    };

    render() {
        const { todoData, term, filter } = this.state; // деструктурируем из стэйта для упрощения кода

        const visibleItems = this.filter( this.search( todoData, term ), filter ); // вычисляем быстрый фильтр
        const doneCount = todoData.filter( (el) => el.done ).length; // вычисляем количество выполненных

        const todoCount = todoData.length - doneCount; // вычисление НЕвыполненных тасков

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className="top-panel d-flex">
                    <SearchPanel
                        onSearchChange={ this.onSearchChange } />
                    <ItemStatusFilter
                        filter={ filter }
                        onFilterChange={ this.onFilterChange } />
                </div>

                <TodoList todos={ visibleItems }
                          onDeleted={ this.deleteItem }
                          onToggleImportant={ this.onToggleImportant }
                          onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={ this.addItem }/>
            </div>
        );
    }
};