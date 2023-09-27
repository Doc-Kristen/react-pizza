import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortProperty {
  RATING_DESC = 'rating',
  RATING_ASC = '-rating',
  TITLE_DESC = 'title',
  TITLE_ASC = '-title',
  PRICE_DESC = 'price',
  PRICE_ASC = 'price',
};

export type Sort = {
  name: string,
  sortProperty: SortProperty;
}

interface FilterSliceState {
  searchValue: string,
  categoryId: number,
  sort: Sort;
  currentPage: number,
}
const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'популярности',
    sortProperty: SortProperty.PRICE_DESC
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state: RootState) => state.filter.sort;
export const selectFilter = (state: RootState) => state.filter;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
