import React from 'react';
import PropTypes from 'prop-types';

const HAL_REGEX = /https?:\/\/(?:www\.)?hal\.(.*)\.(.*)/;
const EXTRACT_DOI_REGEX = /https?:\/\/(?:www\.)?(?:.*)?\.doi\.org\/(.*)/;

function guessSid(href) {
    if (href.indexOf('http://arxiv.org') === 0) {
        return 'arxiv';
    }

    if (href.indexOf('https://doaj.org') === 0) {
        return 'doaj';
    }

    if (HAL_REGEX.test(href)) {
        return 'hal';
    }

    return null;
}

function proxify(apiUrl, href, doi, domain) {
    const sid = guessSid(href);

    if (!sid) {
        return href;
    }

    return `${apiUrl}/oa?url=${href}&sid=${sid}&domaine=${domain}&doi=${doi}`;
}

function OALink({ apiUrl, children, href, doi, domain }) {
    let normalizedDoi = typeof doi === 'string' ? doi : null;
    if (Array.isArray(doi)) {
        const { url } = doi[0];

        if (url) {
            normalizedDoi = url.match(EXTRACT_DOI_REGEX)[1];
        }
    }

    return (
        <a href={proxify(apiUrl, href, normalizedDoi, domain)} target="_blank">
            {children || href}
        </a>
    );
}

OALink.propTypes = {
    doi: PropTypes.string,
    domain: PropTypes.string.isRequired,
    apiUrl: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default OALink;
