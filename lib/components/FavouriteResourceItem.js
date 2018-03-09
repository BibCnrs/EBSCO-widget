import React from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';
import Icon from 'react-fa';

const FavouriteResourceItem = ({ title, url }) => (
    <ListGroupItem className="favourite-resource-item">
        <a href={url} target="_blank">
            {title} <Icon name="external-link" />
        </a>
    </ListGroupItem>
);

FavouriteResourceItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default FavouriteResourceItem;
