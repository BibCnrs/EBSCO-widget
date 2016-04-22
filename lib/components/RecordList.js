import React, { PropTypes } from 'react';

const RecordList = ({ records, Record }) => (
    <ul className="record_list">
        {records.map((record, index) => (
            <li key={index}>
                <Record index={index} record={record} />
            </li>
        ))}
    </ul>
);

RecordList.propTypes = {
    records: PropTypes.array.isRequired
};

export default RecordList;
