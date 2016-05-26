import React, { PropTypes } from 'react';
import SelectButton from './SelectButton';
import translate from '../higherOrderComponents/translate';
import Icon from 'react-fa';

export function openInNewTab(url) {
    const win = window.open(url, '_blank');
    win.focus();
}

const getLabel = (link) => {
    let label = 'éditeur';

    if (link.match(/\.ebscohost\.com/)) {
        label = 'ebsco';
    }

    if (link.match(/.pdf$/)) {
        label = 'pdf';
    }

    return label;
};

export const ArticleLink = ({ link, url, domain, dbId, an, token, index, text, retrieveLink }) => {
    if(link && link.length === 0) {
        return <div></div>;
    }

    return (
        <div className="article-link">
            <SelectButton
                bsStyle="primary"
                value={text.resolver}
                choices={
                    (!link || link === 'pdflink') ? (
                        [{ value: null, label: <Icon name="spinner" spin={true}/> }]
                    ) : (
                        link.map((link, index) => ({ value: link, label: `${text.link} ${getLabel(link)} ${index + 1}` }))
                    )
                }
                onToggle={(open) => {
                    if(!open || Array.isArray(link)) {
                        return;
                    }
                    retrieveLink(url, domain, dbId, an, token, index);
                }}
                onChange={openInNewTab}
            />
        </div>
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
    url: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
    dbId: PropTypes.string.isRequired,
    an: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    retrieveLink: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

ArticleLink.defaultProps = {
    text: {
        link: 'lien',
        resolver: 'Résolveur de lien'
    }
};

export default translate(ArticleLink, 'ArticleLink');
