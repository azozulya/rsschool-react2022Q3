import React, { Component } from 'react';
import { TModalProps, TModalState } from './types';
import style from './Modal.module.css';
import { getMovieDetails } from '../../api/getMovieDetails';
import { dateFormat, getYear } from '../../utils/utils';

export class Modal extends Component<TModalProps, TModalState> {
  private id: number;

  constructor(props: TModalProps) {
    super(props);
    this.id = this.props.id;
    this.state = {
      movie: null,
    };
  }

  async componentDidMount(): Promise<void> {
    const movieData = await getMovieDetails(this.id);
    console.log(movieData);
    this.setState({ movie: movieData });
  }

  render() {
    if (!this.state.movie) return '';

    const { title, original_language, overview, poster_path, release_date, runtime, status } =
      this.state.movie;
    return (
      <div className={style.modal}>
        <div className={style.content}>
          <button onClick={this.props.onClose} aria-label="Close">
            x
          </button>
          {poster_path}
          <p>
            {title}({getYear(release_date)})
          </p>
          <p>Status: {status}</p>
          <p>Original language: {original_language}</p>
          <p>Release date: {dateFormat(release_date)}</p>
          <p>Overview: {overview}</p>
          {runtime}
        </div>
      </div>
    );
  }
}

export default Modal;
