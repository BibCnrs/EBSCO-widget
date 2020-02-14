import PropTypes from 'prop-types';
import React from 'react';

import DropdownButton from './DropdownButton';
import MenuItem from './MenuItem';

const SelectButton = ({
    value,
    choices,
    hidden,
    pullRight,
    bsStyle,
    className,
    tooltip,
    onChange,
    onToggle,
}) => {
    if (hidden) {
        return <span />;
    }
    return (
        <DropdownButton
            bsStyle={bsStyle}
            className={`select-button ${className || ''}`}
            id="select"
            name="select"
            title={value}
            tooltip={tooltip}
            tooltipPlacement="top"
            onToggle={onToggle}
            pullRight={pullRight}
        >
            {choices.map(({ value, label }, index) => (
                <MenuItem
                    id={value}
                    onClick={() => onChange(value)}
                    key={index}
                    value={value}
                >
                    {label}
                </MenuItem>
            ))}
        </DropdownButton>
    );
};

SelectButton.propTypes = {
    value: PropTypes.node,
    choices: PropTypes.array.isRequired,
    hidden: PropTypes.bool,
    pullRight: PropTypes.bool,
    bsStyle: PropTypes.string,
    className: PropTypes.string,
    tooltip: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onToggle: PropTypes.func,
};

SelectButton.defaultProps = {
    hidden: false,
};

export default SelectButton;
