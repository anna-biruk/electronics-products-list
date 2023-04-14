import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Inputs } from 'components/CreateUserForm';
import { RootState } from '../app/store';

export type Character = {
  id: number;
  gender: string;
  image: string;
  name: string;
  species: string;
  status: string;
};

export interface CharactersState {
  data: Character[] | null;
  searchQuery: string;
  loading: boolean;
  error: string;
  formData: Inputs[];
}
export type ErrorResponse = {
  error: string;
};

const initialState: CharactersState = {
  data: null,
  loading: false,
  searchQuery: '',
  error: '',
  formData: [],
};

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload.data;
    },
    updateSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload.loading;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
    },
    addFormData: (state, action) => {
      state.formData.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = '';
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { setData, setLoading, setError, updateSearchQuery, addFormData } =
  charactersSlice.actions;

export const fetchCharacters = createAsyncThunk<
  Character[],
  { page?: number; search?: string },
  { rejectValue: ErrorResponse }
>('characters/fetch', async (params) => {
  const { page = 1, search = '' } = params;
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
  );

  if (!response.ok) {
    const data: ErrorResponse = await response.json();
    const errorResponse = data as ErrorResponse;
    throw Error(errorResponse.error);
  }
  const data: { results: Character[] } = await response.json();

  return data.results;
});

export const selectCharacters = (state: RootState) => state.characters.data;
export const selectLoading = (state: RootState) => state.characters.loading;
export const selectError = (state: RootState) => state.characters.error;
export const selectSearch = (state: RootState) => state.characters.searchQuery;
export const selectFormData = (state: RootState) => state.characters.formData;
export default charactersSlice.reducer;
