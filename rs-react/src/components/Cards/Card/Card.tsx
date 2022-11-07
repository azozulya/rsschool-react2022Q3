import React from 'react';
import { TCard } from './types';
import { API_IMG_URL } from '../../../utils/constants';
import style from '../Cards.module.css';

type CardProps = {
  key: string;
  item: TCard;
};

const Card = (props: CardProps) => {
  const { id, title, server, secret, owner } = props.item;

  return (
    <div className={style.card} data-testid="card">
      <img src={`${API_IMG_URL}${server}/${id}_${secret}_q.jpg`} alt="" className={style.image} />

      <div className={style.title}>
        {title}
        <a href={`https://www.flickr.com/photos/${owner}`}>author</a>
      </div>
    </div>
  );
};

export default Card;
