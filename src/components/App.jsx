import { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import getInfoFromApi from './GetUsersAPI/getUser';
import Notiflix from 'notiflix';
import css from './App.module.css';

export class App extends Component {
  state = {
    hits: [],
    query: '',
    page: 1,
    totalHits: 0,
    modalPic: '',
    isLoading: false,
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.setState({ isLoading: true });
      return getInfoFromApi(this.state.query, this.state.page)
        .then(response => {
          if (response.hits.length === 0) {
            return Notiflix.Notify.failure('Please add valid property');
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...response.hits],
            totalHits: response.totalHits,
          }));
        })
        .catch(error => {
          Notiflix.Notify.failure(error.message);
        })
        .finally(() => this.setState({ isLoading: false }));
    }
  }

  hendleSubmit = data => {
    if (data === this.state.query) {
      return Notiflix.Notify.failure(
        'You already got information by this request'
      );
    } else if (data !== this.state.query) {
      return this.setState({ hits: [], page: 1, query: data });
    }
  };

  hendleClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  hendleModalClose = () => {
    this.setState({
      showModal: false,
      modalPic: '',
    });
  };

  hendleModalOpen = data => {
    this.setState({
      modalPic: data,
      showModal: true,
    });
  };

  loadMoreTotal = () => this.state.page < Math.ceil(this.state.totalHits / 12);

  render() {
    const { hits, isLoading, showModal, modalPic } = this.state;
    const buttonCheck = this.loadMoreTotal();

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.hendleSubmit} />
        {isLoading && <Loader />}
        {hits.length > 0 && (
          <ImageGallery hits={this.state.hits} onClick={this.hendleModalOpen} />
        )}
        {hits.length > 0 && buttonCheck && !isLoading && (
          <Button onClick={this.hendleClick} />
        )}
        {showModal && <Modal pic={modalPic} onClose={this.hendleModalClose} />}
      </div>
    );
  }
}
