import React from 'react';
import { getData } from '../api/getData';
import { getPopular } from '../api/getPopular';
import { Cards } from '../components/Cards';
import { TCard, TCards } from '../components/Cards/Card/types';
import { SearchBar } from '../components/SearchBar';

type TState = {
  page: number;
  total_pages: number;
  total_results: number;
  results: TCard[];
  isLoading: boolean;
};

type TProps = Record<string, never>;

class Main extends React.Component<TProps, TState> {
  state: TState;

  constructor(props: TProps) {
    super(props);
    this.state = {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
      isLoading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    console.log('componentDidMount');
    const stateData: TCards | null = await getPopular();
    stateData && this.setState((prevState) => ({ ...prevState, ...stateData, isLoading: false }));
  }

  searchHandler = async (searchStr: string) => {
    console.log('Main page, search: ', searchStr);
    const stateData: TCards | null = await getData(searchStr);
    console.log('stateData: ', stateData);
    stateData && this.setState((prevState) => ({ ...prevState, ...stateData, isLoading: false }));
  };

  render() {
    return (
      <>
        <h2>Main page</h2>
        <SearchBar onSearch={this.searchHandler} />

        {this.state.isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <Cards items={this.state.results} />
        )}
      </>
    );
  }
}
export default Main;
