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
    default:
        return value;
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
