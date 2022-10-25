import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListGroupItem } from 'react-bootstrap';
import Icon from 'react-fa';
import { SortableElement } from 'react-sortable-hoc';

import BibButton from './BibButton';
import DragButton from './DragButton';

class FavouriteResourceItem extends Component {
    remove = () => {
        const { url, remove } = this.props;
        remove(url);
    };

    render() {
        const { title, url } = this.props;

        return (
            <ListGroupItem className="favourite-resource__item">
                <DragButton />
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {title} <Icon name="external-link" />
                </a>
                <BibButton
                    onClick={this.remove}
                    className="delete"
                    bsStyle="link"
                    icon={{ name: 'trash' }}
                />
            </ListGroupItem>
        );
    }
}

FavouriteResourceItem.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
};

export default SortableElement(FavouriteResourceItem);
