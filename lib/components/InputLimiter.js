'use strict';

import React, { PropTypes } from 'react';

const InputLimiter = ({ limiter, label, value, onChange, onLimit }) => (
    <div className="input-limiter">
        <h5>
            {label}
            <input
                type="text"
                onChange={(e) => onChange(limiter, e.target.value)}
                onBlur={() => onLimit()}
                checked={value ? 1 : 0}
            />
        </h5>
    </div>
);

InputLimiter.propTypes = {
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.bool.isRequired,
    limiter: PropTypes.string.isRequired
};

export default InputLimiter;
