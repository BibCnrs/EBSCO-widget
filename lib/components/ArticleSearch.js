import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import ArticleSearchInputList from '../containers/ArticleSearchInputList';
import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

const ArticleSearch = ({ status, error, term, domain, text, onSearchTerm }) => {
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
                    label={text.buttonLabel}
                />
            </Col>
        </Row>
    );
};

ArticleSearch.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    onSearchTerm: PropTypes.func.isRequired
};

ArticleSearch.defaultProps = {
    text: {
        buttonLabel: 'Rechercher'
    }
};

export default translate(ArticleSearch, 'ArticleSearch');
