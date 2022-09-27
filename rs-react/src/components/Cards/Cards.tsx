
import React, { Component } from 'react'
import { TCard } from './Card/TCard';
import Card from './Card/Card';
import style from './Cards.module.css';

type CardsProps = {
    items: TCard[]
}

class Cards extends Component<CardsProps, {}> {
    private items: any;

    constructor(props: CardsProps) {
        super(props);
        this.items = props.items;
    }

    render() {
        return (
            <div className={style.list}>
                {this.items.map((item: TCard, idx: number) => <Card item={item} key={`card${idx}`} />)}
            </div>
        )
    }
}

export default Cards;
