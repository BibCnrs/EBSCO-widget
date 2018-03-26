window._paq = window._paq || [];

export const trackSearch = (category, domain) => {
    window._paq.push(['trackEvent', 'search', category, domain]);
};

export const trackDbClick = (domain, dbName) => {
    window._paq.push(['trackEvent', 'database access', domain, dbName]);
};

export const trackShowProfile = () => {
    window._paq.push(['trackEvent', 'show', 'profile']);
};

export const trackLogin = origin => {
    window._paq.push(['trackEvent', 'login', origin]);
};
