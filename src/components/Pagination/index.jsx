import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ pageCount, handlePageClick }) => {
    return (
        <ReactPaginate
            className={styles.root}
            pageClassName={styles.item}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            pageLinkClassName={styles.link}
            disabledLinkClassName={styles.disabled}
            activeLinkClassName={styles.active}
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;
