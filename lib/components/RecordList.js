import ImmutablePropTypes from 'react-immutable-proptypes';
import React, { Component, PropTypes } from 'react';
import Record from '../containers/Record';

const RecordList = ({ records }) => (
    <ul className="record_list">
        {records.map((record, index) => <Record key={index} index={index} record={record.toJS()} />)}
    </ul>
);

RecordList.propTypes = {
    records: ImmutablePropTypes.list.isRequired
};

export default RecordList;
