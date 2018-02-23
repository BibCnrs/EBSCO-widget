import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import addTooltip from '../higherOrderComponents/addTooltip';

const ShowResultButton = ({ resultShown, showResult, text }) => (
    <BibButton
        className="show-result"
        bsStyle="link"
        icon={{
            name: resultShown ? 'angle-double-down' : 'angle-double-right',
        }}
        onClick={() => showResult(!resultShown)}
        tooltip={resultShown ? text.closeTooltip : text.openTooltip}
    />
);

ShowResultButton.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    showResult: PropTypes.func.isRequired,
    text: PropTypes.object,
};

ShowResultButton.defaultProps = {
    text: {
        openTooltip: 'Afficher les résultats de la dernière requête',
        closeTooltip: 'Masquer les résultats de la dernière requête',
    },
};

export default compose(addTooltip, translate)(ShowResultButton);
