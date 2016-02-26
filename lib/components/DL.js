import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import FullTextHoldings from './FullTextHoldings';

export const getValue = (value, key) => {
    const type = Object.prototype.toString.call(value);
    switch(type) {
    case '[object Object]':
        return <DL data={value} />;
    case '[object Boolean]':
        return <Icon name={value ? 'check' : 'close'}/>;
    case '[object String]':
        return value.split('\n').map((v, key) => <p key={key}>{v}</p>);
    case '[object Array]':
        if (key === 'Texte Intégrale') {
            return <FullTextHoldings data= {value}/>;
        }
        return value.join(', ');
    default:
        return value;
    }
};

const DL = ({ data, className }) => {
    const keys = Object.keys(data).filter((key) => (data[key] !== '') && data[key] !== null && (typeof data[key] !== 'undefined'));
    return (
        <dl className={`dl ${className}`}>
            {keys.map((key, index) => {
                const value = getValue(data[key], key);
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
