import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';
import NumberInput from './NumberInput';

const Pagination = ({ currentPage, targetPage, maxPage, changePage, loadPage }) => {
    return (
        <div className="pagination">
            <a
                href='#'
                className='previous'
                onClick={() => currentPage > 1 && loadPage(currentPage - 1)}
            >
                <Icon name='backward' />
            </a>
            <span className="current">
                <NumberInput
                    min={1}
                    max={maxPage}
                    onChange={(value) => changePage(value)}
                    onSubmit={(value) => loadPage(value)}
                    value={targetPage}
                />/{maxPage}</span>
            <a
                href='#'
                className='next'
                onClick={() => currentPage < maxPage && loadPage(currentPage + 1)}
            >
                <Icon name='forward' />
            </a>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    changePage: PropTypes.func.isRequired
};

export default Pagination;
