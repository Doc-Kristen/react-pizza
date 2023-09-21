import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

const Pagination = ({ setCurrentPage, onPageChange }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => onPageChange(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={setCurrentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
}

export default Pagination;