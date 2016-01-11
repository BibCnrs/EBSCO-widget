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
        case 'journalName':
            return `SO=${limiters[key]}`;
        case 'title':
            return `TI=${limiters[key]}`;
        case 'language':
            return `LA99=${limiters[key]}`;
        case 'currentPage':
            return `currentPage=${limiters[key]}`;
        case 'facet':
            return `facet=${limiters[key]}`;
        default:
            return null;
        }
    })
    .filter((key) => !!key)
    .join('&');
}
