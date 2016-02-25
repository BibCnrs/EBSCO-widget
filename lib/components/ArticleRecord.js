import React, { PropTypes } from 'react';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';

const ArticleRecord = ({ article, showNotice, index }) => {
    return (
        <li className="record">
            <div>
                <h4>
                    <a
                        className="fetch-link title"
                        onClick={() => showNotice(index, true)}
                    >
                        {`${article.id}. ${article.title}`}
                    </a>
                </h4>
                <p>{article.publicationType}</p>
                { article.authors ? <p>Par: <Etc list={article.authors} limit={5}/></p> : null }
                <p>{article.source}</p>
                <ArticleLink index={index} />
            </div>
        </li>
    );
};

ArticleRecord.propTypes = {
    article: PropTypes.object.isRequired
};

export default ArticleRecord;
