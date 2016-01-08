import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import Button from './Button';
import PrettyLimiter from './PrettyLimiter';

const History = ({ queries, historyShown, showHistory, reloadHistory, restoreHistory, deleteHistory }) => {
    return (
        <div className="history">
            <Button
                label="historique"
                icon={{ name: historyShown ? 'eye-slash' : 'eye' }}
                onClick={() => showHistory(!historyShown)}
            />
            <div className={ historyShown ? 'shown' : 'hidden' }>
                <table>
                    <tbody>
                        <tr>
                            <th>Terme recherchés</th>
                            <th>Domaine</th>
                            <th>Limite</th>
                            <th>Actions</th>
                        </tr>
                        { queries.map((query, index) => (
                            <tr key={index}>
                                <td>{query.term}</td>
                                <td>{query.domain}</td>
                                <td>
                                    <PrettyLimiter data={query.limiters}/>
                                </td>
                                <td>
                                    <Button
                                        label={` ${query.totalHits} résultats`}
                                        icon={{name: 'refresh'}}
                                        onClick={() => reloadHistory(query)}
                                        tooltip="recharger"
                                    />
                                    <Button
                                        label=""
                                        icon={{name: 'edit'}}
                                        onClick={() => restoreHistory(query)}
                                        tooltip="modifier"
                                    />
                                    <Button
                                        icon={{name: 'trash'}}
                                        label=""
                                        onClick={() => deleteHistory(query)}
                                        tooltip="supprimer"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

History.propTypes = {
    queries: PropTypes.array.isRequired
};

export default History;
