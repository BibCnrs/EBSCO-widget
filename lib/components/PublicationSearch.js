import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import PublicationSearchInput from '../containers/PublicationSearchInput';
import FetchButton from './FetchButton';

const PublicationSearch = ({ status, error, term, domain, onSearchTerm }) => {

    return (
        <Row className="search">
            <Col md={10}>
                <PublicationSearchInput/>
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
};

PublicationSearch.propTypes = {
    status: PropTypes.string,
    error: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    onSearchTerm: PropTypes.func.isRequired
};

export default PublicationSearch;