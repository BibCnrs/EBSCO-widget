import React, { PropTypes } from 'react';
import _ from 'lodash';

import BibButton from './BibButton';
import BibNavbar from '../containers/BibNavbar';
import A2zDomainSelector from '../containers/A2zDomainSelector';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
.map(letter => ({ label: letter, queries: [{ term: `${letter}*`, field: 'JN', boolean: 'AND' }] }))
.concat({
    label: '0-9',
    queries: _.range(10).map(digit => ({ term: `${digit}*`, field: 'JN', boolean: 'OR' }))
});

const A2zSearch = ({ queries, searchTerm }) => {
    const term = queries && queries[0] && queries[0].term || [];
    const currentButton = term === '0*' ? '0-9' : term[0];

    return (
        <div>
            {
                aToZ.map(({ label, queries }, index) => (
                    <BibButton bsStyle={currentButton === label ? 'primary' : 'default'} key={index} label={label} onClick={() => searchTerm(queries)}/>
                ))
            }
            <A2zDomainSelector/>
        </div>
    );
};

A2zSearch.propTypes = {
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
