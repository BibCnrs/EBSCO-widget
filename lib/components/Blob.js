import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import UL from './UL';
import DL from './DL';
import FullTextHolding from './FullTextHolding';
import SearchLink from '../containers/SearchLink';

const Blob = ({ data }) => {
    const type = Object.prototype.toString.call(data);
    switch(type) {
    case '[object Object]':
        if (data.type) {
            return data;
        }

        if (data.indice) {
            return <sup>{data.indice}</sup>;
        }

        if (data.term && data.field && data.value) {
            return <SearchLink {...data}/>;
        }

        if(data.url && data.name) {
            return <FullTextHolding {...data}/>;
        }

        if(data.url && data.value) {
            return <a target="_blank" href={data.url}>{data.value}</a>;
        }

        return <DL data={data} />;
    case '[object Boolean]':
        return <Icon name={data ? 'check' : 'close'}/>;
    case '[object String]':
        return <span>{data}</span>;
    case '[object Array]':
        return <UL data={data}/>;
    default:
        return <span>data</span>;
    }
};

Blob.propTypes = {
};

export default Blob;
