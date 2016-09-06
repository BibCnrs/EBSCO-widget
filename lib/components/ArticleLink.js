import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import LabeledLinkList from './LabeledLinkList';
import translate from '../higherOrderComponents/translate';

const ArticleLink = ({ articleLinks, text }) => {
    if(!articleLinks) {
        return <p>{text.noLinks}</p>;
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
        fullTextLinks: 'Accès à l\'article',
        pdfLinks: 'Accès au pdf',
        urls: 'Urls',
        noLinks: 'Pas d\'accès pour cet article.'
    }
};

export default translate(ArticleLink);
