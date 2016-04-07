import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const ArticleSearchMenu = ({ resultShown, historyShown, showHistory, text, showResult }) => {

    return (
        <Row className="search-menu">
            <Col md={2}>
                <BibButton
                    label={text.results}
                    icon={{ name: resultShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showResult(!resultShown)}
                />
            </Col>
            <Col md={2}>
                <BibButton
                    label={text.history}
                    icon={{ name: historyShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showHistory(!historyShown)}
                />
            </Col>
        </Row>
    );
};

ArticleSearchMenu.propTypes = {
};

ArticleSearchMenu.defaultProps = {
    text:{
        results: 'résultats',
        history: 'historique'
    }
};

export default translate(ArticleSearchMenu);
