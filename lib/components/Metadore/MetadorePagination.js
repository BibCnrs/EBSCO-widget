import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Icon from 'react-fa';

const getPages = (currentPage, maxVisitedPage) => {
    if (currentPage > 2 && maxVisitedPage - currentPage > 2) {
        return [...Array(5).keys()].map(i => i + currentPage - 2);
    }
    return [...Array(maxVisitedPage).keys()].map(i => i + 1).slice(-5);
};

const MetadorePagination = ({ currentPage, maxPage, loadPage }) => {
    const [maxVisitedPage, setMaxVisitedPage] = useState(currentPage);
    useEffect(() => {
        if (currentPage > maxVisitedPage) {
            setMaxVisitedPage(currentPage);
        }
    }, [currentPage, maxVisitedPage]);
    const pages = getPages(currentPage, maxVisitedPage);
    return (
        <span className="pagination">
            {currentPage > 1 && (
                <a
                    href="#"
                    className="previous"
                    onClick={() => loadPage(currentPage - 1)}
                >
                    <Icon name="backward" />
                </a>
            )}
            {pages.map((page, index) => {
                if (page === currentPage) {
                    return (
                        <span className="current page" key={index}>
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
                    >
                        {page}
                    </a>
                );
            })}
            {currentPage < maxPage && (
                <a
                    href="#"
                    className="next"
                    onClick={() => loadPage(currentPage + 1)}
                >
                    <Icon name="forward" />
                </a>
            )}
        </span>
    );
};

MetadorePagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    maxPage: PropTypes.number.isRequired,
    loadPage: PropTypes.func.isRequired,
};

export default MetadorePagination;
