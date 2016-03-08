import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import UL from './UL';
import DL from './DL';
import FullTextHolding from './FullTextHolding';
import SearchableField from '../containers/SearchableField';

const Blob = ({ data }) => {
    const type = Object.prototype.toString.call(data);
    switch(type) {
    case '[object Object]':
        if (data.type) {
            return data;
        }

        if (data.indice) {
            return (
                <p>
                    <sup>{data.indice}</sup>
                    <span>{data.lastValue}</span>
                </p>
            );
        }

        if (data.searchable) {
            return <SearchableField {...data}/>;
        }

        if(data.url && data.name) {
            return <FullTextHolding {...data}/>;
        }

        return <DL data={data} />;
    case '[object Boolean]':
        return <Icon name={data ? 'check' : 'close'}/>;
    case '[object String]':
        return <p>{data}</p>;
    case '[object Array]':
        return <UL data={data}/>;
    default:
        return <span>data</span>;
    }
};

Blob.propTypes = {
};

export default Blob;
