'use strict';

export default function buildQueryString(limiters) {
    return Object.keys(limiters)
    .filter((key) => !!limiters[key])
    .map((key) => {
        switch (key) {
        case 'fullText':
            return 'FT=Y';
        case 'peerReviewed':
            return 'RV=Y';
        case 'publicationDate':
            return `DT1=${limiters[key].from}/${limiters[key].to}`;
        case 'author':
            return `AU=${limiters[key]}`;
        }
    }).join('&');
}
