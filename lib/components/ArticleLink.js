import PropTypes from 'prop-types';
import React from 'react';
import Icon from 'react-fa';

import translate from '../higherOrderComponents/translate';
import parseArticleLinks from '../services/parseArticleLinks';
import BibButton from './BibButton';
import BookmarkButton from '../containers/BookmarkButton';

const ArticleLink = ({ articleLinks, title, text, currentGate }) => {
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
                {links.map(({ name, icon, url, download, onClick }, index) => (
                    <li key={index}>
                        <BibButton
                            bsStyle="link"
                            href={url}
                            target="blank"
                            download={download}
                            onClick={onClick}
                            icon={{ name: icon }}
                            label={name}
                        />{' '}
                        <BookmarkButton
                            title={`${title} - ${name}`}
                            url={url}
                        />
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
    title: PropTypes.string.isRequired,
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
