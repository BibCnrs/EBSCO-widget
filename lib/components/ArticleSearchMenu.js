import React, { PropTypes } from 'react';
import { Row, Col } from 'react-bootstrap';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import BatchExport from '../containers/BatchExport';

const ArticleSearchMenu = ({ resultShown, historyShown, text, showHistory, showResult }) => {

    return (
        <Row className="search-menu">
            <Col md={2}>
                <BibButton
                    label={text.history}
                    icon={{ name: historyShown ? 'eye-slash' : 'eye' }}
                    onClick={() => showHistory(!historyShown)}
                />
            </Col>
            <Col md={2}>
                <BatchExport/>
            </Col>
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

ArticleSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    historyShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showHistory: PropTypes.func.isRequired,
    showResult: PropTypes.func.isRequired
};

ArticleSearchMenu.defaultProps = {
    text:{
        results: 'résultats',
        history: 'historique'
    }
};

export default translate(ArticleSearchMenu);
