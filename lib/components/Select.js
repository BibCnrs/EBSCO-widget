import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';

import BibButton from './BibButton';
import applyIfChange from '../higherOrderComponents/applyIfChange';

const Select = ({ label, value, choices, id, onChange, onApply }) => {
    return (
        <div className="select">
            <label>
                {label}
                <div className={`selector input-group ${id}`}>
                    <ReactSelect
                        multi={true}
                        value={value}
                        searchable={true}
                        clearable={true}
                        options={choices}
                        onBlur={() => onApply(id)}
                        onChange={(data) => {
                            return onChange(id, data.map(({ value }) => value) || []);
                        }}
                    />
                    <BibButton
                        className="input-group-addon"
                        bsStyle="default"
                        icon={{ name: 'search' }}
                        onClick={() => onApply(id) }
                    />
                </div>
            </label>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onApply: PropTypes.func.isRequired
};

export default applyIfChange(Select);
