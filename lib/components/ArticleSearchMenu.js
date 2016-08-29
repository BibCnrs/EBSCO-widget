import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import BatchExport from '../containers/BatchExport';

const ArticleSearchMenu = ({ resultShown, hasHistory, historyShown, text, showHistory, showResult }) => {

    return (
        <div className="search-menu">
            {
                hasHistory ? (
                    <BibButton
                        className="history"
                        bsStyle="link"
                        bsSize="xs"
                        label={`${historyShown ? text.hide : text.show} ${text.history}`.toUpperCase()}
                        icon={{ name: 'history' }}
                        onClick={() => showHistory(!historyShown)}
                    />
                ) : null
            }
            <BatchExport/>
            <BibButton
                className="show-result"
                bsStyle="link"
                icon={{ name: resultShown ? 'angle-double-down' : 'angle-double-right' }}
                onClick={() => showResult(!resultShown)}
            />
        </div>
    );
};

ArticleSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    hasHistory: PropTypes.bool.isRequired,
    historyShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showHistory: PropTypes.func.isRequired,
    showResult: PropTypes.func.isRequired
};

ArticleSearchMenu.defaultProps = {
    text:{
        results: 'résultats',
        history: 'l\'historique',
        show: 'afficher',
        hide: 'cacher'
    }
};

export default translate(ArticleSearchMenu);
