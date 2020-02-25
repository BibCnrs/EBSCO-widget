import PropTypes from 'prop-types';
import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import memoize from 'lodash.memoize';

import BookmarkButton from '../containers/BookmarkButton';
import BibButton from './BibButton';

const getImageStyle = memoize(image => ({
    backgroundImage: `url(${image})`,
}));

const DatabaseItem = ({ url, name, image, title, onDbClick }) => (
    <OverlayTrigger
        placement="bottom"
        overlay={
            <Tooltip id={name.replace(' ', '_')}>
                {title.split('\n').map(t => (
                    <div key={t}>{t}</div>
                ))}
            </Tooltip>
        }
    >
        <div className="db" style={getImageStyle(image)}>
            <BibButton
                bsStyle="link"
                disabled={!url}
                href={url}
                className="title"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onDbClick}
                label={name}
            />
            <BookmarkButton block title={name} url={url} />
        </div>
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
