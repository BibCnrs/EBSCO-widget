import React, { PropTypes } from 'react';
import DL from './DL';

const History = ({ queries, historyShown }) => {
    return (
        <div className="history">
            <p>{ historyShown ? 'show history' : 'hide history' }</p>
            <table className={ historyShown ? 'shown' : 'hidden' }>
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
                                <DL data={query.limiters}/>
                            </td>
                            <td>Reload</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

History.propTypes = {
    queries: PropTypes.array.isRequired
};

export default History;
