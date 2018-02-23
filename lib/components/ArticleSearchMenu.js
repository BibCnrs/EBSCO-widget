import PropTypes from 'prop-types';
import React from 'react';

import BibButton from './BibButton';
import ShowResultButton from './ShowResultButton';
import translate from '../higherOrderComponents/translate';
import BatchExport from '../containers/BatchExport';

const ArticleSearchMenu = ({
    resultShown,
    hasHistory,
    historyShown,
    text,
    showHistory,
    showResult,
}) => {
    return (
        <div className="search-menu">
            {historyShown || hasHistory ? (
                <BibButton
                    className="history"
                    bsStyle="link"
                    bsSize="xs"
                    tooltip={text.historyInfo}
                    label={`${historyShown ? text.hide : text.show} ${
                        text.history
                    }`.toUpperCase()}
                    icon={{ name: 'history' }}
                    onClick={() => showHistory(!historyShown)}
                />
            ) : null}
            <BatchExport />
            <ShowResultButton
                showResult={showResult}
                resultShown={resultShown}
                tooltip={text.showResultTooltip}
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
    showResult: PropTypes.func.isRequired,
};

ArticleSearchMenu.defaultProps = {
    text: {
        results: 'résultats',
        history: "l'historique",
        historyInfo: "Consulter l'historique de vos recherche.",
        show: 'afficher',
        hide: 'cacher',
    },
};

export default translate(ArticleSearchMenu);
