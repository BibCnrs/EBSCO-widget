import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';
import { Button } from 'react-bootstrap';

import addTooltip from '../higherOrderComponents/addTooltip';
const TooltipButton = addTooltip(Button);

export const BibButton = ({
    label,
    icon,
    image,
    ...props,
}) => {
    return (
        <TooltipButton
            {...props}
        >
            {icon ? <Icon {...icon} /> : null}
            {image ? <img src={image} /> : null}
            {' '}
            {label.charAt(0).toUpperCase() + label.slice(1)}
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
    image: PropTypes.string,
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
