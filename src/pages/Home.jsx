import React from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { URL, sortingList } from '../const/const';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
    const defaultItemCount = 6;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { searchValue } = React.useContext(SearchContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = React.useState([]);
    

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const sortType = sort.sortProperty;
    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    };

    const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
    const skeletones = [...new Array(items.length || defaultItemCount)].map((_, index) => <Skeleton key={index} />);
    const onChangePage = number => dispatch(setCurrentPage(number));

    React.useEffect(() => {
      window.scrollTo(0, 0);
      if (!isSearch.current) {
        setIsLoading(true);
          const order = sortType.includes('-') ? 'asc' : 'desc';
          const sortBy = sortType.replace('-', '');
          const category = categoryId > 0 ? `category=${categoryId}` : '';
          const search = searchValue ? `&search=${searchValue}` : '';

          axios.get(`${URL}/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`).then((res) => {
              setItems(res.data);
              setIsLoading(false);
          });
      }
      isSearch.current = false;
  }, [categoryId, currentPage, searchValue, sortType]);

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
                setCurrentPage={currentPage}
                onPageChange={onChangePage} />
        </>
    )
}

export default Home;