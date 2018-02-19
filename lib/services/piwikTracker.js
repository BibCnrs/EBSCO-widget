const _paq = window._paq || [];

export const trackSearch = (category, domain) => {
    _paq.push('trackEvent', 'search', category, domain);
};

export const trackDbClick = (domain, dbName) => () => {
    _paq.push('trackEvent', 'db', domain, dbName);
};
