import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';

const BibButton = ({ label = '', bsStyle = 'primary', bsSize, tooltip, disabled, icon, onClick, className, block = false }) => {
    return tooltip ? (
        <OverlayTrigger placement="bottom" overlay={<Tooltip id={tooltip}>{ tooltip }</Tooltip>}>
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
    tooltip: PropTypes.string,
    icon: PropTypes.object,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default BibButton;
