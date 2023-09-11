import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { URL } from '../const/const';

const Home = () => {
    const [isLoading, setIsloading] = React.useState(true);
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsloading(false);
            });
    }, []);
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading
                    ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                    : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
            </div>
        </>
    )
}

export default Home
