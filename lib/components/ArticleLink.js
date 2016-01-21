import React, { PropTypes } from 'react';
import FetchButton from './FetchButton';
import Button from './Button';

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

const ArticleLink = ({ link, url, domain, dbId, an, token, index, retrieveLink }) => {
    if (link === 'pdflink') {
        return (
            <FetchButton
                label="Récupérer le lien"
                onClick={() => retrieveLink(url, domain, dbId, an, token, index)}
            />
        );
    }
    return (
        <Button
            label="Accéder à l'article"
            disabled={!link}
            onClick={() => openInNewTab(link)}
        />
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
