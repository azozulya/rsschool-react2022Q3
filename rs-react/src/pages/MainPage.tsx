import React from 'react';
import { getData } from '../api/getData';
import { getPopular } from '../api/getPopular';
import { Cards } from '../components/Cards';
import { TCard, TCards } from '../components/Cards/Card/types';
import { SearchBar } from '../components/SearchBar';
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator';
import Modal from '../components/Modal/Modal';
import { SEARCH_STRING_LS } from '../utils/constants';

type TState = {
  title: string;
  page: number;
  total_pages: number;
  total_results: number;
  results: TCard[];
  isLoading: boolean;
  currentMovieID: number | null;
};

type TProps = Record<string, never>;

class Main extends React.Component<TProps, TState> {
  private paddingRight = '0px';
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
      currentMovieID: null,
    };
  }

  getPopular = async () => {
    const stateData: TCards | null = await getPopular();

    stateData &&
      this.setState((prevState) => ({
        ...prevState,
        ...stateData,
        isLoading: false,
        title: 'Popular movies',
      }));
  };

  getMovies = async (searchStr: string) => {
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

  async componentDidMount() {
    const searchString = localStorage.getItem(SEARCH_STRING_LS) || '';

    if (!searchString) {
      return await this.getPopular();
    }

    await this.getMovies(searchString);
  }

  searchHandler = async (searchStr: string) => {
    await this.getMovies(searchStr);
  };

  clickHandler = (id: number) => {
    this.setState({ currentMovieID: id });
    document.body.style.paddingRight = `${window.innerWidth - document.body.offsetWidth}px`;
    document.body.classList.add('noscroll');
  };

  closeHandler = () => {
    this.setState({ currentMovieID: null });
    document.body.classList.remove('noscroll');
    document.body.style.paddingRight = '0px';
  };

  render() {
    return (
      <>
        {this.state.currentMovieID && (
          <Modal id={this.state.currentMovieID} onClose={this.closeHandler} />
        )}
        <SearchBar onSearch={this.searchHandler} />

        <h2>{this.state.title}</h2>

        {this.state.isLoading ? (
          <LoadingIndicator />
        ) : (
          <Cards items={this.state.results} onCardClick={this.clickHandler} />
        )}
      </>
    );
  }
}
export default Main;
