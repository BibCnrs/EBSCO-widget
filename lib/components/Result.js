'use strict';

import React, { Component, PropTypes } from 'react';
import ViewAbstract from './ViewAbstract';
import ViewNotice from './ViewNotice';

export default class Result extends Component {
    render() {
        const { result, index, showNotice, fetchNotice, showAbstract } = this.props;
        const { dbId, an } = result;
        return (
            <li className="result">
                <div>
                    <h3><a className="title" href={result.noticeLink}>{decodeURIComponent(result.title)}</a></h3>
                    <p>{result.publicationType}</p>
                    { result.authors ? <p>Par: {result.authors.join(', ')}</p> : null}
                    <p>{result.source}</p>
                    <a className="button" href={result.articleLink}>Accéder à l&apos;article</a>
                    <ViewAbstract visibility={result.abstractShown} abstract={result.abstract} index={index} onClick={showAbstract}/>
                    <ViewNotice
                        notice={result.notice}
                        onShow={(shown) => showNotice(index, shown)}
                        onFetch={() => fetchNotice(index, dbId, an)}
                    />
                </div>
            </li>
        );
    }
}

Result.propTypes = {
    result: PropTypes.object.isRequired
};
