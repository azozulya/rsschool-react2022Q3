import React, { Component } from 'react';
import { TCard } from './Card/types';
import { Card } from './Card';
import style from './Cards.module.css';

type CardsProps = {
  items: TCard[];
  onCardClick: (id: number) => void;
};

class Cards extends Component<CardsProps, never> {
  constructor(props: CardsProps) {
    super(props);
  }

  render() {
    const cards = this.props.items;
    return (
      <div className={style.list}>
        {cards.map((item: TCard) => (
          <Card item={item} key={item.id.toString()} onClick={this.props.onCardClick} />
        ))}
      </div>
    );
  }
}

export default Cards;
