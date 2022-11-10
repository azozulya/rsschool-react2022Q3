import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getData } from '../api/getData';
import { TCard } from '../components/Cards/Card/types';
import { TCards } from '../components/Cards/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';
import { API_URL } from '../utils/constants';

type TPhotoFetchArgs = {
  searchString: string;
  page: number;
  perpage: string;
  sort: string;
};

// const fetchPhotos = createAsyncThunk<TCards, TPhotoFetchArgs>(
//   'photos/fetchPhotos',
//   async function ({ searchString, page, perpage, sort }, { rejectWithValue }) {
//     const response = await fetch(
//       `${API_URL}&text=${searchString}&page=${page}&per_page=${perpage}&sort=${sort}&media=photo&license=4`
//     );

//     if (!response.ok) {
//       return rejectWithValue("Can't load photos");
//     }

//     return (await response.json()) as TCards;
//   }
// );

export const fetchPhotosBySearchString = createAsyncThunk<
  TCards,
  string,
  { state: { photos: TInitialState } }
>('photos/fetchPhotos', async function (searchString, { rejectWithValue, getState, dispatch }) {
  dispatch(setSearchString(searchString));

  const { page, perpage, sort } = getState().photos;

  const response = await fetch(
    `${API_URL}&text=${searchString}&page=${page}&per_page=${perpage}&sort=${sort}&media=photo&license=4`
  );

  if (!response.ok) {
    return rejectWithValue("Can't load photos");
  }

  const photosData = (await response.json()) as { photos: TCards };
  return photosData.photos as TCards;
});

type TInitialState = {
  photo: TCard[];
  users: TUserCard[];
  page: number;
  perpage: string;
  pages: number;
  total: number;
  searchString: string;
  sort: string;
  loading: boolean;
  status: string | null;
  error: string | null;
};

const initialState: TInitialState = {
  page: 1,
  pages: 0,
  perpage: '20',
  photo: [],
  loading: false,
  status: null,
  error: null,
  total: 0,
  searchString: '',
  sort: 'date-posted-desc',
  users: [],
};

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    setSearchString(state, action) {
      state.searchString = action.payload;
    },
    sort(state, action) {},
    goToPage(state, action) {},
    goToNextPage(state, action) {},
    goToPrevPage(state, action) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotosBySearchString.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotosBySearchString.fulfilled, (state, action) => {
        const { photo, pages, total } = action.payload;
        console.log(action.payload);
        state.photo = photo;
        state.pages = pages;
        state.total = total;
        state.loading = false;
      });
  },
});

export const { sort, goToPage, goToPrevPage, goToNextPage, setSearchString } = photosSlice.actions;

export default photosSlice.reducer;
