import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const DatabaseItem = ({ url, name, image, title, onDbClick }) => (
    <OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id={name.replace(' ', '_')}>
                {title.split('\n').map(t => <div key={t}>{t}</div>)}
            </Tooltip>
        }
    >
        <a href={url} className="db" target="_blank" onClick={onDbClick}>
            <img src={image} />
            <div className="title">{name}</div>
        </a>
    </OverlayTrigger>
);

DatabaseItem.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
    onDbClick: PropTypes.string.isRequired,
};

DatabaseItem.defaultProps = {};

export default DatabaseItem;
