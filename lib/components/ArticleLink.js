import React, { PropTypes } from 'react';
import FetchButton from './FetchButton';
import Button from './Button';
import Select from 'react-select';

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

const displayLink = (data) => {
    let type = 'éditeur';

    if (data.value.match(/resolver\.ebscohost\.com/)) {
        type = 'résolveur de lien';
    }

    if (data.value.match(/content\.ebscohost\.com/)) {
        type = 'lien ebsco';
    }

    if (data.value.match(/.pdf$/)) {
        type = 'pdf';
    }

    return `${data.label}. ${type}`;
};

const getLinkComponent = (link, url, domain, dbId, an, token, index, retrieveLink) => {
    if (!link /*|| link.length === 1*/) {
        return <Button
            label="Accéder à l'article"
            disabled={!link}
        />;
    }
    if (link === 'pdflink') {
        return (
            <FetchButton
                label="Récupérer le lien"
                onClick={() => retrieveLink(url, domain, dbId, an, token, index)}
            />
        );
    }

    return <Select
        className="article-link"
        placeholder={`Accéder à l'article (${link.length})`}
        searchable={false}
        options={link.map((l, index) => ({ value: l, label: index }))}
        optionRenderer={displayLink}
        onChange={(data) => openInNewTab(data.value)}
    />;
};

const ArticleLink = ({ link, url, domain, dbId, an, token, index, retrieveLink }) => {

    return (
        <div className="article-link">{getLinkComponent(link, url, domain, dbId, an, token, index, retrieveLink)}</div>

    );
};

ArticleLink.propTypes = {
    link: PropTypes.string,
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    dbId: PropTypes.string.isRequired,
    an: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    retrieveLink: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default ArticleLink;
