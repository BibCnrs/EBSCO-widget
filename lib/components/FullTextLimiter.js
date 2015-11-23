'use strict';

import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const FullTextLimiter = ({ fullText, onLimitFullText }) => (
    <div>
        <label>Texte Intégral</label>
        <RcCheckbox
            onChange={(e, fullText) => onLimitFullText(!fullText)}
            checked={fullText ? 1 : 0}
        />
    </div>
);

FullTextLimiter.propTypes = {
    onLimitFullText: PropTypes.func.isRequired,
    fullText: PropTypes.bool.isRequired
};

export default FullTextLimiter;
