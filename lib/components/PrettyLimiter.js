import React, { PropTypes } from 'react';

import translate from '../higherOrderComponents/translate';

export const getDisplay = (key, value, text) => {
    if (value === null || typeof value === 'undefined') {
        return;
    }
    switch(key) {
    case 'fullText':
        return text[key];
    case 'peerReviewedArticle':
        return text[key];
    case 'publicationDate':
        if (!value.from || !value.to) {
            return;
        }
        return `${text[key]}: ${value.from}/${value.to}`;
    case 'Journal':
        return `${text[key]}: ${value}`;
    case 'SourceType':
        return `${text[key]}: ${value.join(', ')}`;
    case 'SubjectEDS':
        return `${text[key]}: ${value.join(', ')}`;
    case 'Publisher':
        return `${text[key]}: ${value.join(', ')}`;
    case 'Publication':
        return `${text[key]}: ${value.join(', ')}`;
    case 'Language':
        return `${text[key]}: ${value.join(', ')}`;
    case 'Category':
        return `${text[key]}: ${value.join(', ')}`;
    case 'ContentProvider':
        return `${text[key]}: ${value.join(', ')}`;
    default:
        return key + JSON.stringify(value);
    }
};

export const PrettyLimiter = ({ data, text }) => {
    const keys = Object.keys(data).filter((key) => !!data[key]);
    return (
        <span className="pretty-limiter">
            {keys.map((key) => {
                return getDisplay(key, data[key], text);
            }).filter(v => !!v).join('; ')}
        </span>
    );
};

PrettyLimiter.propTypes = {
    data: PropTypes.object.isRequired,
    text: PropTypes.object
};

PrettyLimiter.defaultProps = {
    text: {
        fullText: 'Texte intégral',
        peerReviewedArticle: 'Relu par un comité de lecture',
        publicationDate: 'Date de publication',
        Journal: 'Journal',
        SourceType: 'Type de document',
        SubjectEDS: 'Mots clé',
        Publisher: 'Editeur',
        Publication: 'Publication',
        Language: 'Langue',
        Category: 'Categorie',
        ContentProvider: 'Fournisseur de contenu'
    }
};

export default translate(PrettyLimiter);
