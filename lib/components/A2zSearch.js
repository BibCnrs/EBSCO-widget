import React, { PropTypes } from 'react';

import BibButton from './BibButton';

const aToZ = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0'];

const A2zSearch = ({ firstLetter, secondLetter, changeLetters, onSearch, DomainSelector }) => {
    return (
        <div className="a2z-search">
            <div>
                <DomainSelector/>
                <span className="first letters">
                {
                    aToZ.map((letter, index) => (
                        <BibButton
                            className={letter}
                            bsStyle={firstLetter === letter[0] ? 'primary' : 'link'}
                            style={{ fontWeight: secondLetter === letter ? 'bold' : 'normal' }}
                            key={index}
                            label={letter === '0' ? '0-9' : letter}
                            onClick={() => {
                                changeLetters(letter, '');
                                onSearch();
                            }}
                        />
                    ))
                }
                </span>
            </div>
            {
                firstLetter !== '' && firstLetter !== '0' ? (
                    <div className="second letters">
                        <hr/>
                        {
                            aToZ.slice(0, -1).map((letter, index) => {
                                const label = `${firstLetter}${letter}`;
                                return (
                                    <BibButton
                                        className={label}
                                        bsStyle={secondLetter === letter ? 'primary' : 'link'}
                                        style={{ fontWeight: secondLetter === letter ? 'bold' : 'normal' }}
                                        key={index}
                                        label={label}
                                        onClick={() => {
                                            changeLetters(firstLetter, letter);
                                            onSearch();
                                        }}
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
    changeLetters: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    DomainSelector: PropTypes.func.isRequired
};

A2zSearch.defaultProps = {
};

export default A2zSearch;
