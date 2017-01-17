import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const DatabaseItem = ({ url, name, image, title }) => (
    <OverlayTrigger
        placement='bottom'
        overlay={<Tooltip id={name.replace(' ', '_')}>{title.split('\n').map(t => (<div>{t}</div>)) }</Tooltip>}
    >
        <a href={url} className="db" target='_blank'>
            <img src={image}/>
            <span className="title">{name}</span>
        </a>
    </OverlayTrigger>
);


DatabaseItem.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
};

DatabaseItem.defaultProps = {
};

export default DatabaseItem;
