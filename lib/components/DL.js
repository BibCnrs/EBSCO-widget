import React, { PropTypes } from 'react';
import Icon from 'react-fa';

export const getValue = (value) => {
    const type = Object.prototype.toString.call(value);
    switch(type) {
    case '[object Object]':
        return <DL data={value} />;
    case '[object Boolean]':
        return <Icon name={value ? 'check' : 'close'}/>;
    default:
        return value;
    }
};

const DL = ({ data }) => {
    const keys = Object.keys(data).filter((key) => (data[key] !== '') && data[key] !== null && (typeof data[key] !== 'undefined'));
    return (
        <dl className="dl">
            {keys.map((key, index) => {
                const value = getValue(data[key]);
                return (
                    <span key={index}>
                        <dt>{key}</dt>
                        <dd>{value}</dd>
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
