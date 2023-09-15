import React from 'react';

import { URL, sortingList } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

const Home = () => {
    const defaultItemCount = 6;
    const defaultSortType = sortingList[0];

    const [isLoading, setIsloading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState(defaultSortType);
    // const []

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    React.useEffect(() => {
        setIsloading(true);
        fetch(`${URL}?${category}&sortBy=${sortBy}&order=${order}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(`${URL}?${category}&sortBy=${sortBy}&order=${order}`);

                setItems(data);
                setIsloading(false);
                console.log(sortType);
            });
        window.scrollTo(0, 0);
    }, [category, categoryId, order, sortBy, sortType]);
    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
                <Sort value={sortType} onClickSortType={(i) => setSortType(i)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />)
                    : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
            <Pagination pageCount={3} handlePageClick={console.log}/>
        </>
    )
}

export default Home
