import React, { PropTypes } from 'react';
import DL from './DL';

const History = ({ queries }) => {
    return (
        <table className="history">
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
    );
};

History.propTypes = {
};

export default History;
