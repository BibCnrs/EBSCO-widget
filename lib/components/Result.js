'use strict';

import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import ViewAbstract from './ViewAbstract';

export default class Result extends Component {
    render() {
        const { result, index } = this.props;
        return (
            <li className="result">
                <div>
                    <h3><a className="title" href={result.noticeLink}>{decodeURIComponent(result.title)}</a></h3>
                    <p>{result.publicationType}</p>
                    { result.authors ? <p>Par: {result.authors.join(', ')}</p> : null}
                    <p>{result.source}</p>
                    <a className="button" href={result.articleLink}>Accéder à l&apos;article</a>
                    <ViewAbstract visibility={result.abstractShown} abstract={result.abstract} index={index} onClick={this.props.showAbstract}/>
                </div>
            </li>
        );
    }
}

Result.propTypes = {
    result: ImmutablePropTypes.map.isRequired
};
