import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Button } from 'react-bootstrap';

import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipButton = addTooltip(Button);

export const BibButton = ({ label, bsStyle, bsSize, tooltip, tooltipPlacement, disabled, icon, onClick, className, block }) => {
    return (
        <TooltipButton
            block={block}
            className={className}
            disabled={disabled}
            bsStyle={bsStyle}
            bsSize={bsSize}
            tooltipPlacement={tooltipPlacement}
            tooltip={tooltip}
            onClick={e => onClick(e)}
        >
            {icon ? <Icon {...icon}/> : null} {label.charAt(0).toUpperCase() + label.slice(1)}
        </TooltipButton>
    );
};

BibButton.propTypes = {
    label: PropTypes.string,
    bsStyle: PropTypes.string,
    bsSize: PropTypes.string,
    tooltip: PropTypes.string,
    tooltipPlacement: PropTypes.string,
    className: PropTypes.string,
    block: PropTypes.bool,
    icon: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

BibButton.defaultProps = {
    label: '',
    bsStyle: 'primary',
    tooltipPlacement: 'bottom',
    block: false
};

export default BibButton;
