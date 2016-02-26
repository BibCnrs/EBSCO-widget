import React, { PropTypes } from 'react';

import PublicationRecord from '../containers/PublicationRecord';

const PublicationRecordList = ({ publications }) => (
    <ul className="record_list">
        {publications.map((publication, index) => (
            <li key={index}>
                <PublicationRecord index={index} publication={publication} />
            </li>
        ))}
    </ul>
);

PublicationRecordList.propTypes = {
    publications: PropTypes.array.isRequired
};

export default PublicationRecordList;
