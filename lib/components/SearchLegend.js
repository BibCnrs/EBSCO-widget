import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import translate from '../higherOrderComponents/translate';
import DiamondIcon from './DiamondIcon';
import OpenAccessIcon from './OpenAccessIcon';

const SearchLegend = ({ text, displayDiamond }) => {
    const popoverOpenAccess = (
        <Popover id="popover-positioned-top" title={text.openAccess}>
            {text.openAccessDescription}
        </Popover>
    );

    const popoverDiamond = (
        <Popover id="popover-positioned-top" title={text.diamond}>
            {text.diamondDescription}
        </Popover>
    );

    return (
        <div className="search-legend">
            <div className="search-legend__item">
                <OverlayTrigger
                    trigger="click"
                    placement="top"
                    overlay={popoverOpenAccess}
                >
                    <div className="search-legend__overlay-trigger">
                        <OpenAccessIcon />
                        <span> {text.openAccess}</span>
                    </div>
                </OverlayTrigger>
            </div>
            {displayDiamond && (
                <div className="search-legend__item">
                    <OverlayTrigger
                        trigger="click"
                        placement="top"
                        overlay={popoverDiamond}
                    >
                        <div className="search-legend__overlay-trigger">
                            <DiamondIcon />
                            <span> {text.diamond}</span>
                        </div>
                    </OverlayTrigger>
                </div>
            )}
        </div>
    );
};

SearchLegend.propTypes = {
    text: PropTypes.object,
    displayDiamond: PropTypes.bool,
};

export default translate(SearchLegend);
