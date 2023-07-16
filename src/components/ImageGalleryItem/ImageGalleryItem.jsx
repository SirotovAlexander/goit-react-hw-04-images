import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ items, onClick }) => {
  return (
    <>
      {items.map(item => {
        const { id, webformatURL, largeImageURL, tags } = item;
        return (
          <li
            key={id}
            className={css.ImageGalleryItem}
            onClick={() => onClick(largeImageURL)}
          >
            <img
              className={css.ImageGalleryItem_image}
              src={webformatURL}
              alt={tags}
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};
