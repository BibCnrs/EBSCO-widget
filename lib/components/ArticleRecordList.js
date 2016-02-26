import React, { PropTypes } from 'react';

import ArticleRecord from '../containers/ArticleRecord';

const ArticleRecordList = ({ articles }) => (
    <ul className="record_list">
        {articles.map((article, index) => (
            <li key={index}>
                <ArticleRecord index={index} article={article} />
            </li>
        ))}
    </ul>
);

ArticleRecordList.propTypes = {
    articles: PropTypes.array.isRequired
};

export default ArticleRecordList;
