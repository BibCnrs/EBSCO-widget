import React, { PropTypes } from 'react';

import DropdownButton from './DropdownButton';
import MenuItem from './MenuItem';

const SelectButton = ({ value, choices, pullLeft, pullRight, bsStyle, className, tooltip, onChange, onToggle }) => {
    return (
        <DropdownButton
            bsStyle={bsStyle}
            className={`select-button ${className}`}
            id="select"
            name="select"
            title={value}
            tooltip={tooltip}
            tooltipPlacement="top"
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
};

SelectButton.propTypes = {
    value: PropTypes.node,
    choices: PropTypes.array.isRequired,
    pullLeft: PropTypes.bool,
    pullRight: PropTypes.bool,
    bsStyle: PropTypes.string,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func
};

export default SelectButton;
