import { Component } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    value: '',
  };

  handleChange = event => {
    this.setState({ value: event.currentTarget.value });
  };

  handleSubmite = event => {
    event.preventDefault();
    if (this.state.value.trim() === '') {
      return Notiflix.Notify.failure('Please add valid property');
    }
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form onSubmit={this.handleSubmite} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <span className={css.SearchForm_button_label}>Search</span>
          </button>

          <input
            className={css.SearchForm_input}
            onChange={this.handleChange}
            value={this.state.value}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
