import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const SelectButton = ({ value, choices, onChange, pullLeft, pullRight, bsStyle }) => (
    <DropdownButton
        bsStyle={bsStyle}
        className="select-button"
        id="sort"
        name="sort"
        title={value}
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
