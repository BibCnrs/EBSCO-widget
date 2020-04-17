import React from 'react';
import PropTypes from 'prop-types';
import { flattenDeep } from 'lodash';

export const HAL_REGEX = /https?:\/\/(?:www\.)?(hal|tel)(shs)?(-.*)?\.(.*)\.(.*)/;
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

export const proxify = (apiUrl, url, doi, domain, name, database = false) => {
    if (!url) {
        return null;
    }
    let sid = guessSid(url);

    if (database === true) {
        sid = 'bdd';
    }

    if (!sid) {
        if (/open access/i.test(name)) {
            sid = 'oa';
        } else {
            return url;
        }
    }

    let path = 'oa';
    if (database === true) {
        path = 'oa_database';
    }

    url = encodeURI(url);
    if (url.includes('ebsco/oa')) {
        return url;
    }
    return `${apiUrl}/${path}?url=${url}&sid=${sid}&domaine=${domain}&doi=${doi}`;
};

function OALink({ apiUrl, children, url, doi, domain, name }) {
    let normalizedDoi = typeof doi === 'string' ? doi : null;
    if (Array.isArray(doi)) {
        const { url } = flattenDeep(doi)[0];

        if (url) {
            normalizedDoi = url.match(EXTRACT_DOI_REGEX)[1];
        }
    }

    if (typeof children === 'function') {
        return children({
            url: proxify(apiUrl, url, normalizedDoi, domain, name),
        });
    }

    return (
        <a
            href={proxify(apiUrl, url, normalizedDoi, domain)}
            target="_blank"
            rel="noopener noreferrer"
        >
            {children || url}
        </a>
    );
}

OALink.propTypes = {
    doi: PropTypes.any,
    domain: PropTypes.string.isRequired,
    apiUrl: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    children: PropTypes.any,
    name: PropTypes.string,
};

export default OALink;
