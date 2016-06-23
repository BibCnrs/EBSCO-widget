import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Search = ({ status, error, term, domain, text, onSearchTerm, SearchInput }) => {
    return (
        <Row className="search">
            <Col md={10}>
                <SearchInput/>
            </Col>
            <Col md={2}>
                <FetchButton
                    disabled={!term}
                    onClick={() => onSearchTerm(term, domain)}
                    status={status}
                    error={error}
                    icon="search"
                    label={text.search}
                />
            </Col>
        </Row>
    );
};

Search.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    text: PropTypes.obkect,
    onSearchTerm: PropTypes.func.isRequired,
    SearchInput: PropTypes.component.isRequired
};

Search.defaultProps = {
    text: {
        search: 'Rechercher'
    }
};

export default translate(Search, 'Search');
