import React, { PropTypes } from 'react';
import ReactSelect from 'react-select';
import Button from './Button';

const Select = ({ label, values, choices, id, changeValue, applyValue }) => {
    return (
        <div className="select">
            <label>
                <h5>{label}</h5>
                <div className="selector">
                    <ReactSelect
                        multi={true}
                        value={values}
                        searchable={true}
                        clearable={true}
                        options={choices}
                        onBlur={() => applyValue(id)}
                        onChange={(data) => {
                            return changeValue(id, data || []);
                        }}
                    />
                    <Button label="" icon={{ name: 'search' }} onClick={() => applyValue(id) }/>
                </div>
            </label>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    choices: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    applyValue: PropTypes.func.isRequired
};

export default Select;
