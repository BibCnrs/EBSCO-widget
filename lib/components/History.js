import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import Button from './Button';
import PrettyLimiter from './PrettyLimiter';

const History = ({ queries, historyShown, showHistory, reloadHistory, restoreHistory, deleteHistory }) => {
    return (
        <div className="history">
            <button className="button" onClick={() => showHistory(!historyShown)}>
                History <Icon name={historyShown ? 'eye-slash' : 'eye'} />
            </button>
            <div className={ historyShown ? 'shown' : 'hidden' }>
                <table>
                    <tbody>
                        <tr>
                            <th>Terme</th>
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
                                        label={`Recharger ${query.totalHits} résultats`}
                                        icon={{name: 'refresh'}}
                                        onClick={() => reloadHistory(query)}
                                    />
                                    <Button
                                        label="Modifier"
                                        icon={{name: ''}}
                                        onClick={() => restoreHistory(query)}
                                    />
                                    <Button
                                        icon={{name: 'trash'}}
                                        label=""
                                        onClick={() => deleteHistory(query)}
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
