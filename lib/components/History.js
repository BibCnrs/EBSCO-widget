import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';

import Pagination from './Pagination';
import translate from '../higherOrderComponents/translate';
import HistoryItem from '../containers/HistoryItem';
import { BibButton } from './BibButton';

export class History extends Component {
    state = { showOnlyAlert: false };
    handleLoadPage = page => {
        const { loadPage } = this.props;
        const { showOnlyAlert } = this.state;
        loadPage(page, showOnlyAlert);
    };

    handleShowOnlyAlertChange = () => {
        const { currentPage, loadPage } = this.props;
        const showOnlyAlert = !this.state.showOnlyAlert;
        this.setState({ showOnlyAlert });
        loadPage(currentPage, showOnlyAlert);
    };

    render() {
        const {
            queries,
            historyShown,
            text,
            canPersistHistoryOnServer,
            currentPage,
            maxPage,
        } = this.props;
        const { showOnlyAlert } = this.state;

        return (
            <div className="history">
                <CSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                >
                    {historyShown ? (
                        <div key="shown">
                            <Table striped bordered condensed hover>
                                {canPersistHistoryOnServer && (
                                    <thead>
                                        <tr>
                                            <td colSpan={5}>
                                                <Pagination
                                                    currentPage={currentPage}
                                                    maxPage={maxPage}
                                                    loadPage={
                                                        this.handleLoadPage
                                                    }
                                                />
                                                <BibButton
                                                    label={
                                                        showOnlyAlert
                                                            ? text.showAll
                                                            : text.showOnlyAlert
                                                    }
                                                    bsStyle="link"
                                                    onClick={
                                                        this
                                                            .handleShowOnlyAlertChange
                                                    }
                                                    icon={{
                                                        name: showOnlyAlert
                                                            ? 'check-square'
                                                            : 'square',
                                                    }}
                                                />
                                            </td>
                                        </tr>
                                    </thead>
                                )}
                                <tbody>
                                    <tr>
                                        <th>{text.searchedTerm}</th>
                                        <th>{text.domain}</th>
                                        <th>{text.limits}</th>
                                        <th>{text.facets}</th>
                                        <th>{text.actions}</th>
                                    </tr>
                                    {queries.map((query, index) => (
                                        <HistoryItem
                                            key={index}
                                            query={query}
                                        />
                                    ))}
                                </tbody>
                                {canPersistHistoryOnServer && (
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}>
                                                <Pagination
                                                    currentPage={currentPage}
                                                    maxPage={maxPage}
                                                    loadPage={
                                                        this.handleLoadPage
                                                    }
                                                />
                                            </td>
                                        </tr>
                                    </tfoot>
                                )}
                            </Table>
                        </div>
                    ) : (
                        <div key="hidden" />
                    )}
                </CSSTransitionGroup>
            </div>
        );
    }
}

History.propTypes = {
    canPersistHistoryOnServer: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    deleteHistory: PropTypes.func.isRequired,
    historyShown: PropTypes.bool.isRequired,
    loadPage: PropTypes.func.isRequired,
    maxPage: PropTypes.number.isRequired,
    queries: PropTypes.array.isRequired,
    reloadHistory: PropTypes.func.isRequired,
    restoreHistory: PropTypes.func.isRequired,
    text: PropTypes.object.isRequired,
};

History.defaultProps = {
    text: {
        searchedTerm: 'Terme recherchés',
        domain: 'Domaine',
        limits: 'Limites',
        facets: 'Facettes',
        actions: 'Actions',
        reload: 'recharger',
        modify: 'modifier',
        delete: 'supprimer',
        result: '1 résultat',
        results: '<x> résultats',
        all: 'Tout',
        author: 'Auteur',
        exactAuthor: 'Auteur exact',
        title: 'Titre',
        subject: 'Sujet',
        source: 'Source',
        abstract: 'Résumé',
        publisher: 'Editeur',
        showOnlyAlert: 'Afficher les atertes',
        showAll: 'Afficher tout',
    },
};

export default translate(History);
