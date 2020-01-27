import PropTypes from 'prop-types';
import React from 'react';

import ShowResultButton from './ShowResultButton';

const PublicationSearchMenu = ({
    hasPublicationSearchResult,
    resultShown,
    showResult,
}) => {
    return (
        <div className="search-menu">
            {hasPublicationSearchResult ? (
                <ShowResultButton
                    resultShown={resultShown}
                    showResult={showResult}
                />
            ) : null}
        </div>
    );
};

PublicationSearchMenu.propTypes = {
    hasPublicationSearchResult: PropTypes.bool.isRequired,
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired,
};

export default PublicationSearchMenu;
