import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-fa';
import katex from 'katex';
import 'katex/dist/katex.min.css';

import UL from './UL';
import DL from './DL';
import FullTextHolding from './FullTextHolding';
import SearchLink from '../containers/SearchLink';
import extractFormulas from '../services/extractFormulas';
import OALink from '../containers/OALink';

const blobString = (data, currentGate, doi) => {
    if (data.match(/^http(s)?:\/\//)) {
        return (
            <OALink href={data} doi={doi} domain={currentGate}>
                {data.length > 70 ? data.slice(0, 70).concat('...') : data}
            </OALink>
        );
    }
    const dataWithFormulas = extractFormulas(data);
    if (dataWithFormulas) {
        return (
            <span>
                {dataWithFormulas.map(value =>
                    value.formula ? (
                        <span
                            dangerouslySetInnerHTML={{
                                __html: katex.renderToString(value.formula),
                            }}
                        />
                    ) : (
                        value
                    ),
                )}
            </span>
        );
    }
    return <span>{data}</span>;
};

const Blob = ({ currentGate, data, doi }) => {
    const type = Object.prototype.toString.call(data);
    switch (type) {
        case '[object Object]':
            if (data.notation && data.value) {
                return (
                    <span
                        dangerouslySetInnerHTML={{
                            __html: katex.renderToString(data.value),
                        }}
                    />
                );
            }
            if (data.type) {
                return data;
            }

            if (data.indice) {
                return <sup>{data.indice}</sup>;
            }

            if (data.subIndice) {
                return <sub>{data.subIndice}</sub>;
            }

            if (data.term && data.field && data.value) {
                return <SearchLink {...data} />;
            }

            if (data.url && data.name) {
                return <FullTextHolding {...data} />;
            }

            if (data.url && data.value) {
                return (
                    <OALink href={data.url} doi={doi} domain={currentGate}>
                        {data.value}
                    </OALink>
                );
            }

            if (data.url) {
                return (
                    <FullTextHolding
                        url={data.url}
                        name={data.url.slice(0, 130).concat('...')}
                    />
                );
            }

            return (
                <DL
                    className="dl"
                    data={data}
                    doi={doi}
                    currentGate={currentGate}
                />
            );
        case '[object Boolean]':
            return <Icon name={data ? 'check' : 'close'} />;
        case '[object String]':
            return blobString(data, currentGate, doi);
        case '[object Array]':
            return <UL data={data} doi={doi} currentGate={currentGate} />;
        default:
            return <span>{data}</span>;
    }
};

Blob.propTypes = {
    doi: PropTypes.string,
    data: PropTypes.any.isRequired,
    currentGate: PropTypes.string.isRequired,
};

export default Blob;
