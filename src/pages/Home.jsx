import React from 'react';
import { URL } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';

const Home = () => {
    const defaultItemCount = 6;
    const dispatch = useDispatch();

    const { searchValue } = React.useContext(SearchContext);
    const [isLoading, setIsloading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const { categoryId, sort } = useSelector(state => state.filter);
    const sortType = sort.sortProperty;
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletones = [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />);
    React.useEffect(() => {
        setIsloading(true);
        fetch(`${URL}?${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then((res) => res.json())
            .then((data) => {
                setItems(data);
                setIsloading(false);
            });
        window.scrollTo(0, 0);
    }, [category, categoryId, order, sortBy, search, currentPage]);
    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onChangeCategory} />
                <Sort />
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