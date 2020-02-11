import PropTypes from 'prop-types';
import React from 'react';

const oaIconUrl = require('./oa.png');

const ArticleRecordTitleLink = ({ articleLinks, children, ...otherProps }) => {
    const openAccess = articleLinks.fullTextLinks.find(d =>
        /accès en ligne en open access/i.test(d.name),
    );
    const fullText = articleLinks.fullTextLinks.find(d =>
        /lien(s) texte intégral/i.test(d.name),
    );
    const unpaywall = articleLinks.urls.find(d => /unpaywalleds/i.test(d.name));
    const accessUrl = articleLinks.urls.find(d => /access url/i.test(d.name));
    const availability = articleLinks.urls.find(d =>
        /availability/i.test(d.name),
    );
    const pdf = articleLinks.pdfLinks.find(d => !!d.url);
    const html = articleLinks.html
        ? { url: `data:${articleLinks.html}` }
        : null;

    const href =
        openAccess ||
        unpaywall ||
        fullText ||
        pdf ||
        accessUrl ||
        availability ||
        html;

    const hrefWithIcon = [openAccess, unpaywall].filter(Boolean);
    return (
        <a {...otherProps} href={href ? href.url : '#'}>
            {children}
            {href && hrefWithIcon.includes(href) && (
                <img
                    src={oaIconUrl}
                    alt="Open access icon"
                    style={{ height: '20px' }}
                />
            )}
        </a>
    );
};

ArticleRecordTitleLink.propTypes = {
    articleLinks: PropTypes.object.isRequired,
    children: PropTypes.any,
};

ArticleRecordTitleLink.defaultProps = {};

export default ArticleRecordTitleLink;
