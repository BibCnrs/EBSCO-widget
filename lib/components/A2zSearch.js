import React, { PropTypes } from 'react';

import BibButton from './BibButton';
import A2zDomainSelector from '../containers/A2zDomainSelector';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

const A2zSearch = ({ firstLetter, secondLetter, searchTerm }) => {

    return (
        <div className="a2z-search">
            <div className="letters">
                <A2zDomainSelector/>
                {
                    aToZ.map((letter, index) => (
                        <BibButton
                            className={letter}
                            bsStyle={firstLetter === letter ? 'primary' : 'default'}
                            key={index}
                            label={letter}
                            onClick={() => searchTerm(letter, '')}
                        />
                    ))
                }
            </div>
            {
                firstLetter !== '' ? (
                    <div className="letters">
                        <hr/>
                        {
                            aToZ.map((letter, index) => {
                                const label = `${firstLetter}${letter}`;
                                return (
                                    <BibButton
                                        className={label}
                                        bsStyle={secondLetter === letter ? 'primary' : 'default'}
                                        key={index}
                                        label={label}
                                        onClick={() => searchTerm(firstLetter, letter)}
                                    />
                                );
                            })
                        }
                    </div>
                ) : (<span/>)
            }
        </div>
    );
};

A2zSearch.propTypes = {
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
