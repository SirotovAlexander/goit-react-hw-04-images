import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export const Modal = ({ pic, onClose }) => {
  const handleClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleEsc = ({ code }) => {
    if (code === 'Escape') onClose();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className={css.Overlay} onClick={handleClick}>
      <div className={css.Modal}>
        <img src={pic} alt="some-pic" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  pic: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
