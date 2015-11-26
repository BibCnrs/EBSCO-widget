'use strict';

import React, { PropTypes } from 'react';
import Select from 'react-select';

const InputLimiter = ({ limiter, label, value, choices, onChange, onLimit }) => (
    <div className="select-limiter">
        <label>
            <h5>{label}</h5>
            <Select
                searchable={true}
                options={choices.map((choice) => ({ value: choice, label: choice}))}
                value={value}
                onChange={(value) => (onChange(limiter, value), onLimit())}
            />
        </label>
    </div>
);

InputLimiter.propTypes = {
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    limiter: PropTypes.string.isRequired
};

export default InputLimiter;
