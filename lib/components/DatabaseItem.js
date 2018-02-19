import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import { trackDbClick } from '../services/piwikTracker';

const DatabaseItem = ({ url, name, image, title, domain }) => (
    <OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id={name.replace(' ', '_')}>
                {title.split('\n').map(t => <div key={t}>{t}</div>)}
            </Tooltip>
        }
    >
        <a
            href={url}
            className="db"
            target="_blank"
            onClick={trackDbClick(domain, name)}
        >
            <img src={image} />
            <span className="title">{name}</span>
        </a>
    </OverlayTrigger>
);

DatabaseItem.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    domain: PropTypes.string,
};

DatabaseItem.defaultProps = {};

export default DatabaseItem;
