import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const SelectButton = ({ value, choices, onChange, onToggle, pullLeft, pullRight, bsStyle, className }) => (
    <DropdownButton
        bsStyle={bsStyle}
        className={`select-button ${className}`}
        id="sort"
        name="sort"
        title={value}
        onToggle={onToggle}
        pullRight={pullRight}
        pullLeft={pullLeft}
    >
        {choices.map(({value, label}, index) => (
            <MenuItem
                id={value}
                onClick={() => onChange(value)}
                key={index}
                value={value}
            >{label}</MenuItem>))}
    </DropdownButton>
);

SelectButton.propTypes = {
    choices: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SelectButton;
