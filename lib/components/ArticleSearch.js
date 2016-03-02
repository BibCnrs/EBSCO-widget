import React, { Component, PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import ArticleSearchInputList from '../containers/ArticleSearchInputList';
import FetchButton from './FetchButton';

class ArticleSearch extends Component {
    constructor(props) {
        super(props);
        const { status, term, domain, domains, onSearchTerm, onChangeTerm, onChangeDomain } = this.props;
        if (domains.indexOf(domains) !== -1) {
            onChangeDomain(domain);
        }
        if (status === 'NONE') {
            if (term) {
                onChangeTerm(term);
                onSearchTerm(term);
            }
        }
    }
    render() {
        const { status, error, term, domain, onSearchTerm } = this.props;

        return (
            <Row className="search">
                <Col md={10}>
                    <ArticleSearchInputList/>
                </Col>
                <Col md={2}>
                    <FetchButton
                        disabled={!term}
                        onClick={() => onSearchTerm(term, domain)}
                        status={status}
                        error={error}
                        icon="search"
                        label="Rechercher"
                    />
                </Col>
            </Row>
        );
    }
}

ArticleSearch.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    onSearchTerm: PropTypes.func.isRequired
};

export default ArticleSearch;
