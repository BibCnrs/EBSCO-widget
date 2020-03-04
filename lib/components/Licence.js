import React from 'react';
import PropTypes from 'prop-types';
import translate from '../higherOrderComponents/translate';

const Licence = () => {
    return (
        <div>
            <h4>Page de licence</h4>
            <p>Ensemble du texte de licence...</p>
        </div>
    );
};

Licence.propTypes = {
    text: PropTypes.object,
};

export default translate(Licence);
