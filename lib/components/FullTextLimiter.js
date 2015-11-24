'use strict';

import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const FullTextLimiter = ({ fullText, onLimitFullText }) => (
    <div>
        <RcCheckbox
            onChange={(e, fullText) => onLimitFullText(!fullText)}
            checked={fullText ? 1 : 0}
        />
        <label>Texte Intégral</label>
    </div>
);

FullTextLimiter.propTypes = {
    onLimitFullText: PropTypes.func.isRequired,
    fullText: PropTypes.bool.isRequired
};

export default FullTextLimiter;
