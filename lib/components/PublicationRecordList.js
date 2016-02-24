import React, { PropTypes } from 'react';

import PublicationRecord from './PublicationRecord';

const PublicationRecordList = ({ publications }) => (
    <ul className="article_list">
        {publications.map((publication, index) => <PublicationRecord key={index} index={index} publication={publication} />)}
    </ul>
);

PublicationRecordList.propTypes = {
    publications: PropTypes.array.isRequired
};

export default PublicationRecordList;
