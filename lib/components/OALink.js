import React from 'react';
import PropTypes from 'prop-types';

function guessSid(url) {
    if (url.indexOf('http://arxiv.org') === 0) {
        return 'arxiv';
    }

    if (url.indexOf('https://doaj.org') === 0) {
        return 'doaj';
    }

    if (url.indexOf('https://www.hal.inserm.fr') === 0) {
        return 'hal';
    }

    return null;
}

function proxify(url, doi, domain) {
    const sid = guessSid(url);

    if (!sid) {
        return url;
    }

    return `${__SERVER_URL__}/oa?url=${url}&sid=${sid}&domaine=${domain}&doi=${doi}`;
}

function OALink({ children, url, doi, domain }) {
    return (
        <a href={proxify(url, doi, domain)} target="_blank">
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
