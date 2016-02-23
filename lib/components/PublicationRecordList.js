import React, { PropTypes } from 'react';

import PublicationRecord from './PublicationRecord';

const PublicationRecordList = ({ publications }) => (
    <ul className="publication_list">
        {publications.map((article, index) => <PublicationRecord key={index} index={index} article={article} />)}
    </ul>
);

PublicationRecordList.propTypes = {
    publications: PropTypes.array.isRequired
};

export default PublicationRecordList;
