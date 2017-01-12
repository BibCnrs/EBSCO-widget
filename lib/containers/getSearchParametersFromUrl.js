export default function getSearchParametersFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const domain = urlParams.get('domain') || undefined;
    const term = urlParams.get('term') || undefined;
    const location = urlParams.get('type') || 'article';

    return {
        domain,
        location,
        term,
    };
}
