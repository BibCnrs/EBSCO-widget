import React, { PropTypes } from 'react';

import LabeledLinkList from './LabeledLinkList';

const ArticleLink = ({ articleLinks }) => {
    const { fullTextLinks, pdfLinks } = articleLinks;

    return (
        <div>
            <LabeledLinkList label={'full text link'} list={fullTextLinks}/>
            <LabeledLinkList label={'pdf link'} list={pdfLinks}/>
        </div>
    );
};

ArticleLink.propTypes = {
    articleLinks: PropTypes.object.isRequired
};

export default ArticleLink;
