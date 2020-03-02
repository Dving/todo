import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {

  state = {
    term: '' // введенное значение поиска
  };

  // Функция события при вводе значения
  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render () {
    return (
        <input type="text"
               className="form-control search-input"
               onChange={this.onSearchChange}
               placeholder={'type to search'}
               value={this.state.term} />
    );
  };
};