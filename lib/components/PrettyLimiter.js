import React, { PropTypes } from 'react';

export const getDisplay = (key, value) => {
    if (value === null || typeof value === 'undefined') {
        return;
    }
    switch(key) {
    case 'fullText':
        return 'Texte intégral';
    case 'peerReviewedArticle':
        return 'Relu par un comité de lecture';
    case 'author':
        return `Auteur: ${value}`;
    case 'title':
        return `Titre: ${value}`;
    case 'language':
        if (!value.length) {
            return;
        }
        return `Langue: ${value.map(l => l.label).join(', ')}`;
    case 'journalName':
        return `Journal: ${value}`;
    case 'publicationDate':
        if (!value.from || !value.to) {
            return;
        }
        return `Date de publication: ${value.from}/${value.to}`;
    case 'SourceType':
        return `Type de resource: ${value.join(', ')}`;
    case 'SubjectEDS':
        return `Mots clé: ${value.join(', ')}`;
    case 'Publisher':
        return `Publisher: ${value.join(', ')}`;
    case 'Publication':
        return `Publication: ${value.join(', ')}`;
    case 'Language':
        return `Language: ${value.join(', ')}`;
    case 'Category':
        return `Category: ${value.join(', ')}`;
    case 'ContentProvider':
        return `Content Provider: ${value.join(', ')}`;
    default:
        return key + JSON.stringify(value);
    }
};

const PrettyLimiter = ({ data }) => {
    const keys = Object.keys(data).filter((key) => !!data[key]);
    return (
        <span className="pretty-limiter">
            {keys.map((key) => {
                return getDisplay(key, data[key]);
            }).filter(v => !!v).join('; ')}
        </span>
    );
};

PrettyLimiter.propTypes = {
    data: PropTypes.object.isRequired
};

export default PrettyLimiter;
