import React, { PropTypes } from 'react';
import Icon from 'react-fa';

const RecordList = ({ records, Record }) => (
    <div>
        <ul className="record_list">
            {records.map((record, index) => (
                <li key={index}>
                    <Record index={index} record={record} />
                </li>
            ))}
        </ul>
    </div>
);

RecordList.propTypes = {
    records: PropTypes.array.isRequired,
    Record: PropTypes.func.isRequired
};

export default RecordList;
