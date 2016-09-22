export default function buildQueryString(parameters) {
    return Object.keys(parameters)
    .filter((key) => !!parameters[key])
    .map((key) => {
        switch (key) {
        case 'queries':
            return `queries=${encodeURIComponent(JSON.stringify(parameters[key]))}`;
        case 'fullText':
            return 'FT=Y';
        case 'peerReviewedArticle':
            return 'RV=Y';
        case 'peerReviewedPublication':
            return 'RV3=Y';
        case 'publicationDate':
            if (!parameters[key].from || !parameters[key].to) {
                return null;
            }
            return `DT1=${parameters[key].from}-01/${parameters[key].to}-01`;
        case 'publicationId':
            if (!parameters[key].value) {
                return null;
            }
            return `publicationId=${parameters[key].value}`;
        case 'author':
            return `AU=${encodeURIComponent(parameters[key])}`;
        case 'journalName':
            return `SO=${encodeURIComponent(parameters[key])}`;
        case 'title':
            return `TI=${encodeURIComponent(parameters[key])}`;
        case 'language':
            return parameters[key].map(value => `LA99=${encodeURIComponent(value)}`).join('&');
        case 'currentPage':
            return `currentPage=${encodeURIComponent(parameters[key])}`;
        case 'action':
            return `action=${encodeURIComponent(parameters[key])}`;
        case 'activeFacets':
            if(Object.keys(parameters[key]).length > 0) {
                return `activeFacets=${encodeURIComponent(JSON.stringify(parameters[key]))}`;
            }
            return null;
        case 'sort':
            return `sort=${parameters[key]}`;
        case 'resultsPerPage':
            return `resultsPerPage=${parameters[key]}`;
        default:
            return null;
        }
    })
    .filter((key) => !!key)
    .join('&');
}
