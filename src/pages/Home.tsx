import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { sortingList } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import { selectFilter, setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { Status, fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const defaultItemCount = 6;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const sortType = sort.sortProperty;

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

  const skeletones = [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />);
  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

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
        setFilters({
          searchValue: params.search as string,
          categoryId: Number(params.category),
          currentPage: currentPage,
          sort: sort || sortingList[0],
        })
      );
      isSearch.current = true;
    }
  }, [currentPage, dispatch]);

  React.useEffect(() => {
    if (!isSearch.current) {

      const getPizzas = async () => {
        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        const page = currentPage.toString();

        dispatch(fetchPizzas({
          sortBy,
          order,
          category,
          search,
          currentPage: page
        }));
      };
      getPizzas();
      window.scrollTo(0, 0);
    }
    isSearch.current = false;
  }, [categoryId, currentPage, dispatch, searchValue, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {
        status === Status.ERROR ? (<div className='content__error-info'>
          <h1>Пиццы не найдены:(</h1>
          <p>Проверьте корректность запроса или попробуйте позже.</p>
        </div>) : (<div className="content__items"> {status === Status.SUCCESS ? pizzas : skeletones}</div>)
      }
      <Pagination
        currentPage={currentPage}
        onPageChange={onChangePage} />
    </>
  )
}

export default Home;