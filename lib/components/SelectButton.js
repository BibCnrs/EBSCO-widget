import React, { PropTypes } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const SelectButton = ({ value, choices, pullLeft, pullRight, bsStyle, className, tooltip, onChange, onToggle }) => {
    if(tooltip) {
        return (
            <OverlayTrigger
                placement="right"
                overlay={<Tooltip id={tooltip}>{tooltip}</Tooltip>}
            >
                <DropdownButton
                    bsStyle={bsStyle}
                    className={`select-button ${className}`}
                    id="select"
                    name="select"
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
            </OverlayTrigger>
        );
    }

    return (
        <DropdownButton
            bsStyle={bsStyle}
            className={`select-button ${className}`}
            id="select"
            name="select"
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
};

SelectButton.propTypes = {
    value: PropTypes.node.isRequired,
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
