import PropTypes from 'prop-types';
import React from 'react';

import ShowResultButton from '../ShowResultButton';

const MetadoreSearchMenu = ({
    hasMetadoreSearchResult,
    resultShown,
    showResult,
}) => {
    return (
        <div className="search-menu">
            {hasMetadoreSearchResult ? (
                <ShowResultButton
                    resultShown={resultShown}
                    showResult={showResult}
                />
            ) : null}
        </div>
    );
};

MetadoreSearchMenu.propTypes = {
    hasMetadoreSearchResult: PropTypes.bool.isRequired,
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired,
};

export default MetadoreSearchMenu;
