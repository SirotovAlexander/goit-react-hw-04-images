import { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import getInfoFromApi from './GetUsersAPI/getUser';
import Notiflix from 'notiflix';
import css from './App.module.css';

export const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);
  const [modalPic, setModalPic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (page || query) {
      setIsLoading(true);
      getInfoFromApi(query, page)
        .then(response => {
          if (response.hits.length === 0) {
            return Notiflix.Notify.failure('Please add valid property');
          }
          setHits(prev => [...prev, ...response.hits]);
          setTotalHits(response.totalHits);
        })
        .catch(error => {
          Notiflix.Notify.failure(error.message);
        })
        .finally(() => setIsLoading(false));
    }
  }, [query, page]);

  const hendleSubmit = data => {
    if (data === query) {
      return Notiflix.Notify.failure(
        'You already got information by this request'
      );
    } else if (data !== query) {
      setHits([]);
      setPage(1);
      setQuery(data);
      return;
    }
  };

  const hendleClick = () => {
    setPage(prev => prev + 1);
  };
  const hendleModalClose = () => {
    setShowModal(false);
    setModalPic('');
  };

  const hendleModalOpen = data => {
    setModalPic(data);
    setShowModal(true);
  };

  const loadMoreTotal = () => page < Math.ceil(totalHits / 12);
  const buttonCheck = loadMoreTotal();
  return (
    <div className={css.App}>
      <Searchbar onSubmit={hendleSubmit} />
      {isLoading && <Loader />}
      {hits.length > 0 && (
        <ImageGallery hits={hits} onClick={hendleModalOpen} />
      )}
      {hits.length > 0 && buttonCheck && !isLoading && (
        <Button onClick={hendleClick} />
      )}
      {showModal && <Modal pic={modalPic} onClose={hendleModalClose} />}
    </div>
  );
};
