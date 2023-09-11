import React from 'react';
import styles from './NotFoundComponent.module.scss';

const NotFoundComponent = () => {
    return (
        <div className={styles.root}>
            <h1> Ничего не найдено :(</h1>
        </div>
    )
};

export default NotFoundComponent;
