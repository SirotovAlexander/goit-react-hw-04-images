import { useState } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = event => {
    setValue(event.currentTarget.value);
  };

  const handleSubmite = event => {
    event.preventDefault();
    if (value.trim() === '') {
      return Notiflix.Notify.failure('Please add valid property');
    }
    onSubmit(value);
    setValue('');
  };
  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmite} className={css.SearchForm}>
        <button type="submit" className={css.SearchForm_button}>
          <span className={css.SearchForm_button_label}>Search</span>
        </button>

        <input
          className={css.SearchForm_input}
          onChange={handleChange}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
