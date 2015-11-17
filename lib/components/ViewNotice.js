'use strict';

import React, { Component, PropTypes } from 'react';
import FetchButton from './FetchButton';
import Modal from 'react-modal';
import Icon from 'react-fa';

const dictionary = {
    Author: 'Auteurs',
    TitleSource: 'Source',
    DatePubCY: 'Année de publication',
    Subject: 'Termes de sujet',
    Abstract: 'Résumé',
    TOC: 'Note de contenus',
    Language: 'Langue',
    AffiliationAuthor: `Affiliations de l'auteur`,
    URL: 'Disponibilité',
    Copyright: 'Rights',
    AN: `Numéro d'accés`,
    db: `Base de données`,
    PeerReviewed: 'Relu par un comité de lecture',
    SubjectThesaurus: 'Opérateurs descriptifs',
    Keyword: 'Identifiants',
    AbstractInfo: 'Abstractor',
    Ref: 'Nombre de références',
    Pages: 'Nombre de pages',
    TypePub: 'Type de publication',
    Avail: 'Disponibilité',
    CodeSource: 'Code de revue',
    DateEntry: `Date d'entrée`,
    NumberEric: `Numéro d'accès`,
    CodeClass: 'International Patent Classification'
};

export default class ViewNotice extends Component {
    render() {
        const { status, error, data, shown } = this.props.notice;
        return (
            <span className="view_notice">
                <FetchButton
                    onClick={(e) => this.handleClick(e)}
                    status={status}
                    error={error}
                    icon="file-text"
                    label="Notice"
                />
                <Modal
                    isOpen={shown}
                    onRequestClose={() => this.props.onShow(false)}
                >
                    <a className="close_notice" onClick={() => this.props.onShow(false)}><Icon name="close"/></a>
                    <h4>Notices détaillées</h4>
                    <h3>{data && data.length ? data[0].value : undefined}</h3>
                    <dl className="notice">
                        {data.slice(1).map((datum, index) =>
                            <span key={index}>
                                <dt>{dictionary[datum.name] || datum.name}</dt>
                                <dd>{datum.value}</dd>
                            </span>
                        )}
                    </dl>
                </Modal>
            </span>
        );
    }

    handleClick() {
        const { notice, onShow, onFetch } = this.props;
        if (notice.status === 'SUCCESS') {
            return onShow(!notice.shown);
        }
        onFetch();
    }
}

ViewNotice.propTypes = {
    onShow: PropTypes.func.isRequired,
    onFetch: PropTypes.func.isRequired,
    notice: PropTypes.object
};
