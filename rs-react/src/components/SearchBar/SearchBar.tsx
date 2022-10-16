import React, { Component } from 'react';
import { SEARCH_STRING_LS } from '../../utils/constants';
import { TSearch } from './TSearch';
import style from './SearchBar.module.css';

type TSearchProps = {
  onSearch: (searchString: string) => void;
  props?: Record<string, never>;
};

class SearchBar extends Component<TSearchProps, TSearch> {
  constructor(props: TSearchProps) {
    super(props);
    this.state = {
      searchStr: localStorage.getItem(SEARCH_STRING_LS) || '',
    };
  }

  componentWillUnmount(): void {
    localStorage.setItem(SEARCH_STRING_LS, this.state.searchStr);
  }

  changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement;

    this.setState({
      searchStr: el.value,
    });
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.onSearch(this.state.searchStr);
  };

  render(): React.ReactNode {
    return (
      <form onSubmit={this.submitHandler} className={style.form} data-testid="search-form">
        <input
          type="text"
          value={this.state.searchStr}
          placeholder="Search"
          onChange={this.changeHandler}
          className={style.input}
        />
      </form>
    );
  }
}

export { SearchBar };
