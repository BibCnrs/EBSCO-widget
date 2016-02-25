import React, { PropTypes } from 'react';

import ArticleRecord from '../containers/ArticleRecord';

const ArticleRecordList = ({ articles }) => (
    <ul className="record_list">
        {articles.map((article, index) => <ArticleRecord key={index} index={index} article={article} />)}
    </ul>
);

ArticleRecordList.propTypes = {
    articles: PropTypes.array.isRequired
};

export default ArticleRecordList;
