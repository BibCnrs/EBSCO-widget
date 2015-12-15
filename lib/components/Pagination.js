import React, { PropTypes } from 'react';
import Button from './Button';

const Pagination = ({ currentPage, maxPage, changePage }) => (
    <div className="pagination">
        <Button
            label='Previous'
            className='previous'
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
            icon={{ name: 'chevron-left'}}
        />
        <p className="current">{currentPage}/{maxPage}</p>
        <Button
            label='Next'
            className='next'
            disabled={currentPage === maxPage}
            onClick={() => changePage(currentPage + 1)}
            icon={{ name: 'chevron-right'}}
        />
    </div>
);

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
};

export default Pagination;
