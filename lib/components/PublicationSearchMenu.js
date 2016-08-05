import React, { PropTypes } from 'react';

import BibButton from './BibButton';

const PublicationSearchMenu = ({ resultShown, showResult }) => {

    return (
        <BibButton
            bsStyle="link"
            icon={{ name: resultShown ? 'angle-double-down' : 'angle-double-right' }}
            onClick={() => showResult(!resultShown)}
        />
    );
};

PublicationSearchMenu.propTypes = {
    resultShown: PropTypes.bool.isRequired,
    text: PropTypes.object,
    showResult: PropTypes.func.isRequired
};

export default PublicationSearchMenu;
