import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function addTooltip(Component) {

    const ComponentWithTooltip = (props) => {
        const { tooltip, tooltipPlacement } = props;
        if(!tooltip) {
            return <Component {...props}/>;
        }
        return (
            <OverlayTrigger
                placement={tooltipPlacement}
                overlay={<Tooltip id={tooltip.replace(' ', '_')}>{ tooltip }</Tooltip>}
            >
                <Component {...props}/>
            </OverlayTrigger>
        );
    };

    ComponentWithTooltip.propTypes = {
        tooltip: PropTypes.string.isRequired,
        tooltipPlacement: PropTypes.string
    };

    ComponentWithTooltip.defaulpropTypes = {
        tooltipPlacement: 'bottom'
    };

    return ComponentWithTooltip;
}
