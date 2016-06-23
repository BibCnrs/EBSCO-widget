import React, { PropTypes } from 'react';

import BibButton from './BibButton';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

const A2zSearch = ({ firstLetter, secondLetter, searchTerm, DomainSelector }) => {

    return (
        <div className="a2z-search">
            <div className="first letters">
                <DomainSelector/>
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
                    <div className="second letters">
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
    firstLetter: PropTypes.string.isRequired,
    secondLetter: PropTypes.string.isRequired,
    searchTerm: PropTypes.func.isRequired,
    DomainSelector: PropTypes.component.isRequired
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
