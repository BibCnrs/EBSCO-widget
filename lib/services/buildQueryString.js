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
            return `DT1=${limiters[key].from}-01/${limiters[key].to}-01`;
        case 'author':
            return `AU=${encodeURIComponent(limiters[key])}`;
        case 'journalName':
            return `SO=${encodeURIComponent(limiters[key])}`;
        case 'title':
            return `TI=${encodeURIComponent(limiters[key])}`;
        case 'language':
            return limiters[key].map(value => `LA99=${encodeURIComponent(value)}`).join('&');
        case 'currentPage':
            return `currentPage=${encodeURIComponent(limiters[key])}`;
        case 'action':
            return `action=${encodeURIComponent(limiters[key])}`;
        case 'activeFacets':
            if(limiters[key].length) {
                return `activeFacets=${encodeURIComponent(JSON.stringify(limiters[key]))}`;
            }
            return null;
        default:
            return null;
        }
    })
    .filter((key) => !!key)
    .join('&');
}
