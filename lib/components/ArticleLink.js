import React, { PropTypes } from 'react';
import SelectButton from './SelectButton';
import translate from '../higherOrderComponents/translate';
import Icon from 'react-fa';

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

export const ArticleLink = ({ link, id, url, domain, dbId, an, token, text, retrieveLink }) => {
    if(link && link.length === 0) {
        return <div></div>;
    }

    return (
        <SelectButton
            className="article-link"
            bsStyle="primary"
            value={text.resolver}
            choices={
                (!link || link === 'pdflink') ? (
                    [{ value: null, label: <Icon name="spinner" spin={true}/> }]
                ) : (
                    link.map((link, index) => ({ value: link, label: `${text.link} ${index + 1}` }))
                )
            }
            onToggle={(open) => {
                if(!open || Array.isArray(link)) {
                    return;
                }
                retrieveLink(id, url, domain, dbId, an, token);
            }}
            onChange={openInNewTab}
        />
    );
};

ArticleLink.propTypes = {
    link: function (...args) {
        const [ props, name ] = args;
        if (props[name] === 'pdflink') {
            return null;
        }
        return PropTypes.array(...args);
    },
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    dbId: PropTypes.string.isRequired,
    an: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    text: PropTypes.object,
    retrieveLink: PropTypes.func.isRequired
};

ArticleLink.defaultProps = {
    text: {
        link: 'lien',
        resolver: 'Résolveur de lien'
    }
};

export default translate(ArticleLink, 'ArticleLink');
