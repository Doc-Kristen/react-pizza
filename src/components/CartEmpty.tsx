import React from 'react'
import { Link } from 'react-router-dom'
import imageUrl from '../assets/img/empty-cart.png';

const CartEmpty : React.FC = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>Корзина пустая 😕</h2>
                <p>
                    Вероятней всего, вы не заказывали ещё пиццу.<br />
                    Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img src={imageUrl} alt="Empty cart" />
                <Link to="/" className="button button--orange">
                    <span>Вернуться назад</span>
                </Link>
            </div>
        </>
    )
}

export default CartEmpty;
