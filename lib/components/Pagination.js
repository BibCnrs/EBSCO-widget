import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import getPagination from '../services/getPagination';

const Pagination = ({ currentPage, maxPage, loadPage }) => {

    const pages = getPagination(currentPage, maxPage);

    return (
        <span className="pagination">
            <a
                href='#'
                className='previous'
                onClick={() => currentPage > 1 && loadPage(currentPage - 1)}
            >
                <Icon name='backward' />
            </a>
            { pages.map((page, index) => {
                if(page === currentPage) {
                    return (
                        <span
                            className="current page"
                            key={index}
                        >{page}</span>
                    );
                }
                return (
                    <a
                        key={index}
                        href="#"
                        onClick={() => loadPage(page)}
                        className="page"
                    >{page}</a>
                );
            })}

            <a
                href='#'
                className='next'
                onClick={() => currentPage < maxPage && loadPage(currentPage + 1)}
            >
                <Icon name='forward' />
            </a>
        </span>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    loadPage: PropTypes.func.isRequired
};

export default Pagination;
