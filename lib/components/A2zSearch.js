import React, { PropTypes } from 'react';

import BibButton from './BibButton';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#'];

const A2zSearch = ({ firstLetter, secondLetter, searchLetters, DomainSelector }) => {

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
                            onClick={() => searchLetters(letter, '')}
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
                                        onClick={() => searchLetters(firstLetter, letter)}
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
    searchLetters: PropTypes.func.isRequired,
    DomainSelector: PropTypes.func.isRequired
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
