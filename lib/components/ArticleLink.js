import React, { PropTypes } from 'react';

import LabeledLinkList from './LabeledLinkList';

const ArticleLink = ({ articleLink }) => {
    const { fullTextLinks, pdfLinks } = articleLink;

    return (
        <div>
            <LabeledLinkList label={'full text link'} list={fullTextLinks}/>
            <LabeledLinkList label={'pdf link'} list={pdfLinks}/>
        </div>
    );
};

ArticleLink.propTypes = {
    articleLink: PropTypes.object.isRequired
};

export default ArticleLink;
