import React, { PropTypes } from 'react';
import Record from '../containers/Record';

const RecordList = ({ records }) => (
    <ul className="record_list">
        {records.map((record, index) => <Record key={index} index={index} record={record} />)}
    </ul>
);

RecordList.propTypes = {
    records: PropTypes.array.isRequired
};

export default RecordList;
