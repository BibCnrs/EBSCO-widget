import React, { PropTypes } from 'react';
import { Table } from 'react-bootstrap';

import BibButton from './BibButton';
import PrettyLimiter from './PrettyLimiter';

const History = ({ queries, historyShown, showHistory, reloadHistory, restoreHistory, deleteHistory }) => {
    return (
        <div className="history">
            <BibButton
                label="historique"
                icon={{ name: historyShown ? 'eye-slash' : 'eye' }}
                onClick={() => showHistory(!historyShown)}
            />
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
                                    <td>{query.term}</td>
                                    <td>{query.domain}</td>
                                    <td>
                                        <PrettyLimiter data={query.limiters}/>
                                    </td>
                                    <td>
                                        <PrettyLimiter data={
                                            query.activeFacets
                                            .reduce((result, facet) => {
                                                return [...result, ...facet.FacetValues];
                                            }, [])
                                            .reduce((result, activeFacet) => {
                                                return {
                                                    ...result,
                                                    [activeFacet.Id]: [
                                                        ...(result[activeFacet.Id] || []),
                                                        activeFacet.Value
                                                    ]
                                                };
                                            }, {})
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
