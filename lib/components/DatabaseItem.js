import React, { PropTypes } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const DatabaseLink = ({ url, name, image, title }) => (
    <OverlayTrigger
        placement='bottom'
        overlay={<Tooltip id={name.replace(' ', '_')}>{ title }</Tooltip>}
    >
        <a href={url} className="db" target='_blank'>
            <img src={image}/>
            <span className="title">{name}</span>
        </a>
    </OverlayTrigger>
);


DatabaseLink.propTypes = {
    url: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
};

DatabaseLink.defaultProps = {
};

export default DatabaseLink;
