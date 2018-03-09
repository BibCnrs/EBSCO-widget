import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import FavouriteResourceItem from './FavouriteResourceItem';

const FavouriteResourceList = ({ favouriteResources, text }) => (
    <div>
        <h3>{text.title}</h3>
        <ListGroup className="favourite-resource-list">
            {favouriteResources.map(resource => (
                <FavouriteResourceItem key={resource.title} {...resource} />
            ))}
        </ListGroup>
    </div>
);

FavouriteResourceList.propTypes = {
    favouriteResources: PropTypes.arrayOf(FavouriteResourceItem.propTypes),
    text: PropTypes.any,
};

FavouriteResourceList.defaultProps = {
    text: {
        title: 'Vos resources favorites :',
    },
};

export default FavouriteResourceList;
