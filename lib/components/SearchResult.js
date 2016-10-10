import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Row, Col } from 'react-bootstrap';
import Icon from 'react-fa';

export const SearchResult = ({ maxPage, first, last, totalHits, pageSelected, selectPage, status, category, Pagination, SortSelector, RecordList, ResultsPerPageSelector, ExactMatchPlacard }) => {
    return (
        maxPage ? (
            <div className="search-result">
                {
                    ExactMatchPlacard ? (
                        <ExactMatchPlacard/>
                    ) : <span/>
                }
                <Row className="header">
                    <Col md={9}>
                        { category === 'article' ? (
                            <input
                                type="checkbox"
                                value={pageSelected}
                                checked={pageSelected}
                                onChange={() => selectPage(first, last)}
                            />
                        ) : (<span/>)}
                        <span className="search-count">
                            {first || 0} - {last || 0} / {totalHits}
                        </span>
                        <Pagination/>
                        <ResultsPerPageSelector/>
                    </Col>
                    <Col md={3}>
                        { SortSelector ? <SortSelector/> : null }
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                    {
                        status === 'PENDING' ? (
                            <div><Icon name="spinner" spin={true} size="2x"/></div>
                        ) : (
                            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                                <RecordList key={first}/>
                            </ReactCSSTransitionGroup>
                        )
                    }
                    </Col>
                </Row>
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
    category: PropTypes.string.isRequired,
    Pagination: PropTypes.func.isRequired,
    SortSelector: PropTypes.func,
    RecordList: PropTypes.func.isRequired,
    ResultsPerPageSelector: PropTypes.func.isRequired,
    ExactMatchPlacard: PropTypes.func
};

export default SearchResult;
