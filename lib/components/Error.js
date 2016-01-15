import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const Error = ({ error, clearError }) => {
    if (!error) {
        return <span></span>;
    }
    return (
        <div onClick={() => clearError()} className="error">
            <Icon name="exclamation-triangle"/>
            {error || 'The search failed.'}
        </div>
    );
};

Error.propTypes = {
    error: PropTypes.string,
    clearError: PropTypes.func.isRequired
};

export default Error;
