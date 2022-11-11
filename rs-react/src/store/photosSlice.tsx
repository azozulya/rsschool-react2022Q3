import { AnyAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TCard } from '../components/Cards/Card/types';
import { TCards } from '../components/Cards/types';
import { TUserCard } from '../components/CreateForm/CreateForm.types';
import API from '../api/API';

export const fetchPhotosBySearchString = createAsyncThunk<
  TCards,
  string,
  { state: { photos: TInitialState } }
>(
  'photos/fetchPhotosBySearchString',
  async function (searchString, { rejectWithValue, getState, dispatch }) {
    dispatch(setSearchString(searchString));

    const { page, perpage, sort } = getState().photos;
    try {
      return await API.getPhotos(searchString, page, perpage, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const goToPage = createAsyncThunk<TCards, number, { state: { photos: TInitialState } }>(
  'photos/fetchPhotosByPage',
  async function (page, { rejectWithValue, getState }) {
    const { searchString, perpage, sort } = getState().photos;

    try {
      return await API.getPhotos(searchString, page, perpage, sort);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const goToNextPage = createAsyncThunk<
  TCards,
  undefined,
  { state: { photos: TInitialState } }
>('photos/fetchPhotosByNextPage', async function (_, { rejectWithValue, getState }) {
  const { searchString, page, perpage, sort } = getState().photos;

  try {
    return await API.getPhotos(searchString, page + 1, perpage, sort);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const goToPrevPage = createAsyncThunk<
  TCards,
  undefined,
  { state: { photos: TInitialState } }
>('photos/fetchPhotosByPrevPage', async function (_, { rejectWithValue, getState }) {
  const { searchString, page, perpage, sort } = getState().photos;

  try {
    return await API.getPhotos(searchString, page - 1, perpage, sort);
  } catch (error) {
    return rejectWithValue(error);
  }
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
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action: AnyAction) => action.type.endsWith('fulfilled'),
        (state, action) => {
          const { page, photo, pages, total } = action.payload;
          state.photo = photo;
          state.pages = pages;
          state.total = total;
          state.page = page;
          state.loading = false;
        }
      );
  },
});

export const { sort, setSearchString } = photosSlice.actions;

export default photosSlice.reducer;
