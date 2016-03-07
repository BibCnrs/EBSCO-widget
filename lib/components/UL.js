import React, { PropTypes } from 'react';
import Icon from 'react-fa';
import DL from './DL';

export const getValue = (value, key) => {
    const type = Object.prototype.toString.call(value);
    switch(type) {
    case '[object Object]':
        if (value.type) {
            return value;
        }
        return <DL data={value} />;
    case '[object Boolean]':
        return <Icon name={value ? 'check' : 'close'}/>;
    case '[object String]':
        return value.split('\n').map((v, key) => <p key={key}>{v}</p>);
    case '[object Array]':
        return <UL data={value}/>;
    default:
        return value;
    }
};

const UL = ({ data, className }) => {
    return (
        <ul className={`ul ${className}`}>
            {
                data
                .filter((datum) => (datum !== '') && datum !== null && (typeof datum !== 'undefined'))
                .map((datum, index) => {
                    const value = getValue(datum);
                    return (
                        <li key={index}>
                            {value}
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
