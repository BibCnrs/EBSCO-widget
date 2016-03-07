import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import UL from './UL';
import DL from './DL';
import FullTextHolding from './FullTextHolding';

const Blob = ({ data }) => {
    const type = Object.prototype.toString.call(data);
    switch(type) {
    case '[object Object]':
        if (data.type) {
            return data;
        }

        if (data.indice) {
            return (
                <span>
                    <sup>{data.indice}</sup>
                    <span>{data.lastValue}</span>
                </span>
            );
        }

        if (data.searchable) {
            return (
                <span>
                    {data.firstValue ? <span>{data.firstValue} </span> : null}
                    {data.searchable.map((searchable, index) => (
                        <span>
                            {searchable.indice ? <sup>{searchable.indice}</sup> : null}
                            <a href="#">{searchable.value}</a>
                            {index < data.searchable.length - 1 ? '/' : ''}
                        </span>
                    ))}
                    {data.lastValue ? <span> {data.lastValue}</span> : null}
                </span>
            );
        }

        if(data.url) {
            return <FullTextHolding data={data}/>;
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
