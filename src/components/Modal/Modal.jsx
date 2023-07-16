import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export class Modal extends Component {
  handleEsc = ({ code }) => {
    if (code === 'Escape') this.props.onClose();
  };
  componentDidMount() {
    document.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleEsc);
  }

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          <img src={this.props.pic} alt="some-pic" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  pic: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
