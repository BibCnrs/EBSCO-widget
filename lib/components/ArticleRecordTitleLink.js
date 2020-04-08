import PropTypes from 'prop-types';
import React from 'react';

import OALink from '../containers/OALink';
import { HAL_REGEX } from './OALink';
import translate from '../higherOrderComponents/translate';

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
    let openAccess = null;
    const fullText = articleLinks.fullTextLinks.find(d =>
        /lien\(s\) texte intégral/i.test(d.name),
    );
    const unpaywall = articleLinks.urls.find(d => /unpaywalleds/i.test(d.name));
    if (!unpaywall) {
        openAccess = articleLinks.fullTextLinks.find(d =>
            /accès en ligne en open access/i.test(d.name),
        );
    }
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

    if (!href) {
        return (
            <span>
                {children} <i>({text.noLinks})</i>
            </span>
        );
    }
    return (
        <OALink url={href.url} doi={doi} domain={domain} name={href.name}>
            {({ url }) => (
                <a
                    {...otherProps}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                    {href &&
                        (hrefWithIcon.includes(href) ||
                            HAL_REGEX.test(href.url)) && (
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAATCAMAAACX3symAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABvFBMVEUBAQEAAAAVDApCKCJHKyRIKyU1Ih4TEhIAAABDKCI6OjoAAABILCVDQ0MAAAAAAABIKyVXV1cFBQUAAAA2NzcICQk4KCVILCVKLCVMLSZJLCVKLCVMLSZHKyVEKSNDKCIVDQsVDQvni3b0knzzknz3lH6oZldbWlr0k33/moP/mYL/nIWoZFSFhITR0dH/nISnY1T////e3t7/m4S1bFtXVFSipKSkpaWLjIyiYVOJUkaKU0eLVEicaFz/moLzk330k3z5l4HZiHrShXjylH/9mILkjXz+mYLljHluWWMgNlIeNlJKSVvYiHr/m4Pei3s0P1Y4QVfijXz1k3yTZ2cSL0+ZbGy6enMmOFNjVGCkcW4oOVMkN1KqdHD3lH1YTVo3QFfylYD/nINvWWMtO1TskX5gUmBnVmFZUF5lVWFUS1o6Qlj0lYBzW2QsO1QpOlRXTl5NSlvdiHeIYmUVMU+1eHLWh3kxPVVbUF6tdXATME9JSFtGR1qsc21TTV0cNFEhN1IxPlbKgnd2XGVARFnxk3/pj31wWGDwk3+8e3Oyd3HUhnnVh3nShXnKgHPoi3b1k31EKSJJLCVDKCJts5qpAAAAInRSTlMAAM39/f3+vyz9zj/+4lYC/u1nBPB99v3+/v79/f39/M/Or/y3gAAAAAFiS0dEMdnbHXIAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfkAwYMFigD/TJxAAAA+UlEQVQY02NgYmYBAlY2dg4GRkZGBk4lZRUVFVU1dS5uEJdHQ1NLS0tbR1ePl4+fkUFAGcjT0jfQNTQSFBKGco1NTM3MLUREoVwtFUsraxtbMSDXThOk21hfX99enEHAwdHJ2cVOy9XNzV2ZlUHCw9PL28fXzz8gMCiYlUEyJDQsPCLSLio6JjaOlUEqPiExKTklNS09I1MFyM3KzvHLzXPOLyjMK5JmkCwuKS0rr6isqq4JrZVhkCiqq29obGpuaW0LaJdmENDo6OwKcu/ucXft7ZMFOkPTz89OC+QUP3tWqI/AQBNoslz/BGUomNAvz6AwcRIcTFYEAJA4QQz/A1ALAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIwLTAzLTA2VDExOjIyOjQwKzAxOjAw3K2xLwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMC0wMy0wNlQxMToyMjo0MCswMTowMK3wCZMAAAAASUVORK5CYII="
                                alt="Open access icon"
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
    articleLinks: PropTypes.object,
    children: PropTypes.any,
    text: PropTypes.object,
};

ArticleRecordTitleLink.defaultProps = {};

export default translate(ArticleRecordTitleLink, 'ArticleLink');
