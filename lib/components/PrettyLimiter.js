import React, { PropTypes } from 'react';

export const getDisplay = (key, value) => {
    switch(key) {
    case 'fullText':
        return 'Texte intégral';
    case 'peerReviewed':
        return 'Relu par un comité de lecture';
    case 'author':
        return `Auteur: ${value}`;
    case 'title':
        return `Titre: ${value}`;
    case 'language':
        return `Langue: ${value}`;
    case 'journalName':
        return `Journal: ${value}`;
    case 'publicationDate':
        return `Date de publication: ${value.from}/${value.to}`;
    case 'SourceType':
        return `Type de resource: ${value.map((v) => v.label).join(', ')}`;
    case 'SubjectEDS':
        return `Mots clé: ${value.map((v) => v.label).join(', ')}`;
    case 'Publisher':
        return `Publisher: ${value.map((v) => v.label).join(', ')}`;
    case 'Publication':
        return `Publication: ${value.map((v) => v.label).join(', ')}`;
    case 'Language':
        return `Language: ${value.map((v) => v.label).join(', ')}`;
    case 'Category':
        return `Category: ${value.map((v) => v.label).join(', ')}`;
    case 'ContentProvider':
        return `Content Provider: ${value.map((v) => v.label).join(', ')}`;
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
            }).join('; ')}
        </span>
    );
};

PrettyLimiter.propTypes = {
    data: PropTypes.object.isRequired
};

export default PrettyLimiter;
