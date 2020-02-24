import PropTypes from 'prop-types';
import React from 'react';

import OALink from '../containers/OALink';
import { HAL_REGEX } from './OALink';
import translate from '../higherOrderComponents/translate';

const oaIconUrl = require('./oa.png');

const ArticleRecordTitleLink = ({
    articleLinks,
    children,
    doi,
    domain,
    text,
    ...otherProps
}) => {
    if (!articleLinks) {
        articleLinks = {
            fullTextLinks: [],
            pdfLinks: [],
            urls: [],
        };
    }
    const openAccess = articleLinks.fullTextLinks.find(d =>
        /accès en ligne en open access/i.test(d.name),
    );
    const fullText = articleLinks.fullTextLinks.find(d =>
        /lien\(s\) texte intégral/i.test(d.name),
    );
    const unpaywall = articleLinks.urls.find(d => /unpaywalleds/i.test(d.name));
    const accessUrl = articleLinks.urls.find(d =>
        /access url|online access/i.test(d.name),
    );
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

    if (!href || !href.url) {
        return (
            <span>
                {children} <i>({text.noLinks})</i>
            </span>
        );
    }
    return (
        <OALink url={href.url} doi={doi} domain={domain} name={href.name}>
            {({ url }) => (
                <a {...otherProps} href={url} target="_blank">
                    {children}
                    {href &&
                        (hrefWithIcon.includes(href) ||
                            HAL_REGEX.test(href.url)) && (
                            <img
                                src={oaIconUrl}
                                alt="Open access icon"
                                style={{ height: '20px' }}
                            />
                        )}
                </a>
            )}
        </OALink>
    );
};

ArticleRecordTitleLink.propTypes = {
    doi: PropTypes.any,
    domain: PropTypes.string.isRequired,
    articleLinks: PropTypes.object.isRequired,
    children: PropTypes.any,
    text: PropTypes.object,
};

ArticleRecordTitleLink.defaultProps = {};

export default translate(ArticleRecordTitleLink, 'ArticleLink');
