import React, { PropTypes, Component } from 'react';
import Icon from 'react-fa';
import NumberInput from './NumberInput';

const Pagination = ({ currentPage, targetPage, maxPage, changePage, loadPage }) => {
    return (
        <div className="pagination">
            <a
                href='#'
                className='first'
                onClick={() => currentPage > 1 && loadPage(1)}
            >
                <Icon name='fast-backward' />
            </a>
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
            <a
                href='#'
                className='last'
                onClick={() => currentPage < maxPage && loadPage(maxPage)}
            >
                <Icon name='fast-forward' />
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
