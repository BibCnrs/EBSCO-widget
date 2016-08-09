import React, { PropTypes } from 'react';

import LabeledLinkList from './LabeledLinkList';

const ArticleLink = ({ articleLinks, text }) => {
    const { fullTextLinks, pdfLinks } = articleLinks;

    return (
        <div>
            <LabeledLinkList label={text.fullTextLinks} list={fullTextLinks}/>
            <LabeledLinkList label={text.pdfLinks} list={pdfLinks}/>
        </div>
    );
};

ArticleLink.propTypes = {
    articleLinks: PropTypes.object.isRequired,
    text: PropTypes.object
};

ArticleLink.defaultProps = {
    text: {
        fullTextLinks: 'Liens texte intégral',
        pdfLinks: 'Liens pdf'
    }
};

export default ArticleLink;
