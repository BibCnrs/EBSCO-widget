import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import FetchButton from './FetchButton';
import translate from '../higherOrderComponents/translate';

export const Search = ({ status, term, text, onSearch, SearchInput }) => {
    return (
        <Row className="search">
            <Col md={8}>
                <SearchInput/>
            </Col>
            <Col md={2}>
                <FetchButton
                    disabled={!term}
                    onClick={() => onSearch()}
                    status={status}
                    icon="search"
                    label={text.search}
                />
            </Col>
        </Row>
    );
};

Search.propTypes = {
    status: PropTypes.string,
    term: PropTypes.string.isRequired,
    domain: PropTypes.string,
    text: PropTypes.object,
    onSearch: PropTypes.func.isRequired,
    SearchInput: PropTypes.func.isRequired
};

Search.defaultProps = {
    text: {
        search: 'Rechercher'
    }
};

export default translate(Search, 'Search');
