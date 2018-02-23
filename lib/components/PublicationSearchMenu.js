import PropTypes from 'prop-types';
import React from 'react';

import ShowResultButton from './ShowResultButton';

const PublicationSearchMenu = ({ resultShown, showResult }) => {
    return (
        <div className="search-menu">
            <ShowResultButton
                resultShown={resultShown}
                showResult={showResult}
            />
        </div>
    );
};

PublicationSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired,
};

export default PublicationSearchMenu;
