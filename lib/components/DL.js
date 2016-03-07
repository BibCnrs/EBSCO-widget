import React, { PropTypes } from 'react';

import Blob from './Blob';


const DL = ({ data, className }) => {
    const keys = Object.keys(data).filter((key) => (data[key] !== '') && data[key] !== null && (typeof data[key] !== 'undefined'));
    return (
        <dl className={`dl ${className}`}>
            {keys.map((key, index) => {
                return (
                    <span key={index}>
                        <dt>{key}</dt>
                        <dd>
                            <Blob data={data[key]}/>
                        </dd>
                    </span>
                );
            }
            )}
        </dl>
    );
};

DL.propTypes = {
    data: PropTypes.object.isRequired
};

export default DL;
