import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';

import translate from '../higherOrderComponents/translate';

export const Error = ({ type, code, text, clearError }) => {
    if (!type) {
        return <span />;
    }
    setTimeout(clearError, 10000);
    return (
        <div onClick={() => clearError()} className="error">
            <Icon name="exclamation-triangle" />{' '}
            {text[code] || 'The search failed.'}
        </div>
    );
};

Error.propTypes = {
    type: PropTypes.string,
    code: PropTypes.string,
    text: PropTypes.object,
    clearError: PropTypes.func.isRequired,
};

Error.defaultProps = {
    text: {
        noDomain: data =>
            `Vous n'avez pas accès aux notices du domaine "${data.domain}"`,
    },
};

export default translate(Error);
