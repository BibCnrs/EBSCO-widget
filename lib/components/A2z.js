import React from 'react';

import createSearchResultContainer from '../containers/createSearchResultContainer';
import A2zSearch from '../containers/A2zSearch';

const A2zSearchResult = createSearchResultContainer('a2z');

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
