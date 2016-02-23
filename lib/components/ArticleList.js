import React, { PropTypes } from 'react';
import Article from '../containers/Article';

const ArticleList = ({ articles }) => (
    <ul className="record_list">
        {articles.map((article, index) => <Article key={index} index={index} article={article} />)}
    </ul>
);

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired
};

export default ArticleList;
