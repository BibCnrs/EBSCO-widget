import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';
import { CSSTransitionGroup } from 'react-transition-group';

import PrettyLimiter from './PrettyLimiter';
import Pagination from './Pagination';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';
import CreateAlertButton from './CreateAlertButton';

export const History = ({
    queries,
    historyShown,
    text,
    reloadHistory,
    restoreHistory,
    deleteHistory,
    createAlert,
    canPersistHistoryOnServer,
    currentPage,
    maxPage,
    loadPage,
}) => {
    const fieldLabel = {
        [null]: text.all,
        AU: text.author,
        AR: text.exactAuthor,
        TI: text.title,
        SU: text.subject,
        SO: text.source,
        AB: text.abstract,
        IS: 'ISSN',
        IB: 'ISBN',
        PB: text.publisher,
    };

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
                                                loadPage={loadPage}
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
                                {queries.map((query, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>
                                                {query.queries
                                                    .map(
                                                        q =>
                                                            `${fieldLabel[
                                                                q.field
                                                            ] || q.field}: ${
                                                                q.term
                                                            }`,
                                                    )
                                                    .join(', ')}
                                            </td>
                                            <td>{query.domain}</td>
                                            <td>
                                                <PrettyLimiter
                                                    data={query.limiters}
                                                />
                                            </td>
                                            <td>
                                                <PrettyLimiter
                                                    data={query.activeFacets}
                                                />
                                            </td>
                                            <td>
                                                <BibButton
                                                    className="refresh"
                                                    label={` ${
                                                        query.totalHits > 1
                                                            ? text.results.replace(
                                                                  '<x>',
                                                                  query.totalHits,
                                                              )
                                                            : text.result
                                                    }`}
                                                    icon={{ name: 'refresh' }}
                                                    onClick={() =>
                                                        reloadHistory(query)
                                                    }
                                                    tooltip={text.reload}
                                                />
                                                <BibButton
                                                    className="edit"
                                                    icon={{ name: 'edit' }}
                                                    onClick={() =>
                                                        restoreHistory(query)
                                                    }
                                                    tooltip={text.modify}
                                                />
                                                <BibButton
                                                    className="delete"
                                                    icon={{ name: 'trash' }}
                                                    onClick={() =>
                                                        deleteHistory(query)
                                                    }
                                                    tooltip={text.delete}
                                                />
                                                <CreateAlertButton
                                                    createAlert={createAlert}
                                                    id={query.id}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            {canPersistHistoryOnServer && (
                                <tfoot>
                                    <tr>
                                        <td colSpan={5}>
                                            <Pagination
                                                currentPage={currentPage}
                                                maxPage={maxPage}
                                                loadPage={loadPage}
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
};

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
    createAlert: PropTypes.func.isRequired,
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
        createAlert: 'créer une alerte',
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
    },
};

export default translate(History);
