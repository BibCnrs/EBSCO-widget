import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const PublicationSearchMenu = ({ resultShown, text, showResult }) => {

    return (
        <Row className="search-menu">
            <Col md={2}>
                <BibButton
                    label={text.results}
                    icon={{ name: resultShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showResult(!resultShown)}
                />
            </Col>
        </Row>
    );
};

PublicationSearchMenu.propTypes = {
};

PublicationSearchMenu.defaultProps = {
    text: {
        results: 'résultats'
    }
};

export default translate(PublicationSearchMenu);
