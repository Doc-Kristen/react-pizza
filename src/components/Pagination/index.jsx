import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount, onPageChange }) => {
    return (
        <ReactPaginate
            className={styles.root}
            pageClassName={styles.item}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            pageLinkClassName={styles.link}
            disabledLinkClassName={styles.disabled}
            breakLabel="..."
            nextLabel=">"
            activeLinkClassName={styles.active}
            onPageChange={(e) => onPageChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;