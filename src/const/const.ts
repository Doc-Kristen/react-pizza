import { SortProperty } from "../redux/slices/filterSlice";

const URL = 'https://6512ba04b8c6ce52b39618e8.mockapi.io/';

type SortListItem = {
  name: string;
  sortProperty: SortProperty;
}

const sortingList: SortListItem[] = [
  { name: 'сначала популярные', sortProperty: SortProperty.RATING_DESC },
  { name: 'популярность (↑)', sortProperty: SortProperty.PRICE_ASC },
  { name: 'цене (по возрастанию)', sortProperty: SortProperty.PRICE_ASC },
  { name: 'цене (по убыванию)', sortProperty: SortProperty.PRICE_DESC },
  { name: 'алфавиту (А-Я)', sortProperty: SortProperty.TITLE_ASC },
  { name: 'алфавиту (Я-А)', sortProperty: SortProperty.TITLE_DESC },
];

export { URL, sortingList };
