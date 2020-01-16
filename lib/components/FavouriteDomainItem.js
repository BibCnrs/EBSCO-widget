import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';

import BibButton from './BibButton';

class FavouriteDomainItem extends Component {
    render() {
        const { domain, favourite, onStar, title, ...otherProps } = this.props;

        return (
            <ListGroupItem className="favourite-domain-item" {...otherProps}>
                <span>{domain}</span>
                <BibButton
                    onClick={onStar}
                    className="star"
                    bsStyle="link"
                    icon={{ name: favourite ? 'star' : 'star-o' }}
                    title={title}
                />
            </ListGroupItem>
        );
    }
}

FavouriteDomainItem.propTypes = {
    favourite: PropTypes.bool,
    domain: PropTypes.string.isRequired,
    onStar: PropTypes.func.isRequired,
    title: PropTypes.string,
};

export default FavouriteDomainItem;
