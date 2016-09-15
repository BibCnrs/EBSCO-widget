import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import LabeledLinkList from './LabeledLinkList';
import translate from '../higherOrderComponents/translate';

const ArticleLink = ({ articleLinks, text }) => {
    if(!articleLinks) {
        return <p>{text.noLinks}</p>;
    }
    const { fullTextLinks, pdfLinks, urls, html } = articleLinks;

    if(
        (!fullTextLinks || !fullTextLinks.length) &&
        (!pdfLinks|| !pdfLinks.length) &&
        (!urls || !urls.length) &&
        !html
    ) {
        return (
            <div className="labeled-link-list">
                <p>{text.pdfLinks}</p>
                <ul><Icon name="spinner" spin={true}/></ul>
            </div>
        );
    }

    const htmlLists = html ? [{
        name: <Icon name="file-code-o"/>,
        url: 'data:text/html;charset=utf-8,' + encodeURIComponent(html)
    }] : [];

    return (
        <div>
            <LabeledLinkList label={text.fullTextLinks} list={fullTextLinks}/>
            <LabeledLinkList label={text.pdfLinks} list={pdfLinks.map(pdfLink => ({ ...pdfLink, name: <Icon name="file-pdf-o"/>}))}/>
            <LabeledLinkList label={text.urls} list={urls}/>
            <LabeledLinkList label={text.html} list={htmlLists}/>
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
        html: 'html',
        noLinks: 'Pas d\'accès pour cet article.'
    }
};

export default translate(ArticleLink);
