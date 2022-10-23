import React, { Component } from 'react';
import { TModalProps, TModalState } from './types';
import { getMovieDetails } from '../../api/getMovieDetails';
import { currencyFormat, dateFormat, getYear, runtimeFormat } from '../../utils/utils';
import { API_IMG_URL } from '../../utils/constants';
import style from './Modal.module.css';

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
    this.setState({ movie: movieData });
  }

  render() {
    if (!this.state.movie) return '';

    const {
      title,
      original_language,
      overview,
      poster_path,
      release_date,
      runtime,
      status,
      tagline,
      backdrop_path,
      budget,
      genres,
    } = this.state.movie;

    return (
      <div className={style.modal} onClick={this.props.onClose}>
        <div
          data-testid="modal"
          className={style.content}
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w780/${backdrop_path}` }}
        >
          <button onClick={this.props.onClose} aria-label="Close" className={style.close}>
            +
          </button>
          <div className={style.details}>
            <img src={`${API_IMG_URL}${poster_path}`} />
            <div className={style.params}>
              <h2 className={style.title}>
                {title}&nbsp;<span className={style.year}>({getYear(release_date)})</span>
              </h2>
              {tagline && <p className={style.tagline}>{tagline}</p>}

              <div className={style.info}>
                {runtimeFormat(runtime)}
                {genres &&
                  genres.map((genre) => (
                    <span key={genre.id} className={style.genre}>
                      {genre.name}
                    </span>
                  ))}
              </div>
              <div className={style.scrollable}>
                <p>
                  <span className={style.label}>Status:</span> {status}
                </p>
                <p>
                  <span className={style.label}>Original language:</span> {original_language}
                </p>
                <p>
                  <span className={style.label}>Release date:</span> {dateFormat(release_date)}
                </p>
                {budget > 0 && (
                  <p>
                    <span className={style.label}>Budget</span>
                    {currencyFormat(budget)}
                  </p>
                )}
                <p>
                  <span className={style.label}>Overview:</span> {overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
