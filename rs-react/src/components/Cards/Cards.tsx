import React from 'react';
import { TCard } from './Card/types';
import { Card } from './Card';
import style from './Cards.module.css';

type CardsProps = {
  items: TCard[];
};

const Cards = (props: CardsProps) => {
  const cards = props.items;
  return (
    <div className={style.list}>
      {cards.map((item: TCard) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Cards;
