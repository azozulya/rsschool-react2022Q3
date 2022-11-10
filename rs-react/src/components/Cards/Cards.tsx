import React from 'react';
import { TCard } from './Card/types';
import { Card } from './Card';
import style from './Cards.module.css';
import { useAppSelector } from '../../store/hook';

const Cards = () => {
  const photos = useAppSelector((state) => state.photos.photo);

  return (
    <div className={style.list}>
      {photos.map((item: TCard) => (
        <Card item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Cards;
