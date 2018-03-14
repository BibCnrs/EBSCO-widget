import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import FavouriteResourceItem from './FavouriteResourceItem';

const FavouriteResourceList = ({ favouriteResources, remove }) => (
    <div>
        <ListGroup className="favourite-resource-list">
            {favouriteResources.map((resource, index) => (
                <FavouriteResourceItem
                    key={resource.title}
                    index={index}
                    {...resource}
                    remove={remove}
                />
            ))}
        </ListGroup>
    </div>
);

FavouriteResourceList.propTypes = {
    favouriteResources: PropTypes.arrayOf(FavouriteResourceItem.propTypes),
    remove: PropTypes.func.isRequired,
    text: PropTypes.any,
};

export default FavouriteResourceList;
