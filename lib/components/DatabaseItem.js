import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import memoize from 'lodash.memoize';

import BookmarkButton from '../containers/BookmarkButton';

const getImageStyle = memoize(image => ({
    backgroundImage: `url(${image})`,
}));

const DatabaseItem = ({ url, name, image, title, onDbClick }) => (
    <OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id={name.replace(' ', '_')}>
                {title.split('\n').map(t => <div key={t}>{t}</div>)}
            </Tooltip>
        }
    >
        <a
            disabled={!url}
            href={url}
            className="db"
            target="_blank"
            onClick={onDbClick}
            style={getImageStyle(image)}
        >
            <div className="title">
                {name}
                <BookmarkButton title={name} url={url} />
            </div>
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
