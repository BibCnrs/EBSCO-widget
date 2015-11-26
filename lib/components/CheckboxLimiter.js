'use strict';

import React, { PropTypes } from 'react';
import RcCheckbox from 'rc-checkbox';

const CheckboxLimiter = ({ label, value, onLimit }) => (
    <div className="checkbox-limiter">
        <h5>
            {label}
            <RcCheckbox
                onChange={(e, value) => onLimit(!value)}
                checked={value ? 1 : 0}
            />
        </h5>
    </div>
);

CheckboxLimiter.propTypes = {
    onLimit: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired
};

export default CheckboxLimiter;
