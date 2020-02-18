import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function addTooltip(Component) {
    const ComponentWithTooltip = props => {
        const { tooltip, tooltipPlacement, id, ...componentProps } = props;
        if (!tooltip) {
            return <Component id={id} {...componentProps} />;
        }
        return (
            <OverlayTrigger
                placement={tooltipPlacement}
                overlay={
                    <Tooltip
                        id={id ? `${id}-tooltip` : tooltip.replace(' ', '_')}
                    >
                        {tooltip}
                    </Tooltip>
                }
            >
                <Component id={id} {...componentProps} />
            </OverlayTrigger>
        );
    };

    ComponentWithTooltip.propTypes = {
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        tooltip: PropTypes.string,
        tooltipPlacement: PropTypes.string,
    };

    ComponentWithTooltip.defaulpropTypes = {
        tooltipPlacement: 'bottom',
    };

    return ComponentWithTooltip;
}
