import React from 'react';
import styles from './NotFoundComponent.module.scss';
import { Link } from 'react-router-dom';

const NotFoundComponent = () => {
    return (
        <div className={styles.root}>
            <h1> Ничего не найдено :(</h1>
            <Link to="/" className="button button--black">
                <span>Вернуться на главную страницу</span>
            </Link>
        </div>
    )
};

export default NotFoundComponent;
