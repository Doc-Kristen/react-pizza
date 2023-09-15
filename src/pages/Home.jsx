import React from 'react';

import { URL, sortingList } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
    const defaultItemCount = 6;
    const defaultSortType = sortingList[0];

    const { searchValue } = React.useContext(SearchContext);
    const [isLoading, setIsloading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState(defaultSortType);
    const [currentPage, setCurrentPage] = React.useState(1);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletones = [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />);
    React.useEffect(() => {
        setIsloading(true);
        fetch(`${URL}?page=${currentPage}&limit=3${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsloading(false);
            });
        window.scrollTo(0, 0);
    }, [category, categoryId, order, sortBy, sortType, search, currentPage]);
    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onClickSortType={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeletones : pizzas}
            </div>
            <Pagination
                pageCount={4}
                onPageChange={(number) => setCurrentPage(number)} />
        </>
    )
}

export default Home;