import React, { Component } from 'react';
import { TCard } from './TCard';
import style from '../Cards.module.css';

type CardProps = {
  key: string;
  item: TCard;
};

class Card extends Component<CardProps, never> {
  private cardItem: TCard;

  constructor(props: CardProps) {
    super(props);
    this.cardItem = props.item;
  }

  render() {
    const { image, title, author, category } = this.cardItem;
    return (
      <div className={style.card} data-testid="card">
        <img src={`${image}`} alt="" className={style.image} />
        <div className={style.content}>
          <p className={style.title}>{title}</p>
          <p className={style.author}>
            <a href={author.link} target="_blank" rel="noreferrer">
              {author.name}
            </a>
          </p>
          <p className={style.category}>{category}</p>
        </div>
      </div>
    );
  }
}

export default Card;
