export default function getSearchParametersFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain');
    const term = urlParams.get('term');
    const location = urlParams.get('type');

    if (!['article', 'publication', 'database'].includes(location)) {
        return {};
    }

    return {
        domain: domain ? domain.toUpperCase() : undefined,
        location,
        term,
    };
}
