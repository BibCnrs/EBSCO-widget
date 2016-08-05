import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import BibButton from './BibButton';

const PublicationSearchMenu = ({ resultShown, showResult }) => {

    return (
        <Row className="search-menu">
            <Col md={2}>
                <BibButton
                    bsStyle="link"
                    icon={{ name: resultShown ? 'angle-double-down' : 'angle-double-right' }}
                    onClick={() => showResult(!resultShown)}
                />
            </Col>
        </Row>
    );
};

PublicationSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired
};

export default PublicationSearchMenu;
