import React from 'react';
import { getData } from '../api/getData';
import { getPopular } from '../api/getPopular';
import { Cards } from '../components/Cards';
import { TCard, TCards } from '../components/Cards/Card/types';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import { SearchBar } from '../components/SearchBar';

type TState = {
  title: string;
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
      title: '',
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
      isLoading: true,
    };
  }

  async componentDidMount(): Promise<void> {
    const stateData: TCards | null = await getPopular();

    stateData &&
      this.setState((prevState) => ({
        ...prevState,
        ...stateData,
        isLoading: false,
        title: 'Popular movies',
      }));
  }

  searchHandler = async (searchStr: string) => {
    this.setState({ isLoading: true });

    const stateData: TCards | null = await getData(searchStr);

    stateData &&
      this.setState((prevState) => ({
        ...prevState,
        ...stateData,
        isLoading: false,
        title: `Find ${stateData.total_results} movies. Page ${stateData.page} from ${stateData.total_pages}`,
      }));
  };

  render() {
    return (
      <>
        <SearchBar onSearch={this.searchHandler} />

        <h2>{this.state.title}</h2>

        {this.state.isLoading ? <LoadingIndicator /> : <Cards items={this.state.results} />}
      </>
    );
  }
}
export default Main;
