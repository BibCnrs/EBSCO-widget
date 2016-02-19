import React, { PropTypes } from 'react';
import FetchButton from './FetchButton';
import BibButton from './BibButton';
import Select from 'react-select';

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

const getLinkComponent = (link, url, domain, dbId, an, token, index, retrieveLink) => {
    if (!link || link.length === 1) {
        return <BibButton
            label="Ouvrir l'article"
            disabled={!link}
            icon={{ name: 'whatever' }}
            onClick={() => openInNewTab(link)}
        />;
    }
    if (link === 'pdflink') {
        return (
            <FetchButton
                label="Accéder à l'article"
                icon={'whatever'}
                onClick={() => retrieveLink(url, domain, dbId, an, token, index)}
            />
        );
    }

    return <Select
        className="article-link"
        placeholder={`Accéder à l'article (${link.length})`}
        searchable={false}
        options={link.map((l, index) => ({ value: l, label: `Ouvrir l'article ${index + 1}` }))}
        onChange={(data) => openInNewTab(data.value)}
    />;
};

const ArticleLink = ({ link, url, domain, dbId, an, token, index, retrieveLink }) => {

    return (
        <div className="article-link">{getLinkComponent(link, url, domain, dbId, an, token, index, retrieveLink)}</div>

    );
};

ArticleLink.propTypes = {
    link: function (...args) {
        const [ props, name ] = args;
        if (props[name] === 'pdflink') {
            return null;
        }
        return PropTypes.array(...args);
    },
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    dbId: PropTypes.string.isRequired,
    an: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    retrieveLink: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

export default ArticleLink;
