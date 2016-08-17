import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col } from 'react-bootstrap';
import Icon from 'react-fa';

export const SearchResult = ({ maxPage, first, last, totalHits, pageSelected, selectPage, status, Pagination, SortSelector, RecordList, ResultsPerPageSelector }) => {
    return (
        maxPage ? (
            <div className="search-result">
                <Row className="header">
                    <Col md={1}>
                        <input
                            type="checkbox"
                            value={pageSelected}
                            checked={pageSelected}
                            onChange={() => selectPage(first, last)}
                        />
                    </Col>
                    <Col md={2} className="search-count">
                        {first || 0} - {last || 0} / {totalHits}
                    </Col>
                    <Col md={3}>
                        <Pagination/>
                    </Col>
                    <Col md={2}>
                        { SortSelector ? <SortSelector/> : null }
                    </Col>
                    <Col md={1}>
                        <ResultsPerPageSelector/>
                    </Col>
                </Row>
                {
                    status === 'PENDING' ? (
                        <div><Icon name="spinner" spin={true} size="2x"/></div>
                    ) : (
                        <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                            <RecordList key={first}/>
                        </ReactCSSTransitionGroup>
                    )
                }
                <Pagination/>
            </div>
        ) : (
            <div className="search-result">
            {
                status === 'PENDING' ? (
                    <div className="spinner"><Icon name="spinner" spin={true} size="2x"/></div>
                ) : (
                    <div></div>
                )
            }
            </div>
        )
    );
};

SearchResult.propTypes = {
    currentPage: PropTypes.number,
    maxPage: PropTypes.number.isRequired,
    first: PropTypes.number,
    last: PropTypes.number,
    totalHits: PropTypes.number,
    pageSelected: PropTypes.bool.isRequired,
    selectPage: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    Pagination: PropTypes.func.isRequired,
    SortSelector: PropTypes.func,
    RecordList: PropTypes.func.isRequired,
    ResultsPerPageSelector: PropTypes.func.isRequired
};

export default SearchResult;
