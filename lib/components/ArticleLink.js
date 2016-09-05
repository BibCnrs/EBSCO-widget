import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import LabeledLinkList from './LabeledLinkList';
import translate from '../higherOrderComponents/translate';

const ArticleLink = ({ articleLinks, text }) => {
    if(!articleLinks) {
        return <span/>;
    }
    const { fullTextLinks, pdfLinks, urls } = articleLinks;

    if(
        (!fullTextLinks || !fullTextLinks.length) &&
        (!pdfLinks|| !pdfLinks.length) &&
        (!urls || !urls.length)
    ) {
        return (
            <div className="labeled-link-list">
                <p>{text.pdfLinks}</p>
                <ul><Icon name="spinner" spin={true}/></ul>
            </div>
        );
    }

    return (
        <div>
            <LabeledLinkList label={text.fullTextLinks} list={fullTextLinks}/>
            <LabeledLinkList label={text.pdfLinks} list={pdfLinks}/>
            <LabeledLinkList label={text.urls} list={urls}/>
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
        pdfLinks: 'Accès au pdf',
        urls: 'Urls'
    }
};

export default translate(ArticleLink);
