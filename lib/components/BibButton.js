import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const BibButton = ({ label, bsStyle, bsSize, tooltip, tooltipPlacement, disabled, icon, onClick, className, block }) => {
    return tooltip ? (
        <OverlayTrigger
            placement={tooltipPlacement}
            overlay={<Tooltip id={tooltip}>{ tooltip }</Tooltip>}>
            <Button
                block={block}
                className={className}
                disabled={disabled}
                bsStyle={bsStyle}
                bsSize={bsSize}
                onClick={e => onClick(e)}
            >
                {icon ? <Icon {...icon}/> : null} {label.charAt(0).toUpperCase() + label.slice(1)}
            </Button>
        </OverlayTrigger>
    ) : (
        <Button
            block={block}
            className={className}
            disabled={disabled}
            bsStyle={bsStyle}
            bsSize={bsSize}
            onClick={e => onClick(e)}
        >
            {icon ? <Icon {...icon}/> : null} {label.charAt(0).toUpperCase() + label.slice(1)}
        </Button>
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
