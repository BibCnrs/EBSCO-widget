import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import BibButton from './BibButton';

const SearchMenu = ({ resultShown, historyShown, showHistory, showResult }) => {

    return (
        <Row className="search-menu">
            <Col md={2}>
                <BibButton
                    label="résultats"
                    icon={{ name: resultShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showResult(!resultShown)}
                />
            </Col>
            <Col md={2}>
                <BibButton
                    label="historique"
                    icon={{ name: historyShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showHistory(!historyShown)}
                />
            </Col>
        </Row>
    );
};

SearchMenu.propTypes = {
};

export default SearchMenu;
