import React from "react";
import Cards from "../components/Cards/Cards";
import { TCard } from "../components/Cards/Card/TCard";

const data: TCard[] = [
    {
        image: 'https://images.unsplash.com/photo-1613578723854-972200002cc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        title: 'The horses on the plains of Patagonia with the Torres Del Paine mountains in the background',
        author: {
            name: 'martin bennie',
            link: 'https://unsplash.com/@martinbennie',
        },
        place: 'Torres del Paine, Torres de Paine, Chile',
        category: 'Travel',
    },
    {
        image: 'https://images.unsplash.com/photo-1663219619979-5dd51f7cc8c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1824&q=80',
        title: '',
        author: {
            name: 'Francesco Ungaro',
            link: 'https://unsplash.com/@francesco_ungaro',
        },
        category: 'Travel, Act For Nature',
    }
];


export default function About() {
    return (
        <>
            <h2>About</h2>
            <Cards items={[...data, ...data]} />
        </>
    )
}