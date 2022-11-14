import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';
import translate from '../higherOrderComponents/translate';
import getPagination from '../services/getPagination';

export const Pagination = ({
    currentPage,
    maxPage,
    resultsPerPage,
    maxResult,
    loadPage,
    text,
}) => {
    if (resultsPerPage && maxResult) {
        maxPage = Math.ceil(maxResult / resultsPerPage);
    }
    const pages = getPagination(currentPage, maxPage);

    return (
        <span className="pagination">
            <a
                href="#"
                className="previous"
                onClick={() => currentPage > 1 && loadPage(currentPage - 1)}
                aria-label={text.previousPage}
            >
                <Icon name="backward" />
            </a>
            {pages.map((page, index) => {
                if (page === currentPage) {
                    return (
                        <span
                            className="current page"
                            key={index}
                            aria-label={text.currentPage}
                        >
                            {page}
                        </span>
                    );
                }
                return (
                    <a
                        key={index}
                        href="#"
                        onClick={() => loadPage(page)}
                        className="page"
                        aria-label={text.goToPage + ' ' + page}
                    >
                        {page}
                    </a>
                );
            })}

            <a
                href="#"
                className="next"
                onClick={() =>
                    currentPage < maxPage && loadPage(currentPage + 1)
                }
                aria-label={text.nextPage}
            >
                <Icon name="forward" />
            </a>
        </span>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    resultsPerPage: PropTypes.number,
    maxResult: PropTypes.number,
    loadPage: PropTypes.func.isRequired,
    text: PropTypes.object,
};

Pagination.defaultProps = {
    text: {
        previousPage: 'Previous page',
        nextPage: 'Next page',
        goToPage: 'Go to page',
        currentPage: 'Current page',
    },
};

export default translate(Pagination);
