import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';

import translate from '../higherOrderComponents/translate';
import parseArticleLinks from '../services/parseArticleLinks';

const ArticleLink = ({ articleLinks, text, currentGate }) => {
    if (!articleLinks) {
        return <p>{text.noLinks}</p>;
    }

    const links = parseArticleLinks(articleLinks, currentGate, text);

    if (!links) {
        return (
            <p>
                <Icon name="spinner" spin={true} />Chargement des liens...
            </p>
        );
    }

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
    currentGate: PropTypes.string.isRequired,
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
