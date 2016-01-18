import React, { PropTypes } from 'react';
import Select from 'react-select';

const SelectLimiter = ({ limiter, label, value, choices, onChange, onLimit }) => (
    <div className="select-limiter">
        <label>
            <h5>{label}</h5>
            <Select
                multi={true}
                searchable={true}
                options={choices.map((choice) => ({ value: choice, label: choice}))}
                value={value}
                onChange={(data) => (onChange(limiter, data ? data.map(datum => datum.value) : []), onLimit())}
            />
        </label>
    </div>
);

SelectLimiter.propTypes = {
    limiter: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired,
    onLimit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectLimiter;
