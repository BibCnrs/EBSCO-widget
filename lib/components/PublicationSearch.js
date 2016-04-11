import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import PublicationSearchInput from '../containers/PublicationSearchInput';
import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

const PublicationSearch = ({ status, error, term, domain, text, onSearchTerm }) => {

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
                    label={text.search}
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

PublicationSearch.defaultProps = {
    text: {
        search: 'Rechercher'
    }
};

export default translate(PublicationSearch);
