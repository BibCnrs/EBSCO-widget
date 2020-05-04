import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';
import Pagination from './Pagination';
import ResultsPerPageSelector from './ResultsPerPageSelector';
import translate from '../higherOrderComponents/translate';
import HistoryItem from '../containers/HistoryItem';
import { BibButton } from './BibButton';

export class History extends Component {
    state = { showOnlyAlert: false, resultsPerPage: 5 };

    handleLoadHistoryPage = (page, limit) => {
        const { loadHistoryPage } = this.props;
        const { showOnlyAlert, resultsPerPage } = this.state;
        loadHistoryPage(page, limit || resultsPerPage, showOnlyAlert);
        if (limit) {
            this.setState({ resultsPerPage: limit });
        }
    };

    handleShowOnlyAlertChange = () => {
        const { loadHistoryPage } = this.props;
        const showOnlyAlert = !this.state.showOnlyAlert;
        this.setState({ showOnlyAlert });
        loadHistoryPage(1, this.state.resultsPerPage, showOnlyAlert);
    };

    handleDeleteHistories = () => {
        const { deleteHistories, text } = this.props;
        if (confirm(text.confirmDeleteAll)) {
            deleteHistories();
        }
    };

    render() {
        const {
            queries,
            historyShown,
            text,
            canPersistHistoryOnServer,
            disableAllAlert,
            currentPage,
            maxPage,
            totalCountSearch,
            totalCountAlert,
        } = this.props;

        const { showOnlyAlert, resultsPerPage } = this.state;

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
                                                    resultsPerPage={
                                                        resultsPerPage
                                                    }
                                                    maxResult={
                                                        totalCountAlert ||
                                                        totalCountSearch
                                                    }
                                                    loadPage={
                                                        this
                                                            .handleLoadHistoryPage
                                                    }
                                                />
                                                <ResultsPerPageSelector
                                                    resultsPerPage={
                                                        resultsPerPage
                                                    }
                                                    changeResultsPerPage={limit =>
                                                        this.handleLoadHistoryPage(
                                                            1,
                                                            limit,
                                                        )
                                                    }
                                                />
                                                <BibButton
                                                    label={
                                                        text.removeAllSearchNotAlert
                                                    }
                                                    bsStyle="link"
                                                    onClick={() => {
                                                        // delete all histories
                                                        this.handleDeleteHistories();
                                                        this.handleLoadHistoryPage(
                                                            currentPage,
                                                        );
                                                    }}
                                                />
                                                <BibButton
                                                    label={text.showOnlyAlert}
                                                    bsStyle="link"
                                                    onClick={
                                                        this
                                                            .handleShowOnlyAlertChange
                                                    }
                                                />
                                                <BibButton
                                                    label={text.toggleAllAlert}
                                                    bsStyle="link"
                                                    onClick={() => {
                                                        // enable/disable all alerts
                                                        disableAllAlert();
                                                        this.handleLoadHistoryPage(
                                                            currentPage,
                                                        );
                                                    }}
                                                />
                                                <br />
                                                <p>
                                                    {showOnlyAlert === true
                                                        ? `${totalCountAlert} ${text.alert} / ${totalCountSearch} ${text.search}`
                                                        : `${totalCountSearch} ${text.search}`}
                                                </p>
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
                                                    resultsPerPage={
                                                        resultsPerPage
                                                    }
                                                    maxResult={
                                                        totalCountAlert ||
                                                        totalCountSearch
                                                    }
                                                    loadPage={
                                                        this
                                                            .handleLoadHistoryPage
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
    deleteHistories: PropTypes.func.isRequired,
    disableAllAlert: PropTypes.func.isRequired,
    historyShown: PropTypes.bool.isRequired,
    loadHistoryPage: PropTypes.func.isRequired,
    maxPage: PropTypes.number.isRequired,
    queries: PropTypes.array.isRequired,
    reloadHistory: PropTypes.func.isRequired,
    restoreHistory: PropTypes.func.isRequired,
    totalCountSearch: PropTypes.number,
    totalCountAlert: PropTypes.number,
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
