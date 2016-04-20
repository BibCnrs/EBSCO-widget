import React, { PropTypes } from 'react';
import _ from 'lodash';

import BibButton from './BibButton';
import BibNavbar from '../containers/BibNavbar';
import A2zSearchResult from '../containers/A2zSearchResult';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
.map(letter => ({ label: letter, queries: [{ term: `${letter}*`, field: 'TI', boolean: 'OR' }] }))
.concat({
    label: '0-9',
    queries: _.range(10).map(digit => ({ term: `${digit}*`, field: 'TI', boolean: 'OR' }))
});

const A2zSearch = ({ queries, searchTerm }) => {
    const currentButton = queries[0].term === '0*' ? '0-9' : queries[0].term[0];

    return (
        <div>
            {
                aToZ.map(({ label, queries }, index) => (
                    <BibButton bsSize="small" bsStyle={currentButton === label ? 'primary' : 'default'} key={index} label={label} onClick={() => searchTerm(queries)}/>
                ))
            }
        </div>
    );
};

A2zSearch.propTypes = {
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
