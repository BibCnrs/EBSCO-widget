import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';

import translate from '../higherOrderComponents/translate';

const ArticleLink = ({ articleLinks, text }) => {
    if (!articleLinks) {
        return <p>{text.noLinks}</p>;
    }
    const { fullTextLinks, pdfLinks, urls, html } = articleLinks;

    if (
        (!fullTextLinks || !fullTextLinks.length) &&
        (!pdfLinks || !pdfLinks.length) &&
        (!urls || !urls.length) &&
        !html
    ) {
        return (
            <p>
                <Icon name="spinner" spin={true} />Chargement des liens...
            </p>
        );
    }

    const htmlLists = html
        ? [
              {
                  name: 'html',
                  icon: 'file-code-o',
                  url:
                      'data:text/html;charset=utf-8,' +
                      encodeURIComponent(html),
                  download: true,
              },
          ]
        : [];

    const links = []
        .concat(fullTextLinks.map(link => ({ ...link, icon: 'th-list' })))
        .concat(
            pdfLinks.map(link => ({
                ...link,
                name: text.pdfLinks,
                icon: 'file-pdf-o',
            })),
        )
        .concat(
            urls.map(link => ({
                ...link,
                name: text[link.name] || link.name,
                icon: 'link',
            })),
        )
        .concat(htmlLists);

    return (
        <div className="article-link">
            <ul>
                {links.map(({ name, icon, url, download }, index) => (
                    <li key={index}>
                        <a href={url} target="blank" download={download}>
                            <Icon name={icon} /> {name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

ArticleLink.propTypes = {
    articleLinks: PropTypes.object,
    text: PropTypes.object,
};

ArticleLink.defaultProps = {
    text: {
        fullTextLinks: "Accès à l'article",
        pdfLinks: 'Accès au pdf',
        urls: 'Urls',
        html: 'html',
        noLinks: "Pas d'accès pour cet article.",
        linksLoading: 'Chargement des liens',
    },
};

export default translate(ArticleLink);
