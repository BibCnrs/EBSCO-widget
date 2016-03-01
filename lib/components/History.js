import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import BibButton from './BibButton';
import PrettyLimiter from './PrettyLimiter';

const History = ({ queries, historyShown, reloadHistory, restoreHistory, deleteHistory }) => {
    return (
        <div className="history">
            <div className={ historyShown ? 'shown' : 'hidden' }>
                <Table striped bordered condensed hover>
                    <tbody>
                        <tr>
                            <th>Terme recherchés</th>
                            <th>Domaine</th>
                            <th>Limites</th>
                            <th>Facettes</th>
                            <th>Actions</th>
                        </tr>
                        { queries
                        .map((query, index) => {
                            return (
                                <tr key={index}>
                                    <td>{
                                        query.queries
                                        .map(q => `${q.field || 'tout'}: ${q.term}`)
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
                                            label={` ${query.totalHits} résultats`}
                                            icon={{name: 'refresh'}}
                                            onClick={() => reloadHistory(query)}
                                            tooltip="recharger"
                                        />
                                        <BibButton
                                            icon={{name: 'edit'}}
                                            onClick={() => restoreHistory(query)}
                                            tooltip="modifier"
                                        />
                                        <BibButton
                                            icon={{name: 'trash'}}
                                            onClick={() => deleteHistory(query)}
                                            tooltip="supprimer"
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

export default History;
