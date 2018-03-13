import React from 'react';
import PropTypes from 'prop-types';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const BookmarkButton = ({
    addFavouriteResource,
    removeFavouriteResource,
    show,
    isAdded,
    text,
}) =>
    show &&
    (isAdded ? (
        <BibButton
            className="bookmark-button added"
            bsStyle="link"
            tooltip={text.tooltipRemove}
            onClick={removeFavouriteResource}
            icon={{ name: 'star' }}
        />
    ) : (
        <BibButton
            className="bookmark-button"
            bsStyle="link"
            tooltip={text.tooltipAdd}
            onClick={addFavouriteResource}
            icon={{ name: 'thumb-tack' }}
        />
    ));

BookmarkButton.propTypes = {
    addFavouriteResource: PropTypes.func.isRequired,
    text: PropTypes.any,
};

BookmarkButton.defaultProps = {
    text: {
        tooltip: 'Ajouter aux favoris',
    },
};

export default translate(BookmarkButton);
