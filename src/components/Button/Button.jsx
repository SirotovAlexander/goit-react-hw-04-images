import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Button.module.css';

export class Button extends Component {
  render() {
    return (
      <>
        <button
          className={css.Button}
          type="button"
          onClick={this.props.onClick}
        >
          Load more
        </button>
      </>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
