import React from 'react';
import PropTypes from 'prop-types';

const HAL_REGEX = /https?:\/\/(?:www\.)?hal\.(.*)\.(.*)\/\1-(.*)/;
const EXTRACT_DOI_REGEX = /https?:\/\/(?:www\.)?(?:.*)?\.doi\.org\/(.*)/;

function guessSid(url) {
    if (url.indexOf('http://arxiv.org') === 0) {
        return 'arxiv';
    }

    if (url.indexOf('https://doaj.org') === 0) {
        return 'doaj';
    }

    if (HAL_REGEX.test(url)) {
        return 'hal';
    }

    return null;
}

function proxify(url, doi, domain) {
    const sid = guessSid(url);

    if (!sid) {
        return url;
    }

    return `${window.__SERVER_URL__}/oa?url=${url}&sid=${sid}&domaine=${domain}&doi=${doi}`;
}

function OALink({ children, url, doi, domain }) {
    let normalizedDoi = typeof doi === 'string' ? doi : null;
    if (Array.isArray(doi)) {
        const { url } = doi[0];

        if (url) {
            normalizedDoi = url.match(EXTRACT_DOI_REGEX)[1];
        }
    }

    return (
        <a href={proxify(url, normalizedDoi, domain)} target="_blank">
            {children || url}
        </a>
    );
}

OALink.propTypes = {
    doi: PropTypes.string,
    domain: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.any,
};

export default OALink;
