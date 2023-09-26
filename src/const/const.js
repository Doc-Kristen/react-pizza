const URL = 'https://6512ba04b8c6ce52b39618e8.mockapi.io/';

const sortingList = [
  { name: 'сначала популярные', sortProperty: 'rating' },
  { name: 'популярность (↑)', sortProperty: '-rating' },
  { name: 'цене (по возрастанию)', sortProperty: '-price' },
  { name: 'цене (по убыванию)', sortProperty: 'price' },
  { name: 'алфавиту (А-Я)', sortProperty: 'title' },
  { name: 'алфавиту (Я-А)', sortProperty: '-title' },
];

export { URL, sortingList };
