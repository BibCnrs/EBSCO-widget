import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PrettyLimiter from './PrettyLimiter';
import BibButton from './BibButton';
import translate from '../higherOrderComponents/translate';

export const History = ({ queries, historyShown, text, reloadHistory, restoreHistory, deleteHistory }) => {
    const fieldLabel = {
        [null]: text.all,
        AU: text.author,
        TI: text.title,
        SU: text.subject,
        SO: text.source,
        AB: text.abstract,
        IS: 'ISSN',
        IB: 'ISBN',
        PT: text.type,
        PB: text.publisher
    };

    return (
        <div className="history">
            <ReactCSSTransitionGroup transitionName="fade" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
                { historyShown ? (
                    <div key="shown">
                        <Table striped bordered condensed hover>
                            <tbody>
                                <tr>
                                    <th>{text.searchedTerm}</th>
                                    <th>{text.domain}</th>
                                    <th>{text.limits}</th>
                                    <th>{text.facets}</th>
                                    <th>{text.actions}</th>
                                </tr>
                                { queries
                                .map((query, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{
                                                query.queries
                                                .map(q => `${fieldLabel[q.field] || q.field}: ${q.term}`)
                                                .join(', ')
                                            }</td>
                                            <td>{query.domain}</td>
                                            <td>
                                                <PrettyLimiter data={query.limiters}/>
                                            </td>
                                            <td>
                                                <PrettyLimiter data={
                                                    query.activeFacets
                                                }/>
                                            </td>
                                            <td>
                                                <BibButton
                                                    className="refresh"
                                                    label={` ${query.totalHits > 1 ? text.results.replace('<x>', query.totalHits) : text.result}`}
                                                    icon={{name: 'refresh'}}
                                                    onClick={() => reloadHistory(query)}
                                                    tooltip={text.reload}
                                                />
                                                <BibButton
                                                    className="edit"
                                                    icon={{name: 'edit'}}
                                                    onClick={() => restoreHistory(query)}
                                                    tooltip={text.modify}
                                                />
                                                <BibButton
                                                    className="delete"
                                                    icon={{name: 'trash'}}
                                                    onClick={() => deleteHistory(query)}
                                                    tooltip={text.delete}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                ) : (
                    <div key="hidden"/>
                )}
            </ReactCSSTransitionGroup>
        </div>
    );
};

History.propTypes = {
    queries: PropTypes.array.isRequired
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
        title: 'Titre',
        subject: 'Sujet',
        source: 'Source',
        abstract: 'Résumé',
        publisher: 'Editeur'
    }
};

export default translate(History);
