export type FethchPizzasArgs = {
    sortBy: string;
    order: string;
    category: string;
    search: string;
    currentPage: string;
};

export type PizzaItem = {
    id: string;
    imageUrl: string;
    title: string;
    types: number[];
    sizes: number[];
    price: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export interface pizzaSliceState {
    items: PizzaItem[],
    status: Status,
}