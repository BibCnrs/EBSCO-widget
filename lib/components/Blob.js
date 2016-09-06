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

        if(data.url) {
            return <FullTextHolding url={data.url} name={data.url.slice(0, 130).concat('...')}/>;
        }

        return <DL className="dl" data={data} />;
    case '[object Boolean]':
        return <Icon name={data ? 'check' : 'close'}/>;
    case '[object String]':
        if(data.match(/^http(s)?:\/\//)) {
            return <a target="_blank" href={data}>{data.length > 70 ? data.slice(0, 70).concat('...') : data}</a>;
        }
        return <span>{data}</span>;
    case '[object Array]':
        return <UL data={data}/>;
    default:
        return <span>data</span>;
    }
};

Blob.propTypes = {
    data: PropTypes.any.isRequired
};

export default Blob;
