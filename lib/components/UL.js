import React, { PropTypes } from 'react';

import Blob from './Blob';

const UL = ({ data, className }) => {
    return (
        <ul className={`ul ${className}`}>
            {
                data
                .filter((datum) => (datum !== '') && datum !== null && (typeof datum !== 'undefined'))
                .map((datum, index) => {
                    return (
                        <li key={index}>
                            <Blob data={datum}/>
                        </li>
                    );
                })
            }
        </ul>
    );
};

UL.propTypes = {
    data: PropTypes.array.isRequired
};

export default UL;
