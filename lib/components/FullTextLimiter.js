'use strict';

import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const FullTextLimiter = ({ fullText, onLimitFullText, onSearch }) => (
    <div className="full-text-limiter">
        <h5>
            Texte Intégral
            <RcCheckbox
                onChange={(e, fullText) => onLimitFullText(!fullText)}
                onClick={e => console.log(e)}
                checked={fullText ? 1 : 0}
            />
        </h5>
    </div>
);

FullTextLimiter.propTypes = {
    onLimitFullText: PropTypes.func.isRequired,
    fullText: PropTypes.bool.isRequired
};

export default FullTextLimiter;
