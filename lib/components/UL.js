import PropTypes from 'prop-types';
import React from 'react';

import Blob from './Blob';

const UL = ({ currentGate, data, className, doi }) => {
    return (
        <ul className={`ul ${className}`}>
            {data
                .filter(
                    datum =>
                        datum !== '' &&
                        datum !== null &&
                        typeof datum !== 'undefined',
                )
                .map((datum, index) => {
                    return (
                        <li key={index}>
                            <Blob
                                data={datum}
                                doi={doi}
                                currentGate={currentGate}
                            />
                        </li>
                    );
                })}
        </ul>
    );
};

UL.propTypes = {
    data: PropTypes.array.isRequired,
    doi: PropTypes.any,
    className: PropTypes.string,
    currentGate: PropTypes.string.isRequired,
};

UL.defaultProps = {
    className: '',
};

export default UL;
