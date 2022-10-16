import React, { Component } from 'react';
import { TCard } from './types';
import style from '../Cards.module.css';
import { API_IMG_URL } from '../../../utils/constants';

type CardProps = {
  key: string;
  item: TCard;
};

class Card extends Component<CardProps, never> {
  private cardItem: TCard;

  constructor(props: CardProps) {
    super(props);
    this.cardItem = this.props.item;
  }

  render() {
    const { poster_path: image, title, release_date, popularity } = this.cardItem;
    return (
      <div className={style.card} data-testid="card">
        {image && <img src={`${API_IMG_URL}${image}`} alt="" className={style.image} />}
        <div className={style.content}>
          <p className={style.title}>{title}</p>
          <p className={style.author}>
            <a href="" target="_blank" rel="noreferrer">
              {release_date}
            </a>
          </p>
          <p className={style.category}>{popularity}</p>
        </div>
      </div>
    );
  }
}

export default Card;
