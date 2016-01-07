import React, { PropTypes } from 'react';
import Icon from 'react-fa';

import Button from './Button';
import PrettyLimiter from './PrettyLimiter';

const History = ({ queries, historyShown, showHistory, reloadHistory }) => {
    return (
        <div className="history">
            <button className="button" onClick={() => showHistory(!historyShown)}>
                History <Icon name={historyShown ? 'eye' : 'eye-slash'} />
            </button>
            <div className={ historyShown ? 'shown' : 'hidden' }>
                <table>
                    <tbody>
                        <tr>
                            <th>term</th>
                            <th>limiters</th>
                            <th>actions</th>
                        </tr>
                        { queries.map((query, index) => (
                            <tr key={index}>
                                <td>{query.term}</td>
                                <td>
                                    <PrettyLimiter data={query.limiters}/>
                                </td>
                                <td>
                                    <Button
                                        label="reload"
                                        icon={{name: 'refresh'}}
                                        onClick={() => reloadHistory(query)}
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
