import React, { PropTypes } from 'react';
import _ from 'lodash';

import BibButton from './BibButton';
import BibNavbar from '../containers/BibNavbar';
import A2zDomainSelector from '../containers/A2zDomainSelector';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
.map(letter => ({ label: letter, queries: [{ term: `${letter}*`, field: 'JN', boolean: 'AND' }] }))
.concat({
    label: '#',
    queries: _.range(10).map(digit => ({ term: `${digit}*`, field: 'JN', boolean: 'OR' }))
});

const A2zSearch = ({ queries, searchTerm }) => {
    const term = queries && queries[0] && queries[0].term || [];
    const currentButton = term === '0*' ? '#' : (term.match(/.0*/) ? `${term[0]}#` : term.replace('*', ''));
    const firstButton = currentButton[0];

    return (
        <div className="a2z-search">
            <A2zDomainSelector/>
            <div className="letters">
                {
                    aToZ.map(({ label, queries }, index) => (
                        <BibButton className={label} bsStyle={firstButton === label ? 'primary' : 'default'} key={index} label={label} onClick={() => searchTerm(queries)}/>
                    ))
                }
            </div>
            {
                firstButton ? (<div className="letters">
                    {
                        aToZ.map(data => {
                            return {
                                label: `${firstButton}${data.label}`,
                                queries: data.queries.map(query => {
                                    //TODO handle digit
                                    return {
                                        ...query,
                                        term: `${firstButton}${query.term}`
                                    };
                                })
                            };
                        })
                        .map(({ label, queries }, index) => (
                            <BibButton className={label} bsStyle={currentButton === label ? 'primary' : 'default'} key={index} label={label} onClick={() => searchTerm(queries)}/>
                        ))
                    }
                </div>) : (<span/>)
            }
        </div>
    );
};

A2zSearch.propTypes = {
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
