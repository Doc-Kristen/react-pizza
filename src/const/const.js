const URL = 'https://64ff2265f8b9eeca9e29ab12.mockapi.io';

const sortingList = [
  { name: 'сначала популярные', sortProperty: 'rating' },
  { name: 'популярность (↑)', sortProperty: '-rating' },
  { name: 'цене (по возрастанию)', sortProperty: '-price' },
  { name: 'цене (по убыванию)', sortProperty: 'price' },
  { name: 'алфавиту (А-Я)', sortProperty: 'title' },
  { name: 'алфавиту (Я-А)', sortProperty: '-title' },
];

export { URL, sortingList };
