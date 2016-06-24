import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import createSearchResult from '../containers/createSearchResult';
import A2zSearch from '../containers/A2zSearch';

const A2zSearchResult = createSearchResult('a2z');

const A2z = () => {

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
