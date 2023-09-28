import { Route, Routes } from 'react-router-dom';
import './App.css';
import './scss/app.scss';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Loadable from 'react-loadable';

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Идет загрузка корзины</div>,
});

const FullPizza = Loadable({
  loader: () => import(/*webpackChunkName: "FullPizza" */ './pages/FullPizza'),
  loading: () => <div>Идет загрузка страницы...</div>,
});

const NotFound = Loadable({
  loader: () => import(/*webpackChunkName: "NotFound" */ './pages/NotFound'),
  loading: () => <div>Идет загрузка страницы...</div>,
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
