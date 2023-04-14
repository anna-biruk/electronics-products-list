import charactersReducer, {
  setData,
  setLoading,
  setError,
  updateSearchQuery,
  addFormData,
  CharactersState,
  Character,
} from '../features/charactersSlice';

describe('charactersSlice', () => {
  let initialState: CharactersState;

  beforeEach(() => {
    initialState = {
      data: null,
      loading: false,
      searchQuery: '',
      error: '',
      formData: [],
    };
  });

  describe('reducer', () => {
    it('should return the initial state', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const nextState = charactersReducer(undefined, {} as any);
      expect(nextState).toEqual(initialState);
    });

    it('should handle setData', () => {
      const data: Character[] = [
        {
          id: 1,
          name: 'Rick',
          gender: 'Male',
          species: 'Human',
          status: 'Alive',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        },
      ];
      const nextState = charactersReducer(initialState, setData({ data }));
      expect(nextState.data).toEqual(data);
    });

    it('should handle setLoading', () => {
      const nextState = charactersReducer(initialState, setLoading({ loading: true }));
      expect(nextState.loading).toEqual(true);
    });

    it('should handle setError', () => {
      const error = 'An error occurred';
      const nextState = charactersReducer(initialState, setError({ error }));
      expect(nextState.error).toEqual(error);
    });

    it('should handle updateSearchQuery', () => {
      const searchQuery = 'Rick';
      const nextState = charactersReducer(initialState, updateSearchQuery(searchQuery));
      expect(nextState.searchQuery).toEqual(searchQuery);
    });

    it('should handle addFormData', () => {
      const formData = [{ name: 'name', value: 'Rick' }];
      const nextState = charactersReducer(initialState, addFormData(formData[0]));
      expect(nextState.formData).toEqual(formData);
    });
  });
});
