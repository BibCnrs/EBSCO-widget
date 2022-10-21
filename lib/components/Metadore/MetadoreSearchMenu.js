import PropTypes from 'prop-types';
import React from 'react';

import ShowResultButton from '../ShowResultButton';

const MetadoreSearchMenu = ({ resultShown, showResult }) => {
    return (
        <div className="search-menu">
            <ShowResultButton
                resultShown={resultShown}
                showResult={showResult}
            />
        </div>
    );
};

MetadoreSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired,
};

export default MetadoreSearchMenu;
