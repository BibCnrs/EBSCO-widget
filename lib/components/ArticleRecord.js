import React, { PropTypes } from 'react';

import ArticleLink from '../containers/ArticleLink';
import Etc from './Etc';
import translate from '../higherOrderComponents/translate';

const ArticleRecord = ({ article, showNotice, index, text }) => {
    return (
        <div className="record">
            <h4>
                <a
                    className="fetch-link title"
                    onClick={() => showNotice(index, true)}
                >
                    {`${article.id}. ${article.title}`}
                </a>
            </h4>
            <p>{article.publicationType}</p>
            { article.authors ? <p>{text.by}: <Etc list={article.authors} limit={5}/></p> : null }
            <p>{article.source}</p>
            <ArticleLink index={index} />
        </div>
    );
};

ArticleRecord.propTypes = {
    article: PropTypes.object.isRequired
};

ArticleRecord.defaultProps = {
    by: 'Par'
};

export default translate(ArticleRecord);
