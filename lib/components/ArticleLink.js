import React, { PropTypes } from 'react';

import LabeledLinkList from './LabeledLinkList';
import translate from '../higherOrderComponents/translate';

const ArticleLink = ({ articleLinks, text }) => {
    if(!articleLinks) {
        return <span/>;
    }
    const { fullTextLinks, pdfLinks } = articleLinks;

    return (
        <div>
            <LabeledLinkList label={text.fullTextLinks} list={fullTextLinks}/>
            <LabeledLinkList label={text.pdfLinks} list={pdfLinks}/>
        </div>
    );
};

ArticleLink.propTypes = {
    articleLinks: PropTypes.object,
    text: PropTypes.object
};

ArticleLink.defaultProps = {
    text: {
        fullTextLinks: 'Accès au document',
        pdfLinks: 'Accès au pdf'
    }
};

export default translate(ArticleLink);
