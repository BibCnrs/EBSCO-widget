import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Icon from 'react-fa';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import 'mathjax';

import UL from './UL';
import DL from './DL';
import FullTextHolding from './FullTextHolding';
import SearchLink from '../containers/SearchLink';

class Blob extends Component {
    componentDidMount () {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, ReactDOM.findDOMNode(this)]);
    }

    componentDidUpdate () {
        window.MathJax.Hub.Queue(["Typeset", MathJax.Hub, ReactDOM.findDOMNode(this)]);
    }
    render() {
        const { data } = this.props;
        const type = Object.prototype.toString.call(data);
        switch(type) {
        case '[object Object]':
            if (data.notation && data.value) {
                return <span dangerouslySetInnerHTML={{ __html: katex.renderToString(data.value)}} />
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
            const formulas = data.match(/\$(.*?)\$/g);
            if (formulas && formulas.length) {
                const dataWithFormulas = formulas.reduce((acc, formula) => {
                    const [ before, ...after ] = acc.slice(-1)[0].split(formula);
                    return [
                        ...acc.slice(0,-1),
                        before,
                        formula,
                        Array.isArray(after) ? after.join(formula) : after,
                    ];
                }, [data]);

                return dataWithFormulas
                    .map(
                        value => value.charAt(0) === '$' ?
                            <span dangerouslySetInnerHTML={{ __html: katex.renderToString(value.slice(1, -1))}} />
                        : value,
                    );
            }
            return <span>{data}</span>;
        case '[object Array]':
            return <UL data={data}/>;
        default:
            return <span>{data}</span>;
        }
    }
}

Blob.propTypes = {
    data: PropTypes.any.isRequired
};

export default Blob;
