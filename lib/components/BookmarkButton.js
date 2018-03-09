import React from 'react';
import PropTypes from 'prop-types';

import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

const BookmarkButton = ({ addFavouriteResource, show, text }) =>
    show && (
        <BibButton
            className="bookmark-button"
            bsStyle="link"
            bsSize="xsmall"
            tooltip={text.tooltip}
            onClick={addFavouriteResource}
            icon={{ name: 'thumb-tack' }}
        />
    );

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
