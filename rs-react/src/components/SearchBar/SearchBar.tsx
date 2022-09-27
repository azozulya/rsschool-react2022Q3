import React, { Component } from "react";
import { SEARCH_STRING_LS } from "../../utils/constants";
import style from './SearchBar.module.css';

type SearchState = {
    searchStr: string;
}

type SearchProps = {

}

class SearchBar extends Component<SearchProps, SearchState> {
    // private isFirstTime: boolean;

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            searchStr: localStorage.getItem(SEARCH_STRING_LS) || '',
        };
        //this.isFirstTime = true;
    }

    componentDidMount(): void {
        this.setState({
            searchStr: localStorage.getItem(SEARCH_STRING_LS) || '',
        });
        console.log('mount: ', localStorage.getItem(SEARCH_STRING_LS), this.state.searchStr);
    }

    componentWillUnmount(): void {
        // if (this.isFirstTime) {
        //     this.isFirstTime = false;
        //     return;
        // }
        console.log('Unmount: ', this.state);
        localStorage.setItem(SEARCH_STRING_LS, this.state.searchStr);
    }

    changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.target as HTMLInputElement;

        this.setState({
            searchStr: el.value
        });
    }

    submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();        
    }

    render(): React.ReactNode {
        console.log('render: ', this.state);
        return (
            <form onSubmit={this.submitHandler} className={style.form} data-testid='search-form'>
                <input type="text" value={this.state.searchStr} placeholder="Search" onChange={this.changeHandler} className={style.inp} />
            </form>
        )

    }
}

export { SearchBar }