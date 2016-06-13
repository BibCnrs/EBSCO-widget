import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import A2zSearchResult from '../containers/A2zSearchResult';
import A2zSearch from '../containers/A2zSearch';

const A2z = ({}) => {

    return (
        <div>
            <A2zSearch/>
            <A2zSearchResult/>
        </div>
    );
};

A2z.propTypes = {
};

A2z.defaultProps = {
};

export default A2z;