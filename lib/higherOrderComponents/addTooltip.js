import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function addTooltip(Component) {

    const ComponentWithTooltip = (props) => {
        const { tooltip, tooltipPlacement, ...componentProps } = props;
        if(!tooltip) {
            return <Component {...componentProps}/>;
        }
        return (
            <OverlayTrigger
                placement={tooltipPlacement}
                overlay={<Tooltip id={tooltip.replace(' ', '_')}>{ tooltip }</Tooltip>}
            >
                <Component {...componentProps} />
            </OverlayTrigger>
        );
    };

    ComponentWithTooltip.propTypes = {
        tooltip: PropTypes.string,
        tooltipPlacement: PropTypes.string
    };

    ComponentWithTooltip.defaulpropTypes = {
        tooltipPlacement: 'bottom'
    };

    return ComponentWithTooltip;
}
