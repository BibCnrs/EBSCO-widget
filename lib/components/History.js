import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import PrettyLimiter from './PrettyLimiter';
import BibButton from './BibButton';
import getLabelFromValue from '../services/getLabelFromValue';
import translate from '../higherOrderComponents/translate';

export const History = ({ queries, historyShown, availableFields, text, reloadHistory, restoreHistory, deleteHistory }) => {
    return (
        <div className="history">
            <div className={ historyShown ? 'shown' : 'hidden' }>
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
                                        .map(q => `${getLabelFromValue(q.field, availableFields)}: ${q.term}`)
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
        results: '<x> résultats'
    }
};

export default translate(History);
