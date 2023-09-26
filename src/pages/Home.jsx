import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { sortingList } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const defaultItemCount = 6;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { searchValue } = React.useContext(SearchContext);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const { items, status } = useSelector(state => state.pizza);

  const sortType = sort.sortProperty;
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletones = [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />);
  const onChangePage = number => dispatch(setCurrentPage(number));

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(fetchPizzas({
      sortBy,
      order,
      category,
      search,
      currentPage
    }));
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;

  }, [categoryId, sort.sortProperty, currentPage, navigate]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortingList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(
        setFilters({ ...params, sort })
      );
      isSearch.current = true;
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
      window.scrollTo(0, 0);
    }
    isSearch.current = false;
  }, [categoryId, currentPage, searchValue, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === 'error' ? (<div className='content__error-info'>
          <h1>Ошибка загрузки:(</h1>
          <p>Повторите запрос или зайдите позже.</p>
        </div>) : (<div className="content__items"> {status === 'success' ? skeletones : pizzas}</div>)
      }
      <Pagination
        setCurrentPage={currentPage}
        onPageChange={onChangePage} />
    </>
  )
}

export default Home;